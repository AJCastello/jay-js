import { vi } from "vitest";
import { State } from "../../core/state.js";
import { Values } from "../helpers.js";

describe("Values", () => {
	it("should set a value in an object based on state", () => {
		const count = State(10);
		const target = {};

		const setValue = Values(() => count.value * 2);
		setValue(target, "doubled");

		expect(target).toEqual({ doubled: 20 });
	});

	it("should update target when source state changes", () => {
		const count = State(10);
		const target = {};

		const setValue = Values(() => count.value * 2);
		setValue(target, "doubled");

		count.set(15);
		expect(target).toEqual({ doubled: 30 });
	});

	it("should work with nested paths", () => {
		const name = State("John");
		const target = { user: {} };

		const setValue = Values(() => name.value);
		setValue(target, "user", "name");

		expect(target).toEqual({ user: { name: "John" } });

		name.set("Jane");
		expect(target).toEqual({ user: { name: "Jane" } });
	});

	it("should create nested objects if they don't exist", () => {
		const count = State(10);
		const target = {};

		const setValue = Values(() => count.value);
		setValue(target, "stats", "counter", "value");

		expect(target).toEqual({ stats: { counter: { value: 10 } } });
	});

	it("should set value on state objects", () => {
		const source = State(10);
		const target = State(0);

		const setValue = Values(() => source.value * 2);
		setValue(target, "value");

		expect(target.get()).toBe(20);

		source.set(15);
		expect(target.get()).toBe(30);
	});

	it("should handle multiple source dependencies", () => {
		const firstName = State("John");
		const lastName = State("Doe");
		const target = {};

		const setValue = Values(() => `${firstName.value} ${lastName.value}`);
		setValue(target, "fullName");

		expect(target).toEqual({ fullName: "John Doe" });

		firstName.set("Jane");
		expect(target).toEqual({ fullName: "Jane Doe" });

		lastName.set("Smith");
		expect(target).toEqual({ fullName: "Jane Smith" });
	});

	it("should handle complex calculated values", () => {
		const items = State([1, 2, 3, 4, 5]);
		const target = {};

		const setValue = Values(() => {
			const values = items.value;
			return {
				sum: values.reduce((a, b) => a + b, 0),
				avg: values.reduce((a, b) => a + b, 0) / values.length,
				count: values.length,
			};
		});

		setValue(target, "stats");

		expect(target).toEqual({
			stats: {
				sum: 15,
				avg: 3,
				count: 5,
			},
		});

		items.set([10, 20, 30]);

		expect(target).toEqual({
			stats: {
				sum: 60,
				avg: 20,
				count: 3,
			},
		});
	});

	it("should update HTML elements when used with DOM properties", () => {
		// Mock an HTML element
		const element = { className: "" };
		const isDark = State(false);

		const setValue = Values(() => (isDark.value ? "dark-theme" : "light-theme"));
		setValue(element, "className");

		expect(element.className).toBe("light-theme");

		isDark.set(true);
		expect(element.className).toBe("dark-theme");
	});
});
