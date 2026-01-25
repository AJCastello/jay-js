import { state } from "../state/core/state.js";
import { queryCache } from "./cache.js";
import type { TMutationFetcher, TMutationOptions, TMutationStatus, TMutationStore } from "./types.js";
import { defaultRetryDelay, executeWithRetry } from "./utils.js";

/**
 * Default mutation options
 */
const DEFAULT_OPTIONS: Required<
	Omit<
		TMutationOptions,
		"onMutate" | "onSuccess" | "onError" | "onSettled" | "invalidateQueries" | "invalidatePattern" | "invalidateIf"
	>
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
export function mutation<TData = unknown, TError = Error, TVariables = void, TContext = unknown>(
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

		internalState.set((currentState) => {
			return {
				...currentState,
				isLoading: true,
				isIdle: false,
				isError: false,
				status: "loading",
			};
		});

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

			internalState.set((currentState) => {
				return {
					...currentState,
					data: data,
					error: null,
					isError: false,
					isSuccess: true,
					status: "success",
				};
			});

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

			internalState.set((currentState) => {
				return {
					...currentState,
					error: err,
					isError: true,
					isSuccess: false,
					status: "error",
				};
			});

			if (options.onError) {
				await options.onError(err, variables, context);
			}

			if (options.onSettled) {
				await options.onSettled(undefined, err, variables, context);
			}

			throw err;
		} finally {
			//internalState.value.isLoading = false;
			internalState.set((currentState) => {
				return {
					...currentState,
					isLoading: false,
				};
			});
			currentController = null;
		}
	};

	const mutateAsync = async (variables: TVariables): Promise<TData | undefined> => {
		try {
			return await mutate(variables);
		} catch {
			return undefined;
		}
	};

	const reset = (): void => {
		internalState.set((currentState) => {
			return {
				...currentState,
				data: null,
				error: null,
				isLoading: false,
				isError: false,
				isSuccess: false,
				isIdle: true,
				status: "idle",
			};
		});
	};

	const cancel = (): void => {
		if (currentController) {
			currentController.abort();
			currentController = null;
		}
		//internalState.value.isLoading = false;
		internalState.set((currentState) => {
			return {
				...currentState,
				isLoading: false,
			};
		});
	};

	return {
		get data() {
			return internalState.value.data;
		},
		get error() {
			return internalState.value.error;
		},
		get isLoading() {
			return internalState.value.isLoading;
		},
		get isError() {
			return internalState.value.isError;
		},
		get isSuccess() {
			return internalState.value.isSuccess;
		},
		get isIdle() {
			return internalState.value.isIdle;
		},
		get status() {
			return internalState.value.status;
		},
		mutate,
		mutateAsync,
		reset,
		cancel,
	};
}
