import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { query } from "../query.js";
import { queryCache } from "../cache.js";

describe("query()", () => {
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
		it("should fetch data on initialization", async () => {
			const fetcher = vi.fn(async () => ({ name: "John" }));

			const userQuery = query("user", fetcher);

			expect(userQuery.isLoading).toBe(true);
			expect(userQuery.status).toBe("loading");

			await vi.runAllTimersAsync();

			expect(fetcher).toHaveBeenCalledTimes(1);
			expect(userQuery.data).toEqual({ name: "John" });
			expect(userQuery.isLoading).toBe(false);
			expect(userQuery.isSuccess).toBe(true);
			expect(userQuery.status).toBe("success");
		});

		it("should update error state on failed fetch", async () => {
			const error = new Error("Fetch failed");
			const fetcher = vi.fn(async () => {
				throw error;
			});

			const userQuery = query("user", fetcher);

			await vi.runAllTimersAsync();

			expect(userQuery.error?.message).toBe(error.message);
			expect(userQuery.isError).toBe(true);
			expect(userQuery.isSuccess).toBe(false);
			expect(userQuery.status).toBe("error");
		});

		it("should set isLoading during first fetch", async () => {
			const fetcher = vi.fn(
				async () =>
					new Promise((resolve) => setTimeout(() => resolve("data"), 100)),
			);

			const userQuery = query("user", fetcher);

			expect(userQuery.isLoading).toBe(true);
			expect(userQuery.isFetching).toBe(true);

			await vi.runAllTimersAsync();

			expect(userQuery.isLoading).toBe(false);
			expect(userQuery.isFetching).toBe(false);
		});

		it("should respect enabled: false option", async () => {
			const fetcher = vi.fn(async () => "data");

			const userQuery = query("user", fetcher, { enabled: false });

			await vi.runAllTimersAsync();

			expect(fetcher).not.toHaveBeenCalled();
			expect(userQuery.status).toBe("idle");
		});

		it("should use initialData if provided", () => {
			const fetcher = vi.fn(async () => "new data");

			const userQuery = query("user", fetcher, {
				initialData: "initial data",
			});

			expect(userQuery.data).toBe("initial data");
			expect(userQuery.isSuccess).toBe(true);
			expect(userQuery.status).toBe("success");
		});
	});

	describe("Caching", () => {
		it("should cache data after successful fetch", async () => {
			const fetcher = vi.fn(async () => "data");

			const userQuery = query("user", fetcher, { staleTime: 5000 });

			await vi.runAllTimersAsync();

			expect(fetcher).toHaveBeenCalledTimes(1);
			expect(userQuery.data).toBe("data");

			expect(queryCache.size).toBe(1);
			expect(queryCache.get("user")).toBeDefined();
			expect(queryCache.get("user")?.data).toBe("data");
		});

		it("should refetch if data is stale", async () => {
			const fetcher = vi.fn(async () => "data");

			const query1 = query("user", fetcher, { staleTime: 1000 });

			await vi.runAllTimersAsync();

			expect(fetcher).toHaveBeenCalledTimes(1);

			vi.advanceTimersByTime(2000);

			const query2 = query("user", fetcher, { staleTime: 1000 });

			await vi.runAllTimersAsync();

			expect(fetcher).toHaveBeenCalledTimes(2);
		});

		it("should invalidate cache on invalidate()", async () => {
			const fetcher = vi.fn(async () => "data");

			const userQuery = query("user", fetcher);

			await vi.runAllTimersAsync();

			expect(fetcher).toHaveBeenCalledTimes(1);

			userQuery.invalidate();

			await vi.runAllTimersAsync();

			expect(fetcher).toHaveBeenCalledTimes(2);
		});
	});

	describe("Refetching", () => {
		it("should refetch manually with refetch()", async () => {
			const fetcher = vi.fn(async () => "data");

			const userQuery = query("user", fetcher);

			await vi.runAllTimersAsync();

			expect(fetcher).toHaveBeenCalledTimes(1);

			await userQuery.refetch();

			await vi.runAllTimersAsync();

			expect(fetcher).toHaveBeenCalledTimes(2);
		});
	});

	describe("Lifecycle", () => {
		it("should call onSuccess callback", async () => {
			const onSuccess = vi.fn();
			const fetcher = vi.fn(async () => "data");

			query("user", fetcher, { onSuccess });

			await vi.runAllTimersAsync();

			expect(onSuccess).toHaveBeenCalledWith("data");
		});

		it("should call onError callback", async () => {
			const onError = vi.fn();
			const error = new Error("Failed");
			const fetcher = vi.fn(async () => {
				throw error;
			});

			query("user", fetcher, { onError, retry: false });

			await vi.runAllTimersAsync();

			expect(onError).toHaveBeenCalledWith(error);
		});

		it("should reset state with reset()", async () => {
			const fetcher = vi.fn(async () => "data");

			const userQuery = query("user", fetcher);

			await vi.runAllTimersAsync();

			expect(userQuery.data).toBe("data");

			userQuery.reset();

			expect(userQuery.data).toBe(null);
			expect(userQuery.status).toBe("idle");
		});
	});

	describe("Retry Logic", () => {
		it("should retry on failure", async () => {
			let attempts = 0;
			const fetcher = vi.fn(async () => {
				attempts++;
				if (attempts < 3) {
					throw new Error("Failed");
				}
				return "success";
			});

			const userQuery = query("user", fetcher, { retry: 3, retryDelay: 100 });

			await vi.runAllTimersAsync();

			expect(fetcher).toHaveBeenCalledTimes(3);
			expect(userQuery.data).toBe("success");
		});

		it("should not retry if retry: false", async () => {
			const fetcher = vi.fn(async () => {
				throw new Error("Failed");
			});

			query("user", fetcher, { retry: false });

			await vi.runAllTimersAsync();

			expect(fetcher).toHaveBeenCalledTimes(1);
		});
	});
});
