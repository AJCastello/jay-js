import { vi } from 'vitest';
import { uniKey } from "./uni-key";
import { type TRefObject, useRef } from "./use-ref";

describe("Utility Functions", () => {
	describe("uniKey", () => {
		it("should generate a key with default length of 10", () => {
			const key = uniKey();
			expect(key).toHaveLength(10);
			expect(typeof key).toBe("string");
		});

		it("should generate a key with specified length", () => {
			const lengths = [1, 5, 15, 20, 50];

			lengths.forEach((length) => {
				const key = uniKey(length);
				expect(key).toHaveLength(length);
			});
		});

		it("should generate unique keys on multiple calls", () => {
			const keys = new Set();
			const iterations = 1000;

			for (let i = 0; i < iterations; i++) {
				const key = uniKey();
				keys.add(key);
			}

			// Should generate mostly unique keys (allowing for minimal collision)
			expect(keys.size).toBeGreaterThan(iterations * 0.95);
		});

		it("should only contain alphanumeric characters", () => {
			const key = uniKey(100);
			const validChars = /^[A-Za-z0-9]+$/;

			expect(validChars.test(key)).toBe(true);
		});

		it("should handle edge cases", () => {
			// Length 0
			const emptyKey = uniKey(0);
			expect(emptyKey).toBe("");

			// Length 1
			const singleKey = uniKey(1);
			expect(singleKey).toHaveLength(1);
		});

		it("should generate keys with consistent character distribution", () => {
			const key = uniKey(1000);
			const uppercase = (key.match(/[A-Z]/g) || []).length;
			const lowercase = (key.match(/[a-z]/g) || []).length;
			const numbers = (key.match(/[0-9]/g) || []).length;

			// Should have reasonable distribution of character types
			expect(uppercase + lowercase + numbers).toBe(1000);
			expect(uppercase).toBeGreaterThan(0);
			expect(lowercase).toBeGreaterThan(0);
			expect(numbers).toBeGreaterThan(0);
		});

		it("should be deterministic with same random seed", () => {
			// Mock Math.random to test deterministic behavior
			const mockRandom = vi.spyOn(Math, "random");
			mockRandom.mockReturnValue(0.5);

			const key1 = uniKey(5);
			const key2 = uniKey(5);

			expect(key1).toBe(key2);

			mockRandom.mockRestore();
		});
	});

	describe("useRef", () => {
		it("should create a reference object with null current", () => {
			const ref = useRef<string>();

			expect(ref).toHaveProperty("current");
			expect(ref.current).toBe(null);
		});

		it("should create typed reference objects", () => {
			const stringRef = useRef<string>();
			const numberRef = useRef<number>();
			const elementRef = useRef<HTMLElement>();
			const objectRef = useRef<{ name: string }>();

			expect(stringRef.current).toBe(null);
			expect(numberRef.current).toBe(null);
			expect(elementRef.current).toBe(null);
			expect(objectRef.current).toBe(null);
		});

		it("should allow setting and getting current value", () => {
			const ref = useRef<string>();

			ref.current = "test value";
			expect(ref.current).toBe("test value");

			ref.current = "updated value";
			expect(ref.current).toBe("updated value");
		});

		it("should work with HTMLElement references", () => {
			const ref = useRef<HTMLElement>();
			const element = document.createElement("div");
			element.id = "test-element";

			ref.current = element;

			expect(ref.current).toBe(element);
			expect(ref.current?.id).toBe("test-element");
		});

		it("should work with object references", () => {
			const ref = useRef<{ name: string; age: number }>();
			const person = { name: "John", age: 30 };

			ref.current = person;

			expect(ref.current).toBe(person);
			expect(ref.current?.name).toBe("John");
			expect(ref.current?.age).toBe(30);
		});

		it("should be mutable", () => {
			const ref = useRef<number>();

			// Initially null
			expect(ref.current).toBe(null);

			// Set value
			ref.current = 42;
			expect(ref.current).toBe(42);

			// Update value
			ref.current = 100;
			expect(ref.current).toBe(100);

			// Set back to null
			ref.current = null;
			expect(ref.current).toBe(null);
		});

		it("should create independent reference objects", () => {
			const ref1 = useRef<string>();
			const ref2 = useRef<string>();

			ref1.current = "first";
			ref2.current = "second";

			expect(ref1.current).toBe("first");
			expect(ref2.current).toBe("second");
			expect(ref1).not.toBe(ref2);
		});

		it("should work with array references", () => {
			const ref = useRef<number[]>();
			const numbers = [1, 2, 3, 4, 5];

			ref.current = numbers;

			expect(ref.current).toBe(numbers);
			expect(ref.current?.length).toBe(5);
			expect(ref.current?.[0]).toBe(1);
		});

		it("should handle function references", () => {
			const ref = useRef<() => string>();
			const testFunction = () => "test result";

			ref.current = testFunction;

			expect(ref.current).toBe(testFunction);
			expect(ref.current?.()).toBe("test result");
		});
	});

	describe("Utility Integration", () => {
		it("should work together in practical scenarios", () => {
			const elementRef = useRef<HTMLElement>();
			const uniqueId = uniKey(8);

			const element = document.createElement("div");
			element.id = uniqueId;
			elementRef.current = element;

			expect(elementRef.current?.id).toBe(uniqueId);
			expect(elementRef.current?.id).toHaveLength(8);
		});

		it("should support reference arrays with unique keys", () => {
			const refs: TRefObject<HTMLElement>[] = [];
			const ids: string[] = [];

			// Create multiple refs with unique IDs
			for (let i = 0; i < 5; i++) {
				const ref = useRef<HTMLElement>();
				const id = uniKey(6);
				const element = document.createElement("div");

				element.id = id;
				ref.current = element;

				refs.push(ref);
				ids.push(id);
			}

			// Verify all IDs are unique
			expect(new Set(ids).size).toBe(5);

			// Verify all refs are properly set
			refs.forEach((ref, index) => {
				expect(ref.current?.id).toBe(ids[index]);
			});
		});
	});
});
