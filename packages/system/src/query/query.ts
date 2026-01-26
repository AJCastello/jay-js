import { state } from "../state/core/state.js";
import { effect } from "../state/utils/helpers.js";
import { queryCache } from "./cache.js";
import type { TQueryFetcher, TQueryKey, TQueryOptions, TQueryStatus, TQueryStore } from "./types.js";
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
const DEFAULT_OPTIONS: Required<Omit<TQueryOptions, "onSuccess" | "onError" | "initialData">> = {
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
		status: (options.initialData !== undefined ? "success" : "idle") as TQueryStatus,
	});

	let cleanupFns: Array<() => void> = [];
	let refetchInterval: ReturnType<typeof setInterval> | null = null;

	const currentKey = (): string => resolveQueryKey(key);

	const execute = async (isRefetch = false): Promise<void> => {
		const queryKey = currentKey();

		if (!isRefetch) {
			// internalState.value.isLoading = true;
			internalState.set((currentState) => {
				return {
					...currentState,
					isLoading: true,
				};
			});
		}

		internalState.set((currentState) => {
			return {
				...currentState,
				isFetching: true,
				status: "loading",
			};
		});

		try {
			const data = await executeFetch(
				queryKey,
				(signal) => executeWithRetry(fetcher, opts.retry, opts.retryDelay, signal),
				() => {
					internalState.set((currentState) => {
						return {
							...currentState,
							isFetching: false,
						};
					});
				},
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

			queryCache.set(queryKey, data, opts.cacheTime);

			opts.onSuccess?.(data);
		} catch (error) {
			internalState.set((currentState) => {
				return {
					...currentState,
					error: error as TError,
					isError: true,
					isSuccess: false,
					status: "error",
				};
			});

			opts.onError?.(error as Error);
		} finally {
			internalState.set((currentState) => {
				return {
					...currentState,
					isLoading: false,
					isFetching: false,
				};
			});
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
		internalState.set({
			data: (options.initialData ?? null) as TData | null,
			error: null as TError | null,
			isLoading: false,
			isFetching: false,
			isError: false,
			isSuccess: options.initialData !== undefined,
			status: (options.initialData !== undefined ? "success" : "idle") as TQueryStatus,
		});
	};

	const cancel = (): void => {
		const queryKey = currentKey();
		cancelFetch(queryKey);
		internalState.set((currentState) => {
			return {
				...currentState,
				isFetching: false,
			};
		});
	};

	const initialize = (): void => {
		const queryKey = currentKey();

		const cached = queryCache.get<TData>(queryKey);
		const isStale = cached ? queryCache.isStale(queryKey, opts.staleTime) : true;

		if (cached && !isStale) {
			internalState.set((currentState) => {
				return {
					...currentState,
					data: cached.data,
					isSuccess: true,
					status: "success",
				};
			});
		}

		const hasInitialData = options.initialData !== undefined;

		if (opts.enabled) {
			if (!cached || queryCache.isStale(queryKey, opts.staleTime)) {
				if (!hasInitialData || cached) {
					execute(false);
				}
			}
		}

		const unsubscribeListener = queryCache.onChange(queryKey, (data) => {
			internalState.set((currentState) => {
				return {
					...currentState,
					data: data,
					isSuccess: true,
					status: "success",
				};
			});
		});
		cleanupFns.push(unsubscribeListener);

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
			refetchInterval = setInterval(() => refetch(), opts.refetchInterval as number);
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
		get data() {
			return internalState.value.data;
		},
		get error() {
			return internalState.value.error;
		},
		get isLoading() {
			return internalState.value.isLoading;
		},
		get isFetching() {
			return internalState.value.isFetching;
		},
		get isError() {
			return internalState.value.isError;
		},
		get isSuccess() {
			return internalState.value.isSuccess;
		},
		get status() {
			return internalState.value.status;
		},
		refetch,
		invalidate,
		reset,
		cancel,
		dispose() {
			cleanup();
		},
	};
}
