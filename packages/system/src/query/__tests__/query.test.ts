import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { queryCache } from "../cache.js";
import { query } from "../query.js";

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
			const fetcher = vi.fn(async () => new Promise((resolve) => setTimeout(() => resolve("data"), 100)));

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

	describe("External Cache Updates (Optimistic Updates)", () => {
		it("should update query.data when cache is updated externally", async () => {
			const fetcher = vi.fn(async () => ["user1", "user2"]);

			const usersQuery = query("users", fetcher);

			await vi.runAllTimersAsync();

			expect(usersQuery.data).toEqual(["user1", "user2"]);

			queryCache.set("users", ["user1", "user2", "user3"], 300000);

			expect(usersQuery.data).toEqual(["user1", "user2", "user3"]);
			expect(usersQuery.isSuccess).toBe(true);
			expect(usersQuery.status).toBe("success");
		});

		it("should react to multiple external cache updates", async () => {
			const fetcher = vi.fn(async () => "initial");

			const dataQuery = query("data", fetcher);

			await vi.runAllTimersAsync();

			expect(dataQuery.data).toBe("initial");

			queryCache.set("data", "update1", 300000);
			expect(dataQuery.data).toBe("update1");

			queryCache.set("data", "update2", 300000);
			expect(dataQuery.data).toBe("update2");

			queryCache.set("data", "update3", 300000);
			expect(dataQuery.data).toBe("update3");
		});

		it("should support optimistic updates with rollback", async () => {
			const fetcher = vi.fn(async () => [{ id: 1, text: "Todo 1" }]);

			const todosQuery = query("todos", fetcher);

			await vi.runAllTimersAsync();

			const previous = queryCache.get("todos");

			const optimistic = [
				...(previous?.data || []),
				{ id: 2, text: "Todo 2" },
			];
			queryCache.set("todos", optimistic, 300000);

			expect(todosQuery.data).toEqual([
				{ id: 1, text: "Todo 1" },
				{ id: 2, text: "Todo 2" },
			]);

			queryCache.set("todos", previous!.data, 300000);

			expect(todosQuery.data).toEqual([{ id: 1, text: "Todo 1" }]);
		});

		it("should not update query for different cache key", async () => {
			const fetcher1 = vi.fn(async () => "data1");
			const fetcher2 = vi.fn(async () => "data2");

			const query1 = query("key1", fetcher1);
			const query2 = query("key2", fetcher2);

			await vi.runAllTimersAsync();

			queryCache.set("key1", "updated1", 300000);

			expect(query1.data).toBe("updated1");
			expect(query2.data).toBe("data2");
		});

		it("should work with enabled: false and then external update", async () => {
			const fetcher = vi.fn(async () => "initial");

			const dataQuery = query("data", fetcher, { enabled: false });

			await vi.runAllTimersAsync();

			expect(dataQuery.data).toBeNull();
			expect(fetcher).not.toHaveBeenCalled();

			queryCache.set("data", "external-data", 300000);

			expect(dataQuery.data).toBe("external-data");
			expect(dataQuery.isSuccess).toBe(true);
		});
	});
});
