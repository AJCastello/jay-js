import { IFormValidateResult } from "../types";

/**
 * Verifica se um resultado de validação é válido (sem erros)
 */
export function isValidResult(result: IFormValidateResult): boolean {
  return !result.errors || result.errors.length === 0;
}

/**
 * Formata um erro simples para o formato de erro do formulário
 */
export function formatError(path: string, message: string): IFormValidateResult {
  return {
    errors: [{ path, message }]
  };
}

/**
 * Combina múltiplos resultados de validação em um único resultado
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