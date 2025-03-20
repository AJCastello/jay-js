import { isEqual } from "../compare";

describe("isEqual", () => {
	it("should compare primitive values correctly", () => {
		// Numbers
		expect(isEqual(1, 1)).toBe(true);
		expect(isEqual(1, 2)).toBe(false);
		expect(isEqual(0, false)).toBe(false); // Different types

		// Strings
		expect(isEqual("hello", "hello")).toBe(true);
		expect(isEqual("hello", "world")).toBe(false);

		// Booleans
		expect(isEqual(true, true)).toBe(true);
		expect(isEqual(false, false)).toBe(true);
		expect(isEqual(true, false)).toBe(false);

		// Undefined
		expect(isEqual(undefined, undefined)).toBe(true);
		expect(isEqual(undefined, null)).toBe(false);

		// Null
		expect(isEqual(null, null)).toBe(true);
		expect(isEqual(null, 0)).toBe(false);
	});

	it("should compare arrays correctly", () => {
		expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
		expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
		expect(isEqual([1, 2, 3], [1, 2])).toBe(false);
		expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
		expect(isEqual([], [])).toBe(true);

		// Nested arrays
		expect(isEqual([1, [2, 3]], [1, [2, 3]])).toBe(true);
		expect(isEqual([1, [2, 3]], [1, [2, 4]])).toBe(false);
	});

	it("should compare objects correctly", () => {
		expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
		expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 3 })).toBe(false);
		expect(isEqual({ a: 1, b: 2 }, { a: 1 })).toBe(false);
		expect(isEqual({ a: 1 }, { a: 1, b: 2 })).toBe(false);
		expect(isEqual({}, {})).toBe(true);

		// Nested objects
		expect(isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })).toBe(true);

		expect(isEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })).toBe(false);

		// Property order shouldn't matter
		expect(isEqual({ a: 1, b: 2 }, { b: 2, a: 1 })).toBe(true);
	});

	it("should compare complex nested structures", () => {
		const obj1 = {
			name: "John",
			age: 30,
			address: {
				street: "123 Main St",
				city: "New York",
				coords: [40.7128, -74.006],
			},
			hobbies: ["reading", "coding"],
		};

		const obj2 = {
			name: "John",
			age: 30,
			address: {
				street: "123 Main St",
				city: "New York",
				coords: [40.7128, -74.006],
			},
			hobbies: ["reading", "coding"],
		};

		const obj3 = {
			name: "John",
			age: 30,
			address: {
				street: "123 Main St",
				city: "Boston", // Different city
				coords: [40.7128, -74.006],
			},
			hobbies: ["reading", "coding"],
		};

		expect(isEqual(obj1, obj2)).toBe(true);
		expect(isEqual(obj1, obj3)).toBe(false);
	});

	it("should handle circular references", () => {
		const obj1: any = { a: 1 };
		obj1.self = obj1;

		const obj2: any = { a: 1 };
		obj2.self = obj2;

		// While this could lead to an infinite recursion,
		// our implementation should handle it gracefully
		expect(() => isEqual(obj1, obj2)).not.toThrow();
	});

	it("should handle special cases", () => {
		// NaN comparison
		expect(isEqual(Number.NaN, Number.NaN)).toBe(true);

		// Date objects
		const date1 = new Date("2023-01-01");
		const date2 = new Date("2023-01-01");
		const date3 = new Date("2023-02-01");

		expect(isEqual(date1, date2)).toBe(true);
		expect(isEqual(date1, date3)).toBe(false);

		// RegExp objects
		expect(isEqual(/test/, /test/)).toBe(true);
		expect(isEqual(/test/i, /test/i)).toBe(true);
		expect(isEqual(/test/, /test/i)).toBe(false);
	});

	it("should handle mixed types", () => {
		expect(isEqual({ a: 1 }, [1])).toBe(false);
		expect(isEqual([1], "1")).toBe(false);
		expect(isEqual(null, undefined)).toBe(false);
		expect(isEqual(0, null)).toBe(false);
		expect(isEqual(0, false)).toBe(false);
		expect(isEqual("", false)).toBe(false);
	});
});
