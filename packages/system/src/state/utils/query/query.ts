import { state } from "../../core/state.js";
import type { TState } from "../../types.js";
import { derived, effect } from "../helpers.js";
import { queryCache } from "./cache.js";
import type {
	TQueryFetcher,
	TQueryKey,
	TQueryOptions,
	TQueryStatus,
	TQueryStore,
} from "./types.js";
import {
	cancelFetch,
	defaultRetryDelay,
	executeFetch,
	executeWithRetry,
	resolveQueryKey,
	setupFocusRefetch,
	setupReconnectRefetch,
} from "./utils.js";

/**
 * Default query options
 */
const DEFAULT_OPTIONS: Required<
	Omit<TQueryOptions, "onSuccess" | "onError" | "initialData">
> = {
	enabled: true,
	staleTime: 0,
	cacheTime: 300000,
	refetchOnFocus: false,
	refetchOnReconnect: false,
	refetchInterval: false,
	retry: 3,
	retryDelay: defaultRetryDelay,
};

/**
 * Creates a reactive query for async data fetching with caching and automatic revalidation
 *
 * @param key Unique identifier for the query, can be reactive function
 * @param fetcher Async function to fetch data
 * @param options Query configuration options
 * @returns Query store with reactive states and control methods
 *
 * @example
 * Basic usage:
 * ```typescript
 * const usersQuery = query('users', async () => {
 *   const res = await fetch('/api/users');
 *   return res.json();
 * });
 *
 * // Use in component
 * effect(() => {
 *   if (usersQuery.data.value) {
 *     console.log(usersQuery.data.value);
 *   }
 * });
 * ```
 *
 * @example
 * With options:
 * ```typescript
 * const todosQuery = query('todos', fetchTodos, {
 *   staleTime: 5000,
 *   cacheTime: 300000,
 *   refetchOnFocus: true,
 *   retry: 3
 * });
 * ```
 *
 * @example
 * Reactive key:
 * ```typescript
 * const userId = state(1);
 * const userQuery = query(
 *   () => `user-${userId.value}`,
 *   async () => {
 *     const res = await fetch(`/api/users/${userId.value}`);
 *     return res.json();
 *   }
 * );
 * ```
 */
export function query<TData = unknown, TError = Error>(
	key: TQueryKey,
	fetcher: TQueryFetcher<TData>,
	options: TQueryOptions<TData> = {},
): TQueryStore<TData, TError> {
	const opts = { ...DEFAULT_OPTIONS, ...options };

	const internalState = state({
		data: (options.initialData ?? null) as TData | null,
		error: null as TError | null,
		isLoading: false,
		isFetching: false,
		isError: false,
		isSuccess: options.initialData !== undefined,
		status: (options.initialData !== undefined
			? "success"
			: "idle") as TQueryStatus,
	});

	let cleanupFns: Array<() => void> = [];
	let refetchInterval: ReturnType<typeof setInterval> | null = null;

	const currentKey = (): string => resolveQueryKey(key);

	const execute = async (isRefetch = false): Promise<void> => {
		const queryKey = currentKey();

		if (!isRefetch) {
			internalState.value.isLoading = true;
		}
		internalState.value.isFetching = true;
		internalState.value.status = "loading";

		try {
			const data = await executeFetch(
				queryKey,
				(signal) => executeWithRetry(fetcher, opts.retry, opts.retryDelay, signal),
				() => {
					internalState.value.isFetching = false;
				},
			);

			internalState.value.data = data;
			internalState.value.error = null;
			internalState.value.isError = false;
			internalState.value.isSuccess = true;
			internalState.value.status = "success";

			queryCache.set(queryKey, data, opts.cacheTime);

			opts.onSuccess?.(data);
		} catch (error) {
			internalState.value.error = error as TError;
			internalState.value.isError = true;
			internalState.value.isSuccess = false;
			internalState.value.status = "error";

			opts.onError?.(error as Error);
		} finally {
			internalState.value.isLoading = false;
			internalState.value.isFetching = false;
		}
	};

	const refetch = async (): Promise<void> => {
		await execute(true);
	};

	const invalidate = (): void => {
		const queryKey = currentKey();
		queryCache.delete(queryKey);
		execute(true);
	};

	const reset = (): void => {
		internalState.value = {
			data: options.initialData ?? null,
			error: null,
			isLoading: false,
			isFetching: false,
			isError: false,
			isSuccess: options.initialData !== undefined,
			status: options.initialData !== undefined ? "success" : "idle",
		};
	};

	const cancel = (): void => {
		const queryKey = currentKey();
		cancelFetch(queryKey);
		internalState.value.isFetching = false;
	};

	const initialize = (): void => {
		const queryKey = currentKey();

		const cached = queryCache.get<TData>(queryKey);
		const isStale = cached ? queryCache.isStale(queryKey, opts.staleTime) : true;

		if (cached && !isStale) {
			internalState.value.data = cached.data;
			internalState.value.isSuccess = true;
			internalState.value.status = "success";
		}

		const hasInitialData = options.initialData !== undefined;

		if (opts.enabled) {
			if (!cached || queryCache.isStale(queryKey, opts.staleTime)) {
				if (!hasInitialData || cached) {
					execute(false);
				}
			}
		}

		if (opts.refetchOnFocus) {
			cleanupFns.push(
				setupFocusRefetch(() => {
					if (queryCache.isStale(queryKey, opts.staleTime)) {
						refetch();
					}
				}),
			);
		}

		if (opts.refetchOnReconnect) {
			cleanupFns.push(setupReconnectRefetch(() => refetch()));
		}

		if (opts.refetchInterval && typeof opts.refetchInterval === "number") {
			refetchInterval = setInterval(
				() => refetch(),
				opts.refetchInterval as number,
			);
		}

		queryCache.subscribe(queryKey);
	};

	const cleanup = (): void => {
		const queryKey = currentKey();

		for (const fn of cleanupFns) {
			fn();
		}
		cleanupFns = [];

		if (refetchInterval) {
			clearInterval(refetchInterval);
			refetchInterval = null;
		}

		queryCache.unsubscribe(queryKey);
	};

	if (typeof key === "function") {
		effect(() => {
			cleanup();
			initialize();
		});
	} else {
		initialize();
	}

	return {
		data: derived(() => internalState.value.data) as TState<TData | null>,
		error: derived(() => internalState.value.error) as TState<TError | null>,
		isLoading: derived(() => internalState.value.isLoading),
		isFetching: derived(() => internalState.value.isFetching),
		isError: derived(() => internalState.value.isError),
		isSuccess: derived(() => internalState.value.isSuccess),
		status: derived(() => internalState.value.status),
		refetch,
		invalidate,
		reset,
		cancel,
	};
}
