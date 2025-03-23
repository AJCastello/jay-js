import type { TFormValidateResult } from "../types";

/**
 * Checks if a validation result is valid (no errors).
 *
 * @param {TFormValidateResult} result - The validation result to check.
 * @returns {boolean} True if the result has no errors, otherwise false.
 *
 * @example
 * const validationResult = await formResolver(formData);
 * if (isValidResult(validationResult)) {
 *   // Form is valid, proceed with submission
 *   submitForm(formData);
 * }
 */
export function isValidResult(result: TFormValidateResult): boolean {
	return !result.errors || result.errors.length === 0;
}

/**
 * Formats a simple error into the form error format.
 *
 * @param {string} path - The path where the error occurred (usually the field name).
 * @param {string} message - The error message to display to the user.
 * @returns {TFormValidateResult} The formatted error result ready to be used with form state.
 *
 * @example
 * // Create a validation error for the email field
 * const emailError = formatError('email', 'Please enter a valid email address');
 * formState.setErrors(emailError);
 */
export function formatError(path: string, message: string): TFormValidateResult {
	return {
		errors: [{ path, message }],
	};
}

/**
 * Combines multiple validation results into a single result.
 * Useful when validating multiple form sections independently.
 *
 * @param {...TFormValidateResult[]} results - The validation results to combine.
 * @returns {TFormValidateResult} A single validation result containing all errors.
 *
 * @example
 * // Combine validation results from different form sections
 * const personalInfoValidation = validatePersonalInfo(formData);
 * const addressValidation = validateAddress(formData);
 * const paymentValidation = validatePayment(formData);
 *
 * const combinedValidation = combineValidationResults(
 *   personalInfoValidation,
 *   addressValidation,
 *   paymentValidation
 * );
 *
 * if (isValidResult(combinedValidation)) {
 *   // All sections are valid
 *   submitForm(formData);
 * } else {
 *   // Display errors
 *   formState.setErrors(combinedValidation);
 * }
 */
export function combineValidationResults(...results: TFormValidateResult[]): TFormValidateResult {
	const combinedErrors: TFormValidateResult["errors"] = [];

	for (const result of results) {
		if (result.errors && result.errors.length > 0) {
			combinedErrors.push(...result.errors);
		}
	}

	return { errors: combinedErrors };
}
