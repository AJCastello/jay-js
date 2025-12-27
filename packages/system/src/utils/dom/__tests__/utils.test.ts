import { describe, expect, it } from "vitest";
import { createRef } from "../use-ref";

describe("Utility Functions", () => {
	describe("useRef", () => {
		it("should create a reference object with null current", () => {
			const ref = createRef<string>();

			expect(ref).toHaveProperty("current");
			expect(ref.current).toBe(null);
		});

		it("should create typed reference objects", () => {
			const stringRef = createRef<string>();
			const numberRef = createRef<number>();
			const elementRef = createRef<HTMLElement>();
			const objectRef = createRef<{ name: string }>();

			expect(stringRef.current).toBe(null);
			expect(numberRef.current).toBe(null);
			expect(elementRef.current).toBe(null);
			expect(objectRef.current).toBe(null);
		});

		it("should allow setting and getting current value", () => {
			const ref = createRef<string>();

			ref.current = "test value";
			expect(ref.current).toBe("test value");

			ref.current = "updated value";
			expect(ref.current).toBe("updated value");
		});

		it("should work with HTMLElement references", () => {
			const ref = createRef<HTMLElement>();
			const element = document.createElement("div");
			element.id = "test-element";

			ref.current = element;

			expect(ref.current).toBe(element);
			expect(ref.current?.id).toBe("test-element");
		});

		it("should work with object references", () => {
			const ref = createRef<{ name: string; age: number }>();
			const person = { name: "John", age: 30 };

			ref.current = person;

			expect(ref.current).toBe(person);
			expect(ref.current?.name).toBe("John");
			expect(ref.current?.age).toBe(30);
		});

		it("should be mutable", () => {
			const ref = createRef<number>();

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
			const ref1 = createRef<string>();
			const ref2 = createRef<string>();

			ref1.current = "first";
			ref2.current = "second";

			expect(ref1.current).toBe("first");
			expect(ref2.current).toBe("second");
			expect(ref1).not.toBe(ref2);
		});

		it("should work with array references", () => {
			const ref = createRef<number[]>();
			const numbers = [1, 2, 3, 4, 5];

			ref.current = numbers;

			expect(ref.current).toBe(numbers);
			expect(ref.current?.length).toBe(5);
			expect(ref.current?.[0]).toBe(1);
		});

		it("should handle function references", () => {
			const ref = createRef<() => string>();
			const testFunction = () => "test result";

			ref.current = testFunction;

			expect(ref.current).toBe(testFunction);
			expect(ref.current?.()).toBe("test result");
		});
	});
});
