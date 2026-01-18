import { describe, expect, it, vi } from "vitest";
import { state } from "../../core/state.js";
import { derived } from "../helpers.js";

describe("Derived", () => {
	it("should create a derived state with initial calculated value", () => {
		const count = state(10);
		const doubled = derived(() => count.value * 2);

		expect(doubled.get()).toBe(20);
	});

	it("should update when source state changes", () => {
		const count = state(10);
		const doubled = derived(() => count.value * 2);

		count.set(15);
		expect(doubled.get()).toBe(30);
	});

	it("should handle multiple source states", () => {
		const count = state(10);
		const factor = state(2);
		const result = derived(() => count.value * factor.value);

		expect(result.get()).toBe(20);

		count.set(15);
		expect(result.get()).toBe(30);

		factor.set(3);
		expect(result.get()).toBe(45);
	});

	it("should support complex calculations", () => {
		const firstName = state("John");
		const lastName = state("Doe");
		const age = state(30);

		const person = derived(() => ({
			fullName: `${firstName.value} ${lastName.value}`,
			isAdult: age.value >= 18,
		}));

		expect(person.get()).toEqual({
			fullName: "John Doe",
			isAdult: true,
		});

		firstName.set("Jane");
		expect(person.get().fullName).toBe("Jane Doe");

		age.set(15);
		expect(person.get().isAdult).toBe(false);
	});

	it("should maintain correct value when source state changes to the same value", () => {
		const count = state(10);
		const doubled = derived(() => count.value * 2);

		expect(doubled.get()).toBe(20);

		count.set(10); // Same value
		expect(doubled.get()).toBe(20); // Value should still be the same
	});

	it("should support nested derived states", () => {
		const count = state(10);
		const doubled = derived(() => count.value * 2);
		const quadrupled = derived(() => doubled.value * 2);

		expect(quadrupled.get()).toBe(40);

		count.set(15);
		expect(doubled.get()).toBe(30);
		expect(quadrupled.get()).toBe(60);
	});

	it("should allow manual updates to derived state", () => {
		const count = state(10);
		const doubled = derived(() => count.value * 2);

		doubled.set(50); // Manually overriding the derived value
		expect(doubled.get()).toBe(50);

		count.set(15); // Recalculates based on source
		expect(doubled.get()).toBe(30);
	});

	describe("Multiple derived instances", () => {
		it("should trigger all derived states when observing the same array length", () => {
			const itemsState = state<{ name: string }[]>([]);

			const countDerived1 = derived(() => itemsState.value.length);
			const countDerived2 = derived(() => itemsState.value.length);

			const subscriber1 = vi.fn();
			const subscriber2 = vi.fn();

			countDerived1.sub("test1", subscriber1);
			countDerived2.sub("test2", subscriber2);

			expect(countDerived1.get()).toBe(0);
			expect(countDerived2.get()).toBe(0);

			itemsState.set([{ name: "Item 1" }]);

			expect(countDerived1.get()).toBe(1);
			expect(countDerived2.get()).toBe(1);

			expect(subscriber1).toHaveBeenCalledWith(1);
			expect(subscriber2).toHaveBeenCalledWith(1);
		});

		it("should trigger multiple derived with different calculations on the same array", () => {
			const itemsState = state<{ name: string }[]>([]);

			const countDerived = derived(() => itemsState.value.length);
			const isEmptyDerived = derived(() => itemsState.value.length === 0);
			const hasItemsDerived = derived(() => itemsState.value.length > 0);

			const countSub = vi.fn();
			const isEmptySub = vi.fn();
			const hasItemsSub = vi.fn();

			countDerived.sub("count", countSub);
			isEmptyDerived.sub("isEmpty", isEmptySub);
			hasItemsDerived.sub("hasItems", hasItemsSub);

			expect(countDerived.get()).toBe(0);
			expect(isEmptyDerived.get()).toBe(true);
			expect(hasItemsDerived.get()).toBe(false);

			itemsState.set([{ name: "Item 1" }]);

			expect(countDerived.get()).toBe(1);
			expect(isEmptyDerived.get()).toBe(false);
			expect(hasItemsDerived.get()).toBe(true);

			expect(countSub).toHaveBeenCalledWith(1);
			expect(isEmptySub).toHaveBeenCalledWith(false);
			expect(hasItemsSub).toHaveBeenCalledWith(true);
		});

		it("should handle array push operations correctly with multiple derived", () => {
			const itemsState = state<{ name: string }[]>([]);

			const countDerived1 = derived(() => itemsState.value.length);
			const countDerived2 = derived(() => itemsState.value.length);

			itemsState.set((current) => [...current, { name: "Item 1" }]);

			expect(countDerived1.get()).toBe(1);
			expect(countDerived2.get()).toBe(1);

			itemsState.set((current) => [...current, { name: "Item 2" }]);

			expect(countDerived1.get()).toBe(2);
			expect(countDerived2.get()).toBe(2);
		});
	});

	describe("Array state reactivity", () => {
		it("should react when array is mutated (not replaced)", () => {
			const itemsState = state<{ name: string }[]>([]);
			const countDerived = derived(() => itemsState.value.length);

			expect(countDerived.get()).toBe(0);

			const items = itemsState.value;
			items.push({ name: "Item 1" });
			itemsState.set(items);

			expect(countDerived.get()).toBe(1);
		});

		it("should react when array is replaced completely", () => {
			const itemsState = state<{ name: string }[]>([]);
			const countDerived = derived(() => itemsState.value.length);

			expect(countDerived.get()).toBe(0);

			itemsState.set([{ name: "Item 1" }]);

			expect(countDerived.get()).toBe(1);
		});
	});

	describe("Integration with manual subscriptions", () => {
		it("should trigger both manual subscription and derived (with primitive state)", () => {
			const count = state(0);

			const manualSub = vi.fn();
			count.sub("on-change", manualSub);

			const doubled = derived(() => count.value * 2);

			count.set(5);

			expect(manualSub).toHaveBeenCalled();
			expect(manualSub).toHaveBeenCalledWith(5);
			expect(doubled.get()).toBe(10);
		});

		it("should work with multiple manual subscriptions and derived (primitive state)", () => {
			const count = state(0);

			const manualSub1 = vi.fn();
			count.sub("manual-1", manualSub1);

			const doubled1 = derived(() => count.value * 2);

			const manualSub2 = vi.fn();
			count.sub("manual-2", manualSub2);

			const doubled2 = derived(() => count.value * 3);

			count.set(10);

			expect(manualSub1).toHaveBeenCalledWith(10);
			expect(manualSub2).toHaveBeenCalledWith(10);
			expect(doubled1.get()).toBe(20);
			expect(doubled2.get()).toBe(30);
		});
	});
});
