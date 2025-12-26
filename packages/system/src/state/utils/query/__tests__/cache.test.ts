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
});
