import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { queryCache } from "../cache.js";
import { prefetchQuery } from "../prefetch.js";
import { query } from "../query.js";

describe("prefetchQuery()", () => {
	beforeEach(() => {
		queryCache.clear();
		vi.useFakeTimers();
	});

	afterEach(() => {
		queryCache.clear();
		vi.restoreAllMocks();
		vi.useRealTimers();
	});

	describe("Basic Functionality", () => {
		it("should prefetch data and store in cache", async () => {
			const fetcher = vi.fn(async () => ({ name: "John" }));

			const promise = prefetchQuery("user", fetcher);

			await vi.runAllTimersAsync();
			await promise;

			expect(fetcher).toHaveBeenCalledTimes(1);
			expect(queryCache.get("user")?.data).toEqual({ name: "John" });
		});

		it("should resolve when prefetch completes", async () => {
			const fetcher = vi.fn(async () => "data");

			const promise = prefetchQuery("test", fetcher);

			await vi.runAllTimersAsync();
			await expect(promise).resolves.toBeUndefined();
		});

		it("should not throw on error", async () => {
			const error = new Error("Fetch failed");
			const fetcher = vi.fn(async () => {
				throw error;
			});

			const promise = prefetchQuery("test", fetcher);

			await vi.runAllTimersAsync();
			await expect(promise).resolves.toBeUndefined();
		});

		it("should fail silently and not populate cache on error", async () => {
			const error = new Error("Fetch failed");
			const fetcher = vi.fn(async () => {
				throw error;
			});

			const promise = prefetchQuery("test", fetcher);

			await vi.runAllTimersAsync();
			await promise;

			expect(queryCache.get("test")).toBeUndefined();
		});
	});

	describe("Cache Coordination", () => {
		it("should skip fetch if data exists and is fresh", async () => {
			queryCache.set("user", { name: "Cached" }, 300000);

			const fetcher = vi.fn(async () => ({ name: "New" }));

			const promise = prefetchQuery("user", fetcher, { staleTime: 5000 });

			await vi.runAllTimersAsync();
			await promise;

			expect(fetcher).not.toHaveBeenCalled();
			expect(queryCache.get("user")?.data).toEqual({ name: "Cached" });
		});

		it("should refetch if data is stale", async () => {
			queryCache.set("user", { name: "Old" }, 300000);

			vi.advanceTimersByTime(6000);

			const fetcher = vi.fn(async () => ({ name: "New" }));

			const promise = prefetchQuery("user", fetcher, { staleTime: 5000 });

			await vi.runAllTimersAsync();
			await promise;

			expect(fetcher).toHaveBeenCalledTimes(1);
			expect(queryCache.get("user")?.data).toEqual({ name: "New" });
		});

		it("should refetch if force=true", async () => {
			queryCache.set("user", { name: "Cached" }, 300000);

			const fetcher = vi.fn(async () => ({ name: "Forced" }));

			const promise = prefetchQuery("user", fetcher, {
				staleTime: 5000,
				force: true,
			});

			await vi.runAllTimersAsync();
			await promise;

			expect(fetcher).toHaveBeenCalledTimes(1);
			expect(queryCache.get("user")?.data).toEqual({ name: "Forced" });
		});

		it("should deduplicate with concurrent query()", async () => {
			const fetcher = vi.fn(async () => "data");

			const prefetchPromise = prefetchQuery("users", fetcher);
			const usersQuery = query("users", fetcher);

			await vi.runAllTimersAsync();
			await prefetchPromise;

			expect(fetcher).toHaveBeenCalledTimes(1);
			expect(usersQuery.data).toBe("data");
		});
	});

	describe("Options", () => {
		it("should respect staleTime", async () => {
			queryCache.set("user", "old", 300000);

			vi.advanceTimersByTime(3000);

			const fetcher = vi.fn(async () => "new");

			await prefetchQuery("user", fetcher, { staleTime: 5000 });

			await vi.runAllTimersAsync();

			expect(fetcher).not.toHaveBeenCalled();
		});

		it("should respect cacheTime", async () => {
			const fetcher = vi.fn(async () => "data");

			const promise = prefetchQuery("user", fetcher, { cacheTime: 10000 });

			await vi.runAllTimersAsync();
			await promise;

			const entry = queryCache.get("user");
			expect(entry).toBeDefined();
		});

		it("should respect force option", async () => {
			queryCache.set("user", "old", 300000);

			const fetcher = vi.fn(async () => "new");

			const promise = prefetchQuery("user", fetcher, {
				staleTime: 10000,
				force: true,
			});

			await vi.runAllTimersAsync();
			await promise;

			expect(fetcher).toHaveBeenCalledTimes(1);
			expect(queryCache.get("user")?.data).toBe("new");
		});
	});

	describe("Integration", () => {
		it("should populate cache for later query() use", async () => {
			const fetcher = vi.fn(async () => ({ users: ["John", "Jane"] }));

			const promise = prefetchQuery("users", fetcher, { staleTime: 10000 });

			await vi.runAllTimersAsync();
			await promise;

			expect(queryCache.get("users")?.data).toEqual({ users: ["John", "Jane"] });
			expect(fetcher).toHaveBeenCalledTimes(1);

			const usersQuery = query("users", fetcher, { staleTime: 10000 });

			await vi.runAllTimersAsync();

			expect(usersQuery.isLoading).toBe(false);
			expect(usersQuery.data).toEqual({ users: ["John", "Jane"] });
		});

		it("should work with reactive keys", async () => {
			const fetcher = vi.fn(async () => "data");

			const keyFn = () => "dynamic-key";

			const promise = prefetchQuery(keyFn, fetcher);

			await vi.runAllTimersAsync();
			await promise;

			expect(queryCache.get("dynamic-key")?.data).toBe("data");
		});

		it("should handle multiple prefetch calls for same key", async () => {
			const fetcher = vi.fn(async () => "data");

			const promise1 = prefetchQuery("test", fetcher);
			const promise2 = prefetchQuery("test", fetcher);

			await vi.runAllTimersAsync();
			await Promise.all([promise1, promise2]);

			expect(fetcher).toHaveBeenCalledTimes(1);
		});
	});
});
