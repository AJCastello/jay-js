import { uniKey } from "../uni-key";

describe("uniKey", () => {
	it("should generate a string of the default length (10) when no length is provided", () => {
		// Act
		const key = uniKey();

		// Assert
		expect(typeof key).toBe("string");
		expect(key.length).toBe(10);
	});

	it("should generate a string of the specified length", () => {
		// Arrange
		const lengths = [5, 8, 15, 20];

		// Act & Assert
		lengths.forEach((length) => {
			const key = uniKey(length);
			expect(key.length).toBe(length);
		});
	});

	it("should generate different keys on subsequent calls", () => {
		// Act
		const key1 = uniKey();
		const key2 = uniKey();
		const key3 = uniKey();

		// Assert
		expect(key1).not.toBe(key2);
		expect(key1).not.toBe(key3);
		expect(key2).not.toBe(key3);
	});

	it("should generate keys containing only alphanumeric characters", () => {
		// Arrange
		const alphanumericRegex = /^[A-Za-z0-9]+$/;

		// Act
		const key = uniKey(50); // Test with a long key to increase character variety

		// Assert
		expect(alphanumericRegex.test(key)).toBe(true);
	});

	it("should handle zero length by returning an empty string", () => {
		// Act
		const key = uniKey(0);

		// Assert
		expect(key).toBe("");
	});

	it("should handle negative length by treating it as zero", () => {
		// Act
		const key = uniKey(-5);

		// Assert
		expect(key).toBe("");
	});

	it("should have sufficient randomness", () => {
		// Arrange
		const sampleSize = 100;
		const keys = new Set<string>();

		// Act
		for (let i = 0; i < sampleSize; i++) {
			keys.add(uniKey(8));
		}

		// Assert
		// If the function has good randomness, we should have close to sampleSize unique keys
		// We'll check that at least 95% of the keys are unique
		expect(keys.size).toBeGreaterThanOrEqual(Math.floor(sampleSize * 0.95));
	});
});
