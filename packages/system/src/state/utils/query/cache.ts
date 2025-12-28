import type { TCacheEntry } from "./types.js";

/**
 * Global query cache singleton
 * Manages cached data across all queries with automatic garbage collection
 */
class QueryCache {
	private cache = new Map<string, TCacheEntry<any>>();
	private gcTimers = new Map<string, ReturnType<typeof setTimeout>>();

	/**
	 * Get cached data for a key
	 *
	 * @param key Query key
	 * @returns Cache entry or undefined if not found
	 */
	get<TData>(key: string): TCacheEntry<TData> | undefined {
		return this.cache.get(key);
	}

	/**
	 * Set cached data for a key
	 *
	 * @param key Query key
	 * @param data Data to cache
	 * @param cacheTime Time in ms before garbage collection
	 */
	set<TData>(key: string, data: TData, cacheTime: number): void {
		const existing = this.cache.get(key);

		this.cache.set(key, {
			data,
			timestamp: Date.now(),
			subscribers: existing ? existing.subscribers : 1,
		});

		this.scheduleGC(key, cacheTime);
	}

	/**
	 * Check if data is stale
	 *
	 * @param key Query key
	 * @param staleTime Time in ms before data is considered stale
	 * @returns True if data is stale or not found
	 */
	isStale(key: string, staleTime: number): boolean {
		const entry = this.cache.get(key);
		if (!entry) return true;

		const age = Date.now() - entry.timestamp;
		return age > staleTime;
	}

	/**
	 * Delete cache entry
	 *
	 * @param key Query key
	 */
	delete(key: string): void {
		this.cache.delete(key);

		const timer = this.gcTimers.get(key);
		if (timer) {
			clearTimeout(timer);
			this.gcTimers.delete(key);
		}
	}

	/**
	 * Increment subscriber count
	 *
	 * @param key Query key
	 */
	subscribe(key: string): void {
		const entry = this.cache.get(key);
		if (entry) {
			entry.subscribers++;
		}
	}

	/**
	 * Decrement subscriber count
	 *
	 * @param key Query key
	 */
	unsubscribe(key: string): void {
		const entry = this.cache.get(key);
		if (entry) {
			entry.subscribers = Math.max(0, entry.subscribers - 1);
		}
	}

	/**
	 * Schedule garbage collection for inactive query
	 *
	 * @param key Query key
	 * @param cacheTime Time in ms before garbage collection
	 */
	private scheduleGC(key: string, cacheTime: number): void {
		const existing = this.gcTimers.get(key);
		if (existing) {
			clearTimeout(existing);
		}

		const timer = setTimeout(() => {
			const entry = this.cache.get(key);
			if (entry && entry.subscribers === 0) {
				this.delete(key);
			}
		}, cacheTime);

		this.gcTimers.set(key, timer);
	}

	/**
	 * Clear all cache
	 */
	clear(): void {
		this.cache.clear();

		for (const timer of this.gcTimers.values()) {
			clearTimeout(timer);
		}
		this.gcTimers.clear();
	}

	/**
	 * Invalidate queries matching a pattern
	 * Supports glob patterns (* and ?) and RegExp
	 *
	 * @param pattern Glob pattern string or RegExp to match keys
	 * @returns Array of invalidated keys
	 *
	 * @example
	 * ```typescript
	 * // Invalidate all user queries
	 * queryCache.invalidatePattern('user-*');
	 *
	 * // Invalidate with regex
	 * queryCache.invalidatePattern(/^user-\d+$/);
	 * ```
	 */
	invalidatePattern(pattern: string | RegExp): string[] {
		const keysToInvalidate: string[] = [];

		for (const [key] of this.cache) {
			if (this.matchesPattern(key, pattern)) {
				keysToInvalidate.push(key);
			}
		}

		for (const key of keysToInvalidate) {
			this.delete(key);
		}

		return keysToInvalidate;
	}

	/**
	 * Invalidate queries matching a predicate function
	 *
	 * @param predicate Function that returns true for keys to invalidate
	 * @returns Array of invalidated keys
	 *
	 * @example
	 * ```typescript
	 * // Invalidate all stale queries
	 * queryCache.invalidateQueries((key, entry) => {
	 *   const age = Date.now() - entry.timestamp;
	 *   return age > 60000; // 1 minute
	 * });
	 * ```
	 */
	invalidateQueries(
		predicate: (key: string, entry: TCacheEntry<any>) => boolean,
	): string[] {
		const keysToInvalidate: string[] = [];

		for (const [key, entry] of this.cache) {
			if (predicate(key, entry)) {
				keysToInvalidate.push(key);
			}
		}

		for (const key of keysToInvalidate) {
			this.delete(key);
		}

		return keysToInvalidate;
	}

	/**
	 * Get all cache keys
	 *
	 * @returns Array of all cached query keys
	 */
	getKeys(): string[] {
		return Array.from(this.cache.keys());
	}

	/**
	 * Match key against pattern
	 *
	 * @param key Query key
	 * @param pattern String glob pattern or RegExp
	 * @returns True if key matches pattern
	 */
	private matchesPattern(key: string, pattern: string | RegExp): boolean {
		if (pattern instanceof RegExp) {
			return pattern.test(key);
		}

		const regexPattern = pattern
			.replace(/\*/g, "__STAR__")
			.replace(/\?/g, "__QUESTION__")
			.replace(/[.+^${}()|[\]\\]/g, "\\$&")
			.replace(/__STAR__/g, ".*")
			.replace(/__QUESTION__/g, ".");

		return new RegExp(`^${regexPattern}$`).test(key);
	}

	/**
	 * Get cache size
	 */
	get size(): number {
		return this.cache.size;
	}
}

/**
 * Global cache singleton instance
 */
export const queryCache = new QueryCache();
