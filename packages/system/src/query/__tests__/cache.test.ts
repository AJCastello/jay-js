import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { queryCache } from "../cache.js";

describe("queryCache", () => {
	beforeEach(() => {
		queryCache.clear();
		vi.useFakeTimers();
	});

	afterEach(() => {
		queryCache.clear();
		vi.restoreAllMocks();
		vi.useRealTimers();
	});

	it("should store and retrieve data", () => {
		queryCache.set("test", { foo: "bar" }, 5000);

		const cached = queryCache.get("test");

		expect(cached).toBeDefined();
		expect(cached?.data).toEqual({ foo: "bar" });
	});

	it("should detect stale data", () => {
		queryCache.set("test", "data", 5000);

		expect(queryCache.isStale("test", 1000)).toBe(false);

		vi.advanceTimersByTime(2000);

		expect(queryCache.isStale("test", 1000)).toBe(true);
	});

	it("should delete data", () => {
		queryCache.set("test", "data", 5000);

		expect(queryCache.get("test")).toBeDefined();

		queryCache.delete("test");

		expect(queryCache.get("test")).toBeUndefined();
	});

	describe("Pattern Matching", () => {
		it("should invalidate pattern with * wildcard", () => {
			queryCache.set("user-1", "data1", 5000);
			queryCache.set("user-2", "data2", 5000);
			queryCache.set("post-1", "data3", 5000);

			const invalidated = queryCache.invalidatePattern("user-*");

			expect(invalidated).toEqual(["user-1", "user-2"]);
			expect(queryCache.get("user-1")).toBeUndefined();
			expect(queryCache.get("user-2")).toBeUndefined();
			expect(queryCache.get("post-1")).toBeDefined();
		});

		it("should invalidate pattern with ? wildcard", () => {
			queryCache.set("user-a", "data1", 5000);
			queryCache.set("user-b", "data2", 5000);
			queryCache.set("user-ab", "data3", 5000);

			const invalidated = queryCache.invalidatePattern("user-?");

			expect(invalidated).toEqual(["user-a", "user-b"]);
			expect(queryCache.get("user-a")).toBeUndefined();
			expect(queryCache.get("user-b")).toBeUndefined();
			expect(queryCache.get("user-ab")).toBeDefined();
		});

		it("should invalidate pattern with regex", () => {
			queryCache.set("user-1", "data1", 5000);
			queryCache.set("user-2", "data2", 5000);
			queryCache.set("user-abc", "data3", 5000);

			const invalidated = queryCache.invalidatePattern(/^user-\d+$/);

			expect(invalidated).toEqual(["user-1", "user-2"]);
			expect(queryCache.get("user-1")).toBeUndefined();
			expect(queryCache.get("user-2")).toBeUndefined();
			expect(queryCache.get("user-abc")).toBeDefined();
		});

		it("should return empty array for no matches", () => {
			queryCache.set("user-1", "data1", 5000);

			const invalidated = queryCache.invalidatePattern("post-*");

			expect(invalidated).toEqual([]);
			expect(queryCache.get("user-1")).toBeDefined();
		});

		it("should invalidate queries by predicate", () => {
			queryCache.set("old-1", "data1", 5000);
			queryCache.set("old-2", "data2", 5000);
			queryCache.set("new", "data3", 5000);

			const invalidated = queryCache.invalidateQueries((key) => key.startsWith("old-"));

			expect(invalidated).toEqual(["old-1", "old-2"]);
			expect(queryCache.get("old-1")).toBeUndefined();
			expect(queryCache.get("old-2")).toBeUndefined();
			expect(queryCache.get("new")).toBeDefined();
		});

		it("should invalidate queries by timestamp predicate", () => {
			queryCache.set("old", "data1", 5000);

			vi.advanceTimersByTime(3000);

			queryCache.set("new", "data2", 5000);

			const invalidated = queryCache.invalidateQueries((key, entry) => {
				const age = Date.now() - entry.timestamp;
				return age > 2000;
			});

			expect(invalidated).toEqual(["old"]);
			expect(queryCache.get("old")).toBeUndefined();
			expect(queryCache.get("new")).toBeDefined();
		});

		it("should return all cache keys", () => {
			queryCache.set("user-1", "data1", 5000);
			queryCache.set("user-2", "data2", 5000);
			queryCache.set("post-1", "data3", 5000);

			const keys = queryCache.getKeys();

			expect(keys).toEqual(["user-1", "user-2", "post-1"]);
		});

		it("should return empty array for empty cache", () => {
			const keys = queryCache.getKeys();

			expect(keys).toEqual([]);
		});
	});
});
