import { IFormValidateResult } from "../types";

/**
 * Checks if a validation result is valid (no errors).
 * 
 * @param {IFormValidateResult} result - The validation result to check.
 * @returns {boolean} True if the result has no errors, otherwise false.
 */
export function isValidResult(result: IFormValidateResult): boolean {
  return !result.errors || result.errors.length === 0;
}

/**
 * Formats a simple error into the form error format.
 * 
 * @param {string} path - The path where the error occurred.
 * @param {string} message - The error message.
 * @returns {IFormValidateResult} The formatted error result.
 */
export function formatError(path: string, message: string): IFormValidateResult {
  return {
    errors: [{ path, message }]
  };
}

/**
 * Combines multiple validation results into a single result.
 * 
 * @param {...IFormValidateResult[]} results - The validation results to combine.
 * @returns {IFormValidateResult} A single validation result containing all errors.
 */
export function combineValidationResults(...results: IFormValidateResult[]): IFormValidateResult {
  const combinedErrors: IFormValidateResult["errors"] = [];
  
  for (const result of results) {
    if (result.errors && result.errors.length > 0) {
      combinedErrors.push(...result.errors);
    }
  }
  
  return { errors: combinedErrors };
}