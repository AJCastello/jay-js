/**
 * Query key type - can be static string or reactive function
 *
 * @example
 * ```typescript
 * // Static key
 * const key = 'users';
 *
 * // Reactive key
 * const userId = State(1);
 * const key = () => `user-${userId.value}`;
 * ```
 */
export type TQueryKey = string | (() => string);

/**
 * Function that fetches the data
 *
 * @param signal AbortSignal to cancel the request
 * @returns Promise with the fetched data
 *
 * @example
 * ```typescript
 * const fetcher: TQueryFetcher<User[]> = async (signal) => {
 *   const res = await fetch('/api/users', { signal });
 *   return res.json();
 * };
 * ```
 */
export type TQueryFetcher<TData> = (signal: AbortSignal) => Promise<TData>;

/**
 * Query configuration options
 */
export type TQueryOptions<TData = unknown> = {
	/**
	 * Whether the query should run automatically
	 * @default true
	 */
	enabled?: boolean;

	/**
	 * Time in ms before data is considered stale
	 * @default 0
	 */
	staleTime?: number;

	/**
	 * Time in ms before inactive queries are garbage collected
	 * @default 300000 (5 minutes)
	 */
	cacheTime?: number;

	/**
	 * Refetch when window regains focus
	 * @default false
	 */
	refetchOnFocus?: boolean;

	/**
	 * Refetch when network reconnects
	 * @default false
	 */
	refetchOnReconnect?: boolean;

	/**
	 * Interval in ms to automatically refetch, or false to disable
	 * @default false
	 */
	refetchInterval?: number | false;

	/**
	 * Number of retry attempts or false to disable
	 * @default 3
	 */
	retry?: number | boolean;

	/**
	 * Delay between retries in ms or function to calculate delay
	 * @default (attempt) => Math.min(1000 * 2 ** attempt, 30000)
	 */
	retryDelay?: number | ((attempt: number) => number);

	/**
	 * Callback when query succeeds
	 */
	onSuccess?: (data: TData) => void;

	/**
	 * Callback when query fails
	 */
	onError?: (error: Error) => void;

	/**
	 * Initial data before first fetch
	 */
	initialData?: TData;
};

/**
 * Query status
 */
export type TQueryStatus = "idle" | "loading" | "success" | "error";

/**
 * Query store returned by query()
 *
 * @example
 * ```typescript
 * const usersQuery = query('users', fetchUsers);
 *
 * // Access reactive states
 * Effect(() => {
 *   if (usersQuery.isLoading.value) {
 *     console.log('Loading...');
 *   }
 *   if (usersQuery.data.value) {
 *     console.log('Data:', usersQuery.data.value);
 *   }
 * });
 *
 * // Control methods
 * usersQuery.refetch();
 * usersQuery.invalidate();
 * ```
 */
export type TQueryStore<TData, TError = Error> = {
	/**
	 * Query data state
	 */
	data: TData | null;

	/**
	 * Query error state
	 */
	error: TError | null;

	/**
	 * Whether the query is loading for the first time
	 */
	isLoading: boolean;

	/**
	 * Whether the query is currently fetching (including background refetches)
	 */
	isFetching: boolean;

	/**
	 * Whether the query is in error state
	 */
	isError: boolean;

	/**
	 * Whether the query is in success state
	 */
	isSuccess: boolean;

	/**
	 * Current query status
	 */
	status: TQueryStatus;

	/**
	 * Manually trigger a refetch
	 */
	refetch: () => Promise<void>;

	/**
	 * Invalidate the query and trigger refetch
	 */
	invalidate: () => void;

	/**
	 * Reset query to initial state
	 */
	reset: () => void;

	/**
	 * Cancel ongoing request
	 */
	cancel: () => void;
};

/**
 * Internal cache entry
 * @internal
 */
export type TCacheEntry<TData> = {
	data: TData;
	timestamp: number;
	subscribers: number;
};

/**
 * Internal in-flight request tracking
 * @internal
 */
export type TInflightRequest<TData> = {
	promise: Promise<TData>;
	controller: AbortController;
};
