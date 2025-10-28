import { vi } from "vitest";
import type { TFormValidateResult } from "../../types.js";
import { combineValidationResults, formatError, isValidResult } from "../validators.js";

describe("Form Validators Utilities", () => {
	describe("isValidResult", () => {
		it("should correctly identify valid results (no errors)", () => {
			const validResult: TFormValidateResult = { errors: [] };
			expect(isValidResult(validResult)).toBe(true);

			const validResult2: TFormValidateResult = { errors: undefined as any };
			expect(isValidResult(validResult2)).toBe(true);
		});

		it("should correctly identify invalid results (with errors)", () => {
			const invalidResult: TFormValidateResult = {
				errors: [{ path: "email", message: "Invalid email" }],
			};
			expect(isValidResult(invalidResult)).toBe(false);

			const multipleErrorsResult: TFormValidateResult = {
				errors: [
					{ path: "nome", message: "Name is required" },
					{ path: "email", message: "Invalid email" },
				],
			};
			expect(isValidResult(multipleErrorsResult)).toBe(false);
		});
	});

	describe("formatError", () => {
		it("should correctly format a single error", () => {
			const error = formatError("email", "Invalid email");

			expect(error).toEqual({
				errors: [{ path: "email", message: "Invalid email" }],
			});
		});

		it("should maintain the IFormValidateResult structure", () => {
			const field = "password";
			const message = "Password is too weak";
			const error = formatError(field, message);

			expect(error.errors).toHaveLength(1);
			expect(error.errors[0].path).toBe(field);
			expect(error.errors[0].message).toBe(message);
		});
	});

	describe("combineValidationResults", () => {
		it("should combine multiple validation results", () => {
			const result1: TFormValidateResult = {
				errors: [{ path: "nome", message: "Name is required" }],
			};

			const result2: TFormValidateResult = {
				errors: [{ path: "email", message: "Invalid email" }],
			};

			const combinedResult = combineValidationResults(result1, result2);

			expect(combinedResult.errors).toHaveLength(2);
			expect(combinedResult.errors).toContainEqual({ path: "nome", message: "Name is required" });
			expect(combinedResult.errors).toContainEqual({ path: "email", message: "Invalid email" });
		});

		it("should handle empty or error-free results", () => {
			const result1: TFormValidateResult = { errors: [] };
			const result2: TFormValidateResult = {
				errors: [{ path: "email", message: "Invalid email" }],
			};

			const combinedResult = combineValidationResults(result1, result2);

			expect(combinedResult.errors).toHaveLength(1);
			expect(combinedResult.errors[0]).toEqual({ path: "email", message: "Invalid email" });
		});

		it("should produce a valid result when all inputs are valid", () => {
			const result1: TFormValidateResult = { errors: [] };
			const result2: TFormValidateResult = { errors: [] };

			const combinedResult = combineValidationResults(result1, result2);

			expect(combinedResult.errors).toHaveLength(0);
			expect(isValidResult(combinedResult)).toBe(true);
		});

		it("should correctly process multiple results", () => {
			const result1: TFormValidateResult = {
				errors: [{ path: "nome", message: "Name is required" }],
			};

			const result2: TFormValidateResult = {
				errors: [{ path: "email", message: "Invalid email" }],
			};

			const result3: TFormValidateResult = {
				errors: [{ path: "idade", message: "Age must be greater than 18" }],
			};

			const result4: TFormValidateResult = { errors: [] };

			const combinedResult = combineValidationResults(result1, result2, result3, result4);

			expect(combinedResult.errors).toHaveLength(3);
			expect(combinedResult.errors).toContainEqual({ path: "nome", message: "Name is required" });
			expect(combinedResult.errors).toContainEqual({ path: "email", message: "Invalid email" });
			expect(combinedResult.errors).toContainEqual({ path: "idade", message: "Age must be greater than 18" });
		});

		it("should maintain the order of errors when combining results", () => {
			const result1: TFormValidateResult = {
				errors: [
					{ path: "campo1", message: "Error in field 1" },
					{ path: "campo2", message: "Error in field 2" },
				],
			};

			const result2: TFormValidateResult = {
				errors: [
					{ path: "campo3", message: "Error in field 3" },
					{ path: "campo4", message: "Error in field 4" },
				],
			};

			const combinedResult = combineValidationResults(result1, result2);

			expect(combinedResult.errors[0].path).toBe("campo1");
			expect(combinedResult.errors[1].path).toBe("campo2");
			expect(combinedResult.errors[2].path).toBe("campo3");
			expect(combinedResult.errors[3].path).toBe("campo4");
		});
	});

	describe("Integration between utilities", () => {
		it("should work correctly when integrating formatError with isValidResult", () => {
			// Create formatted error
			const error = formatError("email", "Invalid email");

			// Verify that it is not valid
			expect(isValidResult(error)).toBe(false);
		});

		it("should work correctly when integrating formatError with combineValidationResults", () => {
			// Create formatted errors
			const error1 = formatError("email", "Invalid email");
			const error2 = formatError("nome", "Name is required");

			// Combine the errors
			const combinedResult = combineValidationResults(error1, error2);

			// Verify result
			expect(combinedResult.errors).toHaveLength(2);
			expect(combinedResult.errors).toContainEqual({ path: "email", message: "Invalid email" });
			expect(combinedResult.errors).toContainEqual({ path: "nome", message: "Name is required" });

			// Verify that it is not valid
			expect(isValidResult(combinedResult)).toBe(false);
		});

		it("should be able to create a valid result after combining with an empty result", () => {
			// Create formatted error
			const error = formatError("email", "Invalid email");

			// Valid empty result
			const validResult: TFormValidateResult = { errors: [] };

			// Combination should contain only the error
			const combinedResult = combineValidationResults(error, validResult);
			expect(combinedResult.errors).toHaveLength(1);
			expect(combinedResult.errors[0]).toEqual({ path: "email", message: "Invalid email" });
		});
	});
});
