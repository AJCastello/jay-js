import { useRef } from "../use-ref";

describe("useRef", () => {
	it("should create a ref object with null current property", () => {
		// Arrange & Act
		const ref = useRef();

		// Assert
		expect(ref).toBeDefined();
		expect(ref).toHaveProperty("current");
		expect(ref.current).toBeNull();
	});

	it("should maintain the ref object identity", () => {
		// Arrange & Act
		const ref1 = useRef();
		const ref2 = useRef();

		// Assert
		expect(ref1).not.toBe(ref2);
	});

	it("should be able to store and update values", () => {
		// Arrange
		const ref = useRef<string>();

		// Act
		ref.current = "test value";

		// Assert
		expect(ref.current).toBe("test value");
	});
});
