/**
 * @vitest-environment jsdom
 */
import { describe, expect, it, vi } from "vitest";
import { state } from "../state.js";
import { subscriptionRegistry } from "../subscription-registry.js";

describe("SubscriptionRegistry", () => {
	it("should register subscription for element", () => {
		const element = document.createElement("div");
		const myState = state({ value: 10 });
		const subscriptionId = "test-sub-1";
		const cleanupFn = vi.fn();

		subscriptionRegistry.registerSubscription(element, subscriptionId, myState, cleanupFn);

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(true);
		expect(subscriptionRegistry.getSubscriptionCount(element)).toBe(1);
	});

	it("should register multiple subscriptions for same element", () => {
		const element = document.createElement("div");
		const state1 = state({ value: 10 });
		const state2 = state({ value: 20 });

		subscriptionRegistry.registerSubscription(element, "sub-1", state1, vi.fn());
		subscriptionRegistry.registerSubscription(element, "sub-2", state2, vi.fn());

		expect(subscriptionRegistry.getSubscriptionCount(element)).toBe(2);
	});

	it("should cleanup all subscriptions when element is cleaned", () => {
		const element = document.createElement("div");
		const myState = state({ value: 10 });
		const cleanupFn = vi.fn();

		subscriptionRegistry.registerSubscription(element, "sub-1", myState, cleanupFn);
		subscriptionRegistry.cleanupElement(element);

		expect(cleanupFn).toHaveBeenCalledTimes(1);
		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);
	});

	it("should handle cleanup errors gracefully", () => {
		const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		const element = document.createElement("div");
		const myState = state({ value: 10 });
		const cleanupFn = vi.fn(() => {
			throw new Error("Cleanup error");
		});

		subscriptionRegistry.registerSubscription(element, "sub-1", myState, cleanupFn);
		subscriptionRegistry.cleanupElement(element);

		expect(cleanupFn).toHaveBeenCalled();
		expect(consoleErrorSpy).toHaveBeenCalledWith("JayJS: Error cleaning up subscription:", expect.any(Error));

		consoleErrorSpy.mockRestore();
	});

	it("should cleanup specific subscription by ID", () => {
		const element = document.createElement("div");
		const state1 = state({ value: 10 });
		const state2 = state({ value: 20 });
		const cleanup1 = vi.fn();
		const cleanup2 = vi.fn();

		subscriptionRegistry.registerSubscription(element, "sub-1", state1, cleanup1);
		subscriptionRegistry.registerSubscription(element, "sub-2", state2, cleanup2);

		subscriptionRegistry.cleanupSubscription("sub-1");

		expect(cleanup1).toHaveBeenCalledTimes(1);
		expect(cleanup2).not.toHaveBeenCalled();
		expect(subscriptionRegistry.getSubscriptionCount(element)).toBe(1);
	});

	it("should handle WeakRef garbage collection gracefully", () => {
		const subscriptionId = "sub-gc";
		const element = document.createElement("div");
		const myState = state({ value: 10 });
		const cleanupFn = vi.fn();

		subscriptionRegistry.registerSubscription(element, subscriptionId, myState, cleanupFn);

		subscriptionRegistry.cleanupElement(element);

		subscriptionRegistry.cleanupSubscription(subscriptionId);

		expect(cleanupFn).toHaveBeenCalledTimes(1);
	});

	it("should not throw when cleaning element without subscriptions", () => {
		const element = document.createElement("div");

		expect(() => subscriptionRegistry.cleanupElement(element)).not.toThrow();
	});

	it("should not throw when cleaning non-existent subscription ID", () => {
		expect(() => subscriptionRegistry.cleanupSubscription("non-existent")).not.toThrow();
	});

	it("should handle multiple cleanup calls on same element", () => {
		const element = document.createElement("div");
		const myState = state({ value: 10 });
		const cleanupFn = vi.fn();

		subscriptionRegistry.registerSubscription(element, "sub-1", myState, cleanupFn);

		subscriptionRegistry.cleanupElement(element);
		expect(cleanupFn).toHaveBeenCalledTimes(1);

		subscriptionRegistry.cleanupElement(element);
		expect(cleanupFn).toHaveBeenCalledTimes(1);
	});

	it("should return 0 subscription count for element without subscriptions", () => {
		const element = document.createElement("div");

		expect(subscriptionRegistry.getSubscriptionCount(element)).toBe(0);
	});

	it("should return false for hasSubscriptions on element without subscriptions", () => {
		const element = document.createElement("div");

		expect(subscriptionRegistry.hasSubscriptions(element)).toBe(false);
	});

	it("should cleanup multiple subscriptions in correct order", () => {
		const element = document.createElement("div");
		const myState = state({ value: 10 });
		const cleanupOrder: number[] = [];

		const cleanup1 = vi.fn(() => cleanupOrder.push(1));
		const cleanup2 = vi.fn(() => cleanupOrder.push(2));
		const cleanup3 = vi.fn(() => cleanupOrder.push(3));

		subscriptionRegistry.registerSubscription(element, "sub-1", myState, cleanup1);
		subscriptionRegistry.registerSubscription(element, "sub-2", myState, cleanup2);
		subscriptionRegistry.registerSubscription(element, "sub-3", myState, cleanup3);

		subscriptionRegistry.cleanupElement(element);

		expect(cleanup1).toHaveBeenCalledTimes(1);
		expect(cleanup2).toHaveBeenCalledTimes(1);
		expect(cleanup3).toHaveBeenCalledTimes(1);
		expect(cleanupOrder.length).toBe(3);
	});

	it("should continue cleanup even if one cleanup function fails", () => {
		const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
		const element = document.createElement("div");
		const myState = state({ value: 10 });

		const cleanup1 = vi.fn();
		const cleanup2 = vi.fn(() => {
			throw new Error("Cleanup 2 failed");
		});
		const cleanup3 = vi.fn();

		subscriptionRegistry.registerSubscription(element, "sub-1", myState, cleanup1);
		subscriptionRegistry.registerSubscription(element, "sub-2", myState, cleanup2);
		subscriptionRegistry.registerSubscription(element, "sub-3", myState, cleanup3);

		subscriptionRegistry.cleanupElement(element);

		expect(cleanup1).toHaveBeenCalledTimes(1);
		expect(cleanup2).toHaveBeenCalledTimes(1);
		expect(cleanup3).toHaveBeenCalledTimes(1);
		expect(consoleErrorSpy).toHaveBeenCalledWith("JayJS: Error cleaning up subscription:", expect.any(Error));

		consoleErrorSpy.mockRestore();
	});

	it("should handle re-registration of same subscription ID", () => {
		const element = document.createElement("div");
		const myState = state({ value: 10 });
		const cleanup1 = vi.fn();
		const cleanup2 = vi.fn();

		subscriptionRegistry.registerSubscription(element, "sub-1", myState, cleanup1);
		subscriptionRegistry.registerSubscription(element, "sub-1", myState, cleanup2);

		expect(subscriptionRegistry.getSubscriptionCount(element)).toBe(2);

		subscriptionRegistry.cleanupElement(element);

		expect(cleanup1).toHaveBeenCalledTimes(1);
		expect(cleanup2).toHaveBeenCalledTimes(1);
	});
});
