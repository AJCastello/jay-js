import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { queryCache } from "../cache.js";
import { mutation } from "../mutation.js";

describe("mutation()", () => {
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
		it("should start in idle state", () => {
			const fetcher = vi.fn(async () => "data");
			const mut = mutation(fetcher);

			expect(mut.isIdle).toBe(true);
			expect(mut.isLoading).toBe(false);
			expect(mut.isSuccess).toBe(false);
			expect(mut.isError).toBe(false);
			expect(mut.status).toBe("idle");
			expect(mut.data).toBe(null);
			expect(mut.error).toBe(null);
		});

		it("should execute mutation and update state", async () => {
			const fetcher = vi.fn(async () => ({ id: 1, name: "John" }));
			const mut = mutation(fetcher);

			const promise = mut.mutate({ name: "John" });

			expect(mut.isLoading).toBe(true);
			expect(mut.isIdle).toBe(false);
			expect(mut.status).toBe("loading");

			await vi.runAllTimersAsync();
			await promise;

			expect(fetcher).toHaveBeenCalledTimes(1);
			expect(mut.data).toEqual({ id: 1, name: "John" });
			expect(mut.isLoading).toBe(false);
			expect(mut.isSuccess).toBe(true);
			expect(mut.status).toBe("success");
		});

		it("should update error state on failed mutation", async () => {
			const error = new Error("Mutation failed");
			const fetcher = vi.fn(async () => {
				throw error;
			});

			const mut = mutation(fetcher);

			let caughtError: Error | null = null;
			try {
				const promise = mut.mutate({ name: "John" });
				await vi.runAllTimersAsync();
				await promise;
			} catch (err) {
				caughtError = err as Error;
			}

			expect(caughtError?.message).toBe("Mutation failed");
			expect(mut.error?.message).toBe(error.message);
			expect(mut.isError).toBe(true);
			expect(mut.isSuccess).toBe(false);
			expect(mut.status).toBe("error");
		});

		it("should clear idle state after first execution", async () => {
			const fetcher = vi.fn(async () => "data");
			const mut = mutation(fetcher);

			expect(mut.isIdle).toBe(true);

			const promise = mut.mutate("input");
			await vi.runAllTimersAsync();
			await promise;

			expect(mut.isIdle).toBe(false);
		});
	});

	describe("Callbacks", () => {
		it("should execute callbacks in correct order on success", async () => {
			const executionOrder: string[] = [];

			const onMutate = vi.fn(() => {
				executionOrder.push("onMutate");
				return { context: "data" };
			});
			const fetcher = vi.fn(async () => {
				executionOrder.push("fetcher");
				return "data";
			});
			const onSuccess = vi.fn(() => {
				executionOrder.push("onSuccess");
			});
			const onSettled = vi.fn(() => {
				executionOrder.push("onSettled");
			});

			const mut = mutation(fetcher, { onMutate, onSuccess, onSettled });

			const promise = mut.mutate("input");
			await vi.runAllTimersAsync();
			await promise;

			expect(executionOrder).toEqual([
				"onMutate",
				"fetcher",
				"onSuccess",
				"onSettled",
			]);
		});

		it("should execute callbacks in correct order on error", async () => {
			const executionOrder: string[] = [];

			const onMutate = vi.fn(() => {
				executionOrder.push("onMutate");
				return { context: "data" };
			});
			const fetcher = vi.fn(async () => {
				executionOrder.push("fetcher");
				throw new Error("Failed");
			});
			const onError = vi.fn(() => {
				executionOrder.push("onError");
			});
			const onSettled = vi.fn(() => {
				executionOrder.push("onSettled");
			});

			const mut = mutation(fetcher, { onMutate, onError, onSettled, retry: false });

			try {
				const promise = mut.mutate("input");
				await vi.runAllTimersAsync();
				await promise;
			} catch {
				//
			}

			expect(executionOrder).toEqual([
				"onMutate",
				"fetcher",
				"onError",
				"onSettled",
			]);
		});

		it("should call onMutate before mutation", async () => {
			const onMutate = vi.fn();
			const fetcher = vi.fn(async () => "data");

			const mut = mutation(fetcher, { onMutate });

			const promise = mut.mutate("input");
			await vi.runAllTimersAsync();
			await promise;

			expect(onMutate).toHaveBeenCalledWith("input");
			expect(onMutate).toHaveBeenCalledBefore(fetcher as any);
		});

		it("should call onSuccess after successful mutation", async () => {
			const onSuccess = vi.fn();
			const fetcher = vi.fn(async () => "data");

			const mut = mutation(fetcher, { onSuccess });

			const promise = mut.mutate("input");
			await vi.runAllTimersAsync();
			await promise;

			expect(onSuccess).toHaveBeenCalledWith("data", "input", undefined);
		});

		it("should call onError after failed mutation", async () => {
			const onError = vi.fn();
			const error = new Error("Failed");
			const fetcher = vi.fn(async () => {
				throw error;
			});

			const mut = mutation(fetcher, { onError, retry: false });

			try {
				const promise = mut.mutate("input");
				await vi.runAllTimersAsync();
				await promise;
			} catch {
				//
			}

			expect(onError).toHaveBeenCalledWith(error, "input", undefined);
		});

		it("should call onSettled in all cases", async () => {
			const onSettled = vi.fn();
			const fetcher = vi.fn(async () => "data");

			const mut = mutation(fetcher, { onSettled });

			const promise = mut.mutate("input");
			await vi.runAllTimersAsync();
			await promise;

			expect(onSettled).toHaveBeenCalledWith("data", null, "input", undefined);
		});

		it("should pass context between callbacks", async () => {
			const onMutate = vi.fn(() => ({ rollback: "data" }));
			const onSuccess = vi.fn();
			const fetcher = vi.fn(async () => "newData");

			const mut = mutation(fetcher, { onMutate, onSuccess });

			const promise = mut.mutate("input");
			await vi.runAllTimersAsync();
			await promise;

			expect(onSuccess).toHaveBeenCalledWith("newData", "input", {
				rollback: "data",
			});
		});

		it("should pass context to onError for rollback", async () => {
			const onMutate = vi.fn(() => ({ previous: "oldData" }));
			const onError = vi.fn();
			const error = new Error("Failed");
			const fetcher = vi.fn(async () => {
				throw error;
			});

			const mut = mutation(fetcher, { onMutate, onError, retry: false });

			try {
				const promise = mut.mutate("input");
				await vi.runAllTimersAsync();
				await promise;
			} catch {
				//
			}

			expect(onError).toHaveBeenCalledWith(error, "input", {
				previous: "oldData",
			});
		});
	});

	describe("Optimistic Updates", () => {
		it("should update cache in onMutate", async () => {
			const fetcher = vi.fn(async () => "newData");

			const mut = mutation(fetcher, {
				onMutate: () => {
					queryCache.set("test-key", "optimistic-data", 300000);
				},
			});

			const promise = mut.mutate("input");

			expect(queryCache.get("test-key")?.data).toBe("optimistic-data");

			await vi.runAllTimersAsync();
			await promise;
		});

		it("should rollback cache in onError", async () => {
			queryCache.set("test-key", "original-data", 300000);

			const error = new Error("Failed");
			const fetcher = vi.fn(async () => {
				throw error;
			});

			const mut = mutation(fetcher, {
				onMutate: () => {
					const previous = queryCache.get("test-key");
					queryCache.set("test-key", "optimistic-data", 300000);
					return { previous };
				},
				onError: (err, vars, context) => {
					if (context?.previous) {
						queryCache.set("test-key", context.previous.data, 300000);
					}
				},
				retry: false,
			});

			try {
				const promise = mut.mutate("input");
				await vi.runAllTimersAsync();
				await promise;
			} catch {
				//
			}

			expect(queryCache.get("test-key")?.data).toBe("original-data");
		});

		it("should preserve optimistic update on success", async () => {
			const fetcher = vi.fn(async () => "server-data");

			const mut = mutation(fetcher, {
				onMutate: () => {
					queryCache.set("test-key", "optimistic-data", 300000);
				},
				onSuccess: (data) => {
					queryCache.set("test-key", data, 300000);
				},
			});

			const promise = mut.mutate("input");
			await vi.runAllTimersAsync();
			await promise;

			expect(queryCache.get("test-key")?.data).toBe("server-data");
		});
	});

	describe("Query Invalidation", () => {
		it("should invalidate specified queries on success", async () => {
			queryCache.set("users", ["user1"], 300000);
			queryCache.set("posts", ["post1"], 300000);

			const fetcher = vi.fn(async () => "newUser");
			const mut = mutation(fetcher, {
				invalidateQueries: ["users"],
			});

			const promise = mut.mutate({ name: "John" });
			await vi.runAllTimersAsync();
			await promise;

			expect(queryCache.get("users")).toBeUndefined();
			expect(queryCache.get("posts")?.data).toEqual(["post1"]);
		});

		it("should not invalidate queries on error", async () => {
			queryCache.set("users", ["user1"], 300000);

			const error = new Error("Failed");
			const fetcher = vi.fn(async () => {
				throw error;
			});

			const mut = mutation(fetcher, {
				invalidateQueries: ["users"],
				retry: false,
			});

			try {
				const promise = mut.mutate({ name: "John" });
				await vi.runAllTimersAsync();
				await promise;
			} catch {
				//
			}

			expect(queryCache.get("users")?.data).toEqual(["user1"]);
		});

		it("should invalidate multiple queries", async () => {
			queryCache.set("users", ["user1"], 300000);
			queryCache.set("posts", ["post1"], 300000);
			queryCache.set("comments", ["comment1"], 300000);

			const fetcher = vi.fn(async () => "newUser");
			const mut = mutation(fetcher, {
				invalidateQueries: ["users", "posts"],
			});

			const promise = mut.mutate({ name: "John" });
			await vi.runAllTimersAsync();
			await promise;

			expect(queryCache.get("users")).toBeUndefined();
			expect(queryCache.get("posts")).toBeUndefined();
			expect(queryCache.get("comments")?.data).toEqual(["comment1"]);
		});

		it("should invalidate queries using pattern matching (glob)", async () => {
			queryCache.set("user-1", "data1", 300000);
			queryCache.set("user-2", "data2", 300000);
			queryCache.set("post-1", "data3", 300000);

			const fetcher = vi.fn(async () => "newUser");
			const mut = mutation(fetcher, {
				invalidatePattern: "user-*",
			});

			const promise = mut.mutate({ name: "John" });
			await vi.runAllTimersAsync();
			await promise;

			expect(queryCache.get("user-1")).toBeUndefined();
			expect(queryCache.get("user-2")).toBeUndefined();
			expect(queryCache.get("post-1")?.data).toBe("data3");
		});

		it("should invalidate queries using pattern matching (regex)", async () => {
			queryCache.set("user-1", "data1", 300000);
			queryCache.set("user-2", "data2", 300000);
			queryCache.set("user-abc", "data3", 300000);

			const fetcher = vi.fn(async () => "newUser");
			const mut = mutation(fetcher, {
				invalidatePattern: /^user-\d+$/,
			});

			const promise = mut.mutate({ name: "John" });
			await vi.runAllTimersAsync();
			await promise;

			expect(queryCache.get("user-1")).toBeUndefined();
			expect(queryCache.get("user-2")).toBeUndefined();
			expect(queryCache.get("user-abc")?.data).toBe("data3");
		});

		it("should invalidate queries using predicate function", async () => {
			queryCache.set("old-1", "data1", 300000);
			queryCache.set("old-2", "data2", 300000);
			queryCache.set("new", "data3", 300000);

			const fetcher = vi.fn(async () => "newData");
			const mut = mutation(fetcher, {
				invalidateIf: (key) => key.startsWith("old-"),
			});

			const promise = mut.mutate("input");
			await vi.runAllTimersAsync();
			await promise;

			expect(queryCache.get("old-1")).toBeUndefined();
			expect(queryCache.get("old-2")).toBeUndefined();
			expect(queryCache.get("new")?.data).toBe("data3");
		});

		it("should combine invalidateQueries and invalidatePattern", async () => {
			queryCache.set("users", ["user1"], 300000);
			queryCache.set("user-1", "data1", 300000);
			queryCache.set("user-2", "data2", 300000);
			queryCache.set("posts", ["post1"], 300000);

			const fetcher = vi.fn(async () => "newUser");
			const mut = mutation(fetcher, {
				invalidateQueries: ["users"],
				invalidatePattern: "user-*",
			});

			const promise = mut.mutate({ name: "John" });
			await vi.runAllTimersAsync();
			await promise;

			expect(queryCache.get("users")).toBeUndefined();
			expect(queryCache.get("user-1")).toBeUndefined();
			expect(queryCache.get("user-2")).toBeUndefined();
			expect(queryCache.get("posts")?.data).toEqual(["post1"]);
		});
	});

	describe("Retry Logic", () => {
		it("should not retry by default", async () => {
			const fetcher = vi.fn(async () => {
				throw new Error("Failed");
			});

			const mut = mutation(fetcher);

			try {
				const promise = mut.mutate("input");
				await vi.runAllTimersAsync();
				await promise;
			} catch {
				//
			}

			expect(fetcher).toHaveBeenCalledTimes(1);
		});

		it("should retry specified number of times", async () => {
			let attempts = 0;
			const fetcher = vi.fn(async () => {
				attempts++;
				if (attempts < 3) {
					throw new Error("Failed");
				}
				return "success";
			});

			const mut = mutation(fetcher, { retry: 3, retryDelay: 100 });

			const promise = mut.mutate("input");
			await vi.runAllTimersAsync();
			await promise;

			expect(fetcher).toHaveBeenCalledTimes(3);
			expect(mut.data).toBe("success");
		});

		it("should use retry delay with exponential backoff", async () => {
			let attempts = 0;
			const fetcher = vi.fn(async () => {
				attempts++;
				throw new Error("Failed");
			});

			const mut = mutation(fetcher, { retry: 2 });

			try {
				const promise = mut.mutate("input");
				await vi.runAllTimersAsync();
				await promise;
			} catch {
				//
			}

			expect(fetcher).toHaveBeenCalledTimes(3);
		});
	});

	describe("Cancellation", () => {
		it("should cancel in-flight mutation", async () => {
			const fetcher = vi.fn(
				async (input, signal) =>
					new Promise((resolve, reject) => {
						signal.addEventListener("abort", () => reject(new Error("Aborted")));
						setTimeout(() => resolve("data"), 1000);
					}),
			);

			const mut = mutation(fetcher);

			const promise = mut.mutate("input");
			mut.cancel();

			await vi.runAllTimersAsync();

			try {
				await promise;
			} catch {
				//
			}

			expect(mut.isLoading).toBe(false);
		});

		it("should abort previous mutation when new one starts", async () => {
			let firstAborted = false;
			const fetcher = vi.fn(
				async (input, signal) =>
					new Promise((resolve, reject) => {
						signal.addEventListener("abort", () => {
							if (input === "first") firstAborted = true;
							reject(new Error("Aborted"));
						});
						setTimeout(() => resolve(`data-${input}`), 1000);
					}),
			);

			const mut = mutation(fetcher);

			const promise1 = mut.mutate("first");
			const promise2 = mut.mutate("second");

			await vi.runAllTimersAsync();

			try {
				await promise1;
			} catch {
				//
			}

			const result = await promise2;

			expect(firstAborted).toBe(true);
			expect(result).toBe("data-second");
		});
	});

	describe("Reset", () => {
		it("should reset to idle state", async () => {
			const fetcher = vi.fn(async () => "data");
			const mut = mutation(fetcher);

			const promise = mut.mutate("input");
			await vi.runAllTimersAsync();
			await promise;

			expect(mut.data).toBe("data");
			expect(mut.isSuccess).toBe(true);

			mut.reset();

			expect(mut.data).toBe(null);
			expect(mut.error).toBe(null);
			expect(mut.isLoading).toBe(false);
			expect(mut.isError).toBe(false);
			expect(mut.isSuccess).toBe(false);
			expect(mut.isIdle).toBe(true);
			expect(mut.status).toBe("idle");
		});

		it("should clear error state on reset", async () => {
			const error = new Error("Failed");
			const fetcher = vi.fn(async () => {
				throw error;
			});

			const mut = mutation(fetcher, { retry: false });

			try {
				const promise = mut.mutate("input");
				await vi.runAllTimersAsync();
				await promise;
			} catch {
				//
			}

			expect(mut.error).toBeTruthy();
			expect(mut.isError).toBe(true);

			mut.reset();

			expect(mut.error).toBe(null);
			expect(mut.isError).toBe(false);
			expect(mut.status).toBe("idle");
		});
	});

	describe("mutateAsync", () => {
		it("should return data on success", async () => {
			const fetcher = vi.fn(async () => "data");
			const mut = mutation(fetcher);

			const promise = mut.mutateAsync("input");
			await vi.runAllTimersAsync();
			const result = await promise;

			expect(result).toBe("data");
		});

		it("should return undefined on error", async () => {
			const error = new Error("Failed");
			const fetcher = vi.fn(async () => {
				throw error;
			});

			const mut = mutation(fetcher, { retry: false });

			const promise = mut.mutateAsync("input");
			await vi.runAllTimersAsync();
			const result = await promise;

			expect(result).toBeUndefined();
		});

		it("should not throw errors", async () => {
			const error = new Error("Failed");
			const fetcher = vi.fn(async () => {
				throw error;
			});

			const mut = mutation(fetcher, { retry: false });

			const promise = mut.mutateAsync("input");
			await vi.runAllTimersAsync();

			await expect(promise).resolves.toBeUndefined();
		});
	});
});
