import { state } from "../../core/state.js";
import { derived } from "../helpers.js";
import { queryCache } from "./cache.js";
import type {
	TMutationFetcher,
	TMutationOptions,
	TMutationStatus,
	TMutationStore,
} from "./types.js";
import { defaultRetryDelay, executeWithRetry } from "./utils.js";

/**
 * Default mutation options
 */
const DEFAULT_OPTIONS: Required<
	Omit<TMutationOptions, "onMutate" | "onSuccess" | "onError" | "onSettled" | "invalidateQueries">
> = {
	retry: false,
	retryDelay: defaultRetryDelay,
};

/**
 * Creates a reactive mutation for write operations (POST/PUT/DELETE)
 *
 * Unlike queries, mutations don't cache results and are designed for write operations.
 * They support optimistic updates with automatic rollback on error.
 *
 * @param fetcher Async function to perform mutation
 * @param options Mutation configuration options
 * @returns Mutation store with reactive states and control methods
 *
 * @example
 * Basic usage:
 * ```typescript
 * const createUser = mutation(async (user: User, signal) => {
 *   const res = await fetch('/api/users', {
 *     method: 'POST',
 *     body: JSON.stringify(user),
 *     signal,
 *   });
 *   return res.json();
 * });
 *
 * // Execute mutation
 * await createUser.mutate({ name: 'John', email: 'john@example.com' });
 * ```
 *
 * @example
 * With optimistic updates:
 * ```typescript
 * const updateUser = mutation(
 *   async (user: User, signal) => {
 *     const res = await fetch(`/api/users/${user.id}`, {
 *       method: 'PUT',
 *       body: JSON.stringify(user),
 *       signal,
 *     });
 *     return res.json();
 *   },
 *   {
 *     onMutate: async (newUser) => {
 *       // Snapshot current state for rollback
 *       const previousUser = queryCache.get<User>(`user-${newUser.id}`);
 *
 *       // Optimistically update cache
 *       if (previousUser) {
 *         queryCache.set(`user-${newUser.id}`, newUser, 300000);
 *       }
 *
 *       return { previousUser };
 *     },
 *     onError: (err, variables, context) => {
 *       // Rollback on error
 *       if (context?.previousUser) {
 *         queryCache.set(`user-${variables.id}`, context.previousUser.data, 300000);
 *       }
 *     },
 *     onSuccess: () => {
 *       // Invalidate related queries
 *       queryCache.delete('users');
 *     },
 *     invalidateQueries: ['users', 'user-list'],
 *   }
 * );
 * ```
 */
export function mutation<
	TData = unknown,
	TError = Error,
	TVariables = void,
	TContext = unknown,
>(
	fetcher: TMutationFetcher<TData, TVariables>,
	options: TMutationOptions<TData, TError, TVariables, TContext> = {},
): TMutationStore<TData, TError, TVariables, TContext> {
	const opts = { ...DEFAULT_OPTIONS, ...options };

	const internalState = state({
		data: null as TData | null,
		error: null as TError | null,
		isLoading: false,
		isError: false,
		isSuccess: false,
		isIdle: true,
		status: "idle" as TMutationStatus,
	});

	let currentController: AbortController | null = null;

	const mutate = async (variables: TVariables): Promise<TData> => {
		if (currentController) {
			currentController.abort();
		}

		currentController = new AbortController();

		internalState.value.isLoading = true;
		internalState.value.isIdle = false;
		internalState.value.isError = false;
		internalState.value.status = "loading";

		let context: TContext | undefined;

		try {
			if (options.onMutate) {
				context = await options.onMutate(variables);
			}

			const data = await executeWithRetry(
				(signal) => fetcher(variables, signal),
				opts.retry,
				opts.retryDelay,
				currentController.signal,
			);

			internalState.value.data = data;
			internalState.value.error = null;
			internalState.value.isError = false;
			internalState.value.isSuccess = true;
			internalState.value.status = "success";

			if (options.onSuccess) {
				await options.onSuccess(data, variables, context);
			}

			if (options.invalidateQueries) {
				for (const key of options.invalidateQueries) {
					queryCache.delete(key);
				}
			}

			if (options.invalidatePattern) {
				queryCache.invalidatePattern(options.invalidatePattern);
			}

			if (options.invalidateIf) {
				queryCache.invalidateQueries(options.invalidateIf);
			}

			if (options.onSettled) {
				await options.onSettled(data, null, variables, context);
			}

			return data;
		} catch (error) {
			const err = error as TError;

			internalState.value.error = err;
			internalState.value.isError = true;
			internalState.value.isSuccess = false;
			internalState.value.status = "error";

			if (options.onError) {
				await options.onError(err, variables, context);
			}

			if (options.onSettled) {
				await options.onSettled(undefined, err, variables, context);
			}

			throw err;
		} finally {
			internalState.value.isLoading = false;
			currentController = null;
		}
	};

	const mutateAsync = async (
		variables: TVariables,
	): Promise<TData | undefined> => {
		try {
			return await mutate(variables);
		} catch {
			return undefined;
		}
	};

	const reset = (): void => {
		internalState.value.data = null;
		internalState.value.error = null;
		internalState.value.isLoading = false;
		internalState.value.isError = false;
		internalState.value.isSuccess = false;
		internalState.value.isIdle = true;
		internalState.value.status = "idle";
	};

	const cancel = (): void => {
		if (currentController) {
			currentController.abort();
			currentController = null;
		}
		internalState.value.isLoading = false;
	};

	const data = derived(() => internalState.value.data);
	const error = derived(() => internalState.value.error);
	const isLoading = derived(() => internalState.value.isLoading);
	const isError = derived(() => internalState.value.isError);
	const isSuccess = derived(() => internalState.value.isSuccess);
	const isIdle = derived(() => internalState.value.isIdle);
	const status = derived(() => internalState.value.status);

	return {
		get data() {
			return data.value;
		},
		get error() {
			return error.value;
		},
		get isLoading() {
			return isLoading.value;
		},
		get isError() {
			return isError.value;
		},
		get isSuccess() {
			return isSuccess.value;
		},
		get isIdle() {
			return isIdle.value;
		},
		get status() {
			return status.value;
		},
		mutate,
		mutateAsync,
		reset,
		cancel,
	};
}
