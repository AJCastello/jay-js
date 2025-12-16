/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest";
import { Base } from "../base.js";

describe("Lifecycle Cleanup from onmount", () => {
	it("should execute cleanup function returned from onmount on unmount", () => {
		const cleanup = vi.fn();
		const onmount = vi.fn(() => cleanup);

		const element = Base({
			tag: "div",
			onmount,
		});

		document.body.appendChild(element);
		expect(onmount).toHaveBeenCalledWith(element);
		expect(cleanup).not.toHaveBeenCalled();

		element.remove();
		expect(cleanup).toHaveBeenCalledTimes(1);
	});

	it("should execute both cleanup from onmount and onunmount", () => {
		const cleanup = vi.fn();
		const onunmount = vi.fn();
		const onmount = vi.fn(() => cleanup);

		const element = Base({
			tag: "div",
			onmount,
			onunmount,
		});

		document.body.appendChild(element);
		expect(onmount).toHaveBeenCalledWith(element);

		element.remove();

		// Both should be called
		expect(cleanup).toHaveBeenCalledTimes(1);
		expect(onunmount).toHaveBeenCalledWith(element);

		// Cleanup from onmount should be called first
		expect(cleanup).toHaveBeenCalledBefore(onunmount);
	});

	it("should not break when onmount returns void", () => {
		const onmount = vi.fn();

		const element = Base({
			tag: "div",
			onmount,
		});

		document.body.appendChild(element);
		expect(onmount).toHaveBeenCalledWith(element);

		// Should not throw on unmount
		expect(() => element.remove()).not.toThrow();
	});

	it("should handle cleanup function that throws error", () => {
		const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		const onunmount = vi.fn();
		const cleanup = vi.fn(() => {
			throw new Error("Cleanup error");
		});

		const element = Base({
			tag: "div",
			onmount: () => cleanup,
			onunmount,
		});

		document.body.appendChild(element);
		element.remove();

		expect(cleanup).toHaveBeenCalled();
		expect(consoleErrorSpy).toHaveBeenCalledWith("JayJS: Error in onmount cleanup:", expect.any(Error));

		// onunmount should still be called even if cleanup throws
		expect(onunmount).toHaveBeenCalledWith(element);

		consoleErrorSpy.mockRestore();
	});

	it("should handle onunmount that throws error", () => {
		const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		const cleanup = vi.fn();
		const onunmount = vi.fn(() => {
			throw new Error("Onunmount error");
		});

		const element = Base({
			tag: "div",
			onmount: () => cleanup,
			onunmount,
		});

		document.body.appendChild(element);
		element.remove();

		expect(cleanup).toHaveBeenCalled();
		expect(onunmount).toHaveBeenCalled();
		expect(consoleErrorSpy).toHaveBeenCalledWith("JayJS: Error in onunmount:", expect.any(Error));

		consoleErrorSpy.mockRestore();
	});

	it("should work with real-world subscription pattern", () => {
		// Simulate a subscription service
		const subscriptionCallbacks: Array<() => void> = [];
		const service = {
			subscribe: (callback: () => void) => {
				subscriptionCallbacks.push(callback);
				return {
					unsubscribe: () => {
						const index = subscriptionCallbacks.indexOf(callback);
						if (index > -1) {
							subscriptionCallbacks.splice(index, 1);
						}
					},
				};
			},
			trigger: () => {
				for (const cb of subscriptionCallbacks) {
					cb();
				}
			},
		};

		const callback = vi.fn();

		const element = Base({
			tag: "div",
			onmount: () => {
				const sub = service.subscribe(callback);
				return () => sub.unsubscribe();
			},
		});

		document.body.appendChild(element);

		// Trigger should call callback
		service.trigger();
		expect(callback).toHaveBeenCalledTimes(1);

		// After unmount, trigger should not call callback
		element.remove();
		service.trigger();
		expect(callback).toHaveBeenCalledTimes(1); // Still 1, not called again
	});

	it("should work with real-world interval pattern", () => {
		vi.useFakeTimers();
		const callback = vi.fn();

		const element = Base({
			tag: "div",
			onmount: () => {
				const interval = setInterval(callback, 100);
				return () => clearInterval(interval);
			},
		});

		document.body.appendChild(element);

		// Fast-forward time
		vi.advanceTimersByTime(250);
		expect(callback).toHaveBeenCalledTimes(2);

		// Unmount and advance time
		element.remove();
		vi.advanceTimersByTime(200);
		expect(callback).toHaveBeenCalledTimes(2); // Still 2, interval was cleared

		vi.useRealTimers();
	});

	it("should work with multiple mount/unmount cycles", () => {
		const cleanup = vi.fn();
		const onmount = vi.fn(() => cleanup);

		const element = Base({
			tag: "div",
			onmount,
		});

		// First cycle
		document.body.appendChild(element);
		expect(onmount).toHaveBeenCalledTimes(1);
		element.remove();
		expect(cleanup).toHaveBeenCalledTimes(1);

		// Second cycle
		document.body.appendChild(element);
		expect(onmount).toHaveBeenCalledTimes(2);
		element.remove();
		expect(cleanup).toHaveBeenCalledTimes(2);

		// Third cycle
		document.body.appendChild(element);
		expect(onmount).toHaveBeenCalledTimes(3);
		element.remove();
		expect(cleanup).toHaveBeenCalledTimes(3);
	});

	it("should handle cleanup with event listeners", () => {
		const handler = vi.fn();

		const element = Base({
			tag: "button",
			onmount: (el) => {
				el.addEventListener("click", handler);
				return () => el.removeEventListener("click", handler);
			},
		});

		document.body.appendChild(element);

		// Click should trigger handler
		element.click();
		expect(handler).toHaveBeenCalledTimes(1);

		// Cleanup
		element.remove();

		// Click after cleanup should not trigger handler
		element.click();
		expect(handler).toHaveBeenCalledTimes(1); // Still 1
	});

	it("should allow onmount to return non-function values without breaking", () => {
		const element = Base({
			tag: "div",
			onmount: () => {
				// Accidentally return a non-function
				return "not a function" as any;
			},
		});

		document.body.appendChild(element);

		// Should not throw on unmount
		expect(() => element.remove()).not.toThrow();
	});

	it("should work when only onunmount is provided (backward compatibility)", () => {
		const onunmount = vi.fn();

		const element = Base({
			tag: "div",
			onunmount,
		});

		document.body.appendChild(element);
		element.remove();

		expect(onunmount).toHaveBeenCalledWith(element);
	});

	it("ref is cleaned before onunmount is called", async () => {
		const ref = { current: null };
		let refValueInOnunmount: HTMLElement | null = "not-called" as any;

		const element = Base({
			tag: "div",
			ref,
			onunmount: () => {
				refValueInOnunmount = ref.current;
			},
		});

		document.body.appendChild(element);
		expect(ref.current).toBe(element);

		element.remove();

		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(refValueInOnunmount).toBeNull();
		expect(ref.current).toBeNull();
	});

	it("ref is cleaned even without onmount/onunmount", async () => {
		const ref = { current: null };
		const element = Base({ tag: "div", ref });

		document.body.appendChild(element);
		expect(ref.current).toBe(element);

		element.remove();

		await new Promise((resolve) => setTimeout(resolve, 0));

		expect(ref.current).toBeNull();
	});
});
