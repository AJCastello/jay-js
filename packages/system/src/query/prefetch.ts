import { queryCache } from "./cache.js";
import type { TPrefetchOptions, TQueryFetcher, TQueryKey } from "./types.js";
import { defaultRetryDelay, executeFetch, executeWithRetry, resolveQueryKey } from "./utils.js";

/**
 * Default prefetch options
 */
const DEFAULT_OPTIONS: Required<TPrefetchOptions> = {
	staleTime: 0,
	cacheTime: 300000,
	force: false,
};

/**
 * Prefetch query data before component mounts
 * Populates cache for later use by query()
 *
 * Unlike query(), prefetchQuery doesn't create a reactive store.
 * It simply loads data into the cache for instant availability when query() is called.
 *
 * @param key Query key to prefetch
 * @param fetcher Async function to fetch data
 * @param options Prefetch configuration options
 * @returns Promise that resolves when prefetch completes (or fails silently)
 *
 * @example
 * Basic usage:
 * ```typescript
 * // Prefetch on route change
 * router.beforeEach(async (to) => {
 *   if (to.path === '/users') {
 *     await prefetchQuery('users', fetchUsers);
 *   }
 * });
 *
 * // Later, component mounts
 * const usersQuery = query('users', fetchUsers);
 * // → isLoading = false (cache hit!)
 * // → data = [prefetched users]
 * ```
 *
 * @example
 * With staleTime:
 * ```typescript
 * // Only prefetch if data is stale
 * await prefetchQuery('users', fetchUsers, { staleTime: 5000 });
 * ```
 *
 * @example
 * Force refetch:
 * ```typescript
 * // Always fetch regardless of cache
 * await prefetchQuery('users', fetchUsers, { force: true });
 * ```
 */
export async function prefetchQuery<TData = unknown>(
	key: TQueryKey,
	fetcher: TQueryFetcher<TData>,
	options: TPrefetchOptions = {},
): Promise<void> {
	const opts = { ...DEFAULT_OPTIONS, ...options };
	const queryKey = resolveQueryKey(key);

	const cached = queryCache.get<TData>(queryKey);
	if (!opts.force && cached && !queryCache.isStale(queryKey, opts.staleTime)) {
		return;
	}

	try {
		const data = await executeFetch(
			queryKey,
			(signal) => executeWithRetry(fetcher, 3, defaultRetryDelay, signal),
		);

		queryCache.set(queryKey, data, opts.cacheTime);
	} catch {
		//
	}
}
