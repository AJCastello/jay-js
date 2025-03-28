import { mergeClasses } from "../merge-classes";

describe("mergeClasses", () => {
	it("should merge multiple class strings", () => {
		// Arrange
		const classes = ["btn", "btn-primary", "text-white"];

		// Act
		const result = mergeClasses(classes);

		// Assert
		expect(result).toBe("btn btn-primary text-white");
	});

	it("should filter out falsy values", () => {
		// Arrange
		const classes = ["btn", undefined, "btn-primary", null, false, "text-white", ""];

		// Act
		const result = mergeClasses(classes as string[]);

		// Assert
		expect(result).toBe("btn btn-primary text-white");
	});

	it("should handle empty array", () => {
		// Arrange
		const classes: string[] = [];

		// Act
		const result = mergeClasses(classes);

		// Assert
		expect(result).toBe("");
	});

	it("should handle array with only undefined values", () => {
		// Arrange
		const classes = [undefined, undefined];

		// Act
		const result = mergeClasses(classes);

		// Assert
		expect(result).toBe("");
	});

	it("should resolve Tailwind conflicts", () => {
		// Arrange
		const classes = ["p-2", "p-4", "text-red-500", "text-blue-500"];

		// Act
		const result = mergeClasses(classes);

		// Assert
		// tailwind-merge should keep the last conflicting class
		expect(result).toBe("p-4 text-blue-500");
	});

	it("should preserve non-conflicting classes", () => {
		// Arrange
		const classes = ["p-2", "m-4", "rounded", "bg-blue-500"];

		// Act
		const result = mergeClasses(classes);

		// Assert
		expect(result).toBe("p-2 m-4 rounded bg-blue-500");
	});

	it("should handle conditional classes", () => {
		// Arrange
		const isActive = true;
		const isDisabled = false;
		const classes = ["btn", isActive && "btn-active", isDisabled && "btn-disabled", "text-white"];

		// Act
		const result = mergeClasses(classes as string[]);

		// Assert
		expect(result).toBe("btn btn-active text-white");
	});
});
