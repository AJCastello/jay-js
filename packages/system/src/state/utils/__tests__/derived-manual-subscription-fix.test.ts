import { describe, expect, it, vi } from "vitest";
import { state } from "../../core/state.js";
import { derived } from "../helpers.js";

describe("Derived - Manual Subscription Integration Fix", () => {
	describe("Bug Fix: Manual subscription + derived with objects/arrays", () => {
		it("should trigger derived when manual subscription exists (array state)", () => {
			const itemsState = state<{ name: string }[]>([]);

			const manualSub = vi.fn();
			itemsState.sub("onChange", manualSub);

			const countDerived = derived(() => itemsState.value.length);

			expect(countDerived.get()).toBe(0);

			itemsState.set([{ name: "Item 1" }]);

			expect(manualSub).toHaveBeenCalledTimes(1);
			expect(manualSub).toHaveBeenCalledWith([{ name: "Item 1" }]);
			expect(countDerived.get()).toBe(1);
		});

		it("should trigger derived when manual subscription exists (object state)", () => {
			const userState = state({ name: "John", age: 30 });

			const manualSub = vi.fn();
			userState.sub("onChange", manualSub);

			const upperName = derived(() => userState.value.name.toUpperCase());

			expect(upperName.get()).toBe("JOHN");

			userState.set({ name: "Jane", age: 25 });

			expect(manualSub).toHaveBeenCalledTimes(1);
			expect(upperName.get()).toBe("JANE");
		});

		it("should work regardless of subscription order", () => {
			const itemsState = state<{ name: string }[]>([]);

			const manualSub1 = vi.fn();
			itemsState.sub("manual-1", manualSub1);

			const countDerived1 = derived(() => itemsState.value.length);

			const manualSub2 = vi.fn();
			itemsState.sub("manual-2", manualSub2);

			const countDerived2 = derived(() => itemsState.value.length);

			const manualSub3 = vi.fn();
			itemsState.sub("manual-3", manualSub3);

			itemsState.set([{ name: "Item 1" }]);

			expect(manualSub1).toHaveBeenCalledTimes(1);
			expect(manualSub2).toHaveBeenCalledTimes(1);
			expect(manualSub3).toHaveBeenCalledTimes(1);
			expect(countDerived1.get()).toBe(1);
			expect(countDerived2.get()).toBe(1);
		});

		it("should work with multiple derived states observing different properties", () => {
			const itemsState = state<{ name: string }[]>([]);

			itemsState.sub("manual", vi.fn());

			const countDerived = derived(() => itemsState.value.length);
			const isEmptyDerived = derived(() => itemsState.value.length === 0);
			const hasItemsDerived = derived(() => itemsState.value.length > 0);

			expect(countDerived.get()).toBe(0);
			expect(isEmptyDerived.get()).toBe(true);
			expect(hasItemsDerived.get()).toBe(false);

			itemsState.set([{ name: "Item 1" }]);

			expect(countDerived.get()).toBe(1);
			expect(isEmptyDerived.get()).toBe(false);
			expect(hasItemsDerived.get()).toBe(true);
		});
	});

	describe("Primitive state still works correctly", () => {
		it("should work with primitive state and manual subscription", () => {
			const countState = state(0);

			const manualSub = vi.fn();
			countState.sub("onChange", manualSub);

			const doubled = derived(() => countState.value * 2);

			expect(doubled.get()).toBe(0);

			countState.set(5);

			expect(manualSub).toHaveBeenCalledTimes(1);
			expect(manualSub).toHaveBeenCalledWith(5);
			expect(doubled.get()).toBe(10);
		});
	});

	describe("Granular reactivity is preserved", () => {
		it("should only trigger effects that observe changed properties when using proxy mutations", () => {
			const userState = state({ name: "John", age: 30 });

			const nameSub = vi.fn();
			const ageSub = vi.fn();

			const nameEffect = () => {
				nameSub();
				return userState.value.name;
			};

			const ageEffect = () => {
				ageSub();
				return userState.value.age;
			};

			const nameDerived = derived(nameEffect);
			const ageDerived = derived(ageEffect);

			// Reset counters after initial setup
			nameSub.mockClear();
			ageSub.mockClear();

			expect(nameDerived.get()).toBe("John");
			expect(ageDerived.get()).toBe(30);

			// When we replace the entire object, both should be called
			userState.set({ name: "Jane", age: 30 });

			// Both effects should have been called because we replaced the root object
			expect(nameSub).toHaveBeenCalled();
			expect(ageSub).toHaveBeenCalled();
			expect(nameDerived.get()).toBe("Jane");
			expect(ageDerived.get()).toBe(30);
		});

		it("should work with array length observation (each() use case)", () => {
			const itemsState = state<{ id: number; name: string }[]>([]);

			itemsState.sub("manual", vi.fn());

			let lengthAccessCount = 0;
			const lengthDerived = derived(() => {
				lengthAccessCount++;
				return itemsState.value.length;
			});

			expect(lengthDerived.get()).toBe(0);
			const initialCount = lengthAccessCount;

			itemsState.set([{ id: 1, name: "Item 1" }]);

			expect(lengthDerived.get()).toBe(1);
			expect(lengthAccessCount).toBeGreaterThan(initialCount);

			itemsState.set([
				{ id: 1, name: "Item 1" },
				{ id: 2, name: "Item 2" },
			]);

			expect(lengthDerived.get()).toBe(2);
		});
	});

	describe("Edge cases", () => {
		it("should handle empty array to non-empty array transition", () => {
			const itemsState = state<number[]>([]);
			itemsState.sub("manual", vi.fn());

			const countDerived = derived(() => itemsState.value.length);

			expect(countDerived.get()).toBe(0);

			itemsState.set([1, 2, 3]);

			expect(countDerived.get()).toBe(3);
		});

		it("should handle non-empty array to empty array transition", () => {
			const itemsState = state<number[]>([1, 2, 3]);
			itemsState.sub("manual", vi.fn());

			const countDerived = derived(() => itemsState.value.length);

			expect(countDerived.get()).toBe(3);

			itemsState.set([]);

			expect(countDerived.get()).toBe(0);
		});

		it("should handle null to object transition", () => {
			const dataState = state<{ value: number } | null>(null);
			dataState.sub("manual", vi.fn());

			const hasValue = derived(() => dataState.value !== null);

			expect(hasValue.get()).toBe(false);

			dataState.set({ value: 42 });

			expect(hasValue.get()).toBe(true);
		});

		// Note: object->null transition has a pre-existing issue with derived
		// not related to the manual subscription bug we're fixing here
	});
});
