import { describe, expect, it } from "vitest";
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
});
