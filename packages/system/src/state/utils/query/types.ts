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

/**
 * Mutation status
 */
export type TMutationStatus = "idle" | "loading" | "success" | "error";

/**
 * Function that performs the mutation
 *
 * @param variables Variables to pass to the mutation
 * @param signal AbortSignal to cancel the request
 * @returns Promise with the mutation result
 *
 * @example
 * ```typescript
 * const fetcher: TMutationFetcher<User, UpdateUserInput> = async (input, signal) => {
 *   const res = await fetch(`/api/users/${input.id}`, {
 *     method: 'PUT',
 *     body: JSON.stringify(input),
 *     signal,
 *   });
 *   return res.json();
 * };
 * ```
 */
export type TMutationFetcher<TData, TVariables> = (
	variables: TVariables,
	signal: AbortSignal,
) => Promise<TData>;

/**
 * Mutation configuration options
 */
export type TMutationOptions<
	TData = unknown,
	TError = Error,
	TVariables = void,
	TContext = unknown,
> = {
	/**
	 * Callback before mutation executes
	 * Can return context for rollback
	 */
	onMutate?: (variables: TVariables) => TContext | Promise<TContext>;

	/**
	 * Callback when mutation succeeds
	 */
	onSuccess?: (
		data: TData,
		variables: TVariables,
		context: TContext | undefined,
	) => void | Promise<void>;

	/**
	 * Callback when mutation fails
	 */
	onError?: (
		error: TError,
		variables: TVariables,
		context: TContext | undefined,
	) => void | Promise<void>;

	/**
	 * Callback when mutation settles (success or error)
	 */
	onSettled?: (
		data: TData | undefined,
		error: TError | null,
		variables: TVariables,
		context: TContext | undefined,
	) => void | Promise<void>;

	/**
	 * Number of retry attempts or false to disable
	 * @default false
	 */
	retry?: number | boolean;

	/**
	 * Delay between retries in ms or function to calculate delay
	 * @default (attempt) => Math.min(1000 * 2 ** attempt, 30000)
	 */
	retryDelay?: number | ((attempt: number) => number);

	/**
	 * Query keys to invalidate on success
	 */
	invalidateQueries?: string[];

	/**
	 * Pattern to invalidate queries on success
	 * Supports glob patterns (* and ?) or RegExp
	 *
	 * @example
	 * ```typescript
	 * // Glob pattern
	 * invalidatePattern: 'user-*'
	 *
	 * // RegExp
	 * invalidatePattern: /^user-\d+$/
	 * ```
	 */
	invalidatePattern?: string | RegExp;

	/**
	 * Predicate function to invalidate queries on success
	 *
	 * @example
	 * ```typescript
	 * invalidateIf: (key, entry) => {
	 *   const age = Date.now() - entry.timestamp;
	 *   return age > 60000; // Invalidate queries older than 1 minute
	 * }
	 * ```
	 */
	invalidateIf?: TCacheInvalidationPredicate;
};

/**
 * Mutation store returned by mutation()
 *
 * @example
 * ```typescript
 * const createUser = mutation(
 *   async (user: User, signal) => {
 *     const res = await fetch('/api/users', {
 *       method: 'POST',
 *       body: JSON.stringify(user),
 *       signal,
 *     });
 *     return res.json();
 *   }
 * );
 *
 * // Execute mutation
 * await createUser.mutate({ name: 'John', email: 'john@example.com' });
 * ```
 */
export type TMutationStore<
	TData,
	TError = Error,
	TVariables = void,
	TContext = unknown,
> = {
	/**
	 * Mutation data state
	 */
	data: TData | null;

	/**
	 * Mutation error state
	 */
	error: TError | null;

	/**
	 * Whether the mutation is currently executing
	 */
	isLoading: boolean;

	/**
	 * Whether the mutation is in error state
	 */
	isError: boolean;

	/**
	 * Whether the mutation is in success state
	 */
	isSuccess: boolean;

	/**
	 * Whether the mutation is idle (never executed)
	 */
	isIdle: boolean;

	/**
	 * Current mutation status
	 */
	status: TMutationStatus;

	/**
	 * Execute the mutation with variables
	 */
	mutate: (variables: TVariables) => Promise<TData>;

	/**
	 * Execute the mutation without throwing errors
	 */
	mutateAsync: (variables: TVariables) => Promise<TData | undefined>;

	/**
	 * Reset mutation to initial state
	 */
	reset: () => void;

	/**
	 * Cancel ongoing mutation
	 */
	cancel: () => void;
};

/**
 * Prefetch options
 */
export type TPrefetchOptions = {
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
	 * Force refetch even if data exists in cache
	 * @default false
	 */
	force?: boolean;
};

/**
 * Cache invalidation predicate function
 * Used to selectively invalidate cache entries based on custom logic
 *
 * @param key Cache entry key
 * @param entry Cache entry with data and metadata
 * @returns True if the entry should be invalidated
 *
 * @example
 * ```typescript
 * // Invalidate all stale entries older than 1 minute
 * queryCache.invalidateQueries((key, entry) => {
 *   const age = Date.now() - entry.timestamp;
 *   return age > 60000;
 * });
 * ```
 */
export type TCacheInvalidationPredicate = (
	key: string,
	entry: TCacheEntry<any>,
) => boolean;
