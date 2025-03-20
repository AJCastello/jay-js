import type { IFormValidateResult } from "../../types.js";
import { combineValidationResults, formatError, isValidResult } from "../validators.js";

describe("Form Validators Utilities", () => {
	describe("isValidResult", () => {
		it("deve identificar corretamente resultados válidos (sem erros)", () => {
			const validResult: IFormValidateResult = { errors: [] };
			expect(isValidResult(validResult)).toBe(true);

			const validResult2: IFormValidateResult = { errors: undefined as any };
			expect(isValidResult(validResult2)).toBe(true);
		});

		it("deve identificar corretamente resultados inválidos (com erros)", () => {
			const invalidResult: IFormValidateResult = {
				errors: [{ path: "email", message: "Email inválido" }],
			};
			expect(isValidResult(invalidResult)).toBe(false);

			const multipleErrorsResult: IFormValidateResult = {
				errors: [
					{ path: "nome", message: "Nome é obrigatório" },
					{ path: "email", message: "Email inválido" },
				],
			};
			expect(isValidResult(multipleErrorsResult)).toBe(false);
		});
	});

	describe("formatError", () => {
		it("deve formatar corretamente um erro simples", () => {
			const error = formatError("email", "Email inválido");

			expect(error).toEqual({
				errors: [{ path: "email", message: "Email inválido" }],
			});
		});

		it("deve manter a estrutura IFormValidateResult", () => {
			const field = "password";
			const message = "Senha muito fraca";
			const error = formatError(field, message);

			expect(error.errors).toHaveLength(1);
			expect(error.errors[0].path).toBe(field);
			expect(error.errors[0].message).toBe(message);
		});
	});

	describe("combineValidationResults", () => {
		it("deve combinar múltiplos resultados de validação", () => {
			const result1: IFormValidateResult = {
				errors: [{ path: "nome", message: "Nome é obrigatório" }],
			};

			const result2: IFormValidateResult = {
				errors: [{ path: "email", message: "Email inválido" }],
			};

			const combinedResult = combineValidationResults(result1, result2);

			expect(combinedResult.errors).toHaveLength(2);
			expect(combinedResult.errors).toContainEqual({ path: "nome", message: "Nome é obrigatório" });
			expect(combinedResult.errors).toContainEqual({ path: "email", message: "Email inválido" });
		});

		it("deve lidar com resultados vazios ou sem erros", () => {
			const result1: IFormValidateResult = { errors: [] };
			const result2: IFormValidateResult = {
				errors: [{ path: "email", message: "Email inválido" }],
			};

			const combinedResult = combineValidationResults(result1, result2);

			expect(combinedResult.errors).toHaveLength(1);
			expect(combinedResult.errors[0]).toEqual({ path: "email", message: "Email inválido" });
		});

		it("deve produzir um resultado válido quando todos os inputs são válidos", () => {
			const result1: IFormValidateResult = { errors: [] };
			const result2: IFormValidateResult = { errors: [] };

			const combinedResult = combineValidationResults(result1, result2);

			expect(combinedResult.errors).toHaveLength(0);
			expect(isValidResult(combinedResult)).toBe(true);
		});

		it("deve processar corretamente múltiplos resultados", () => {
			const result1: IFormValidateResult = {
				errors: [{ path: "nome", message: "Nome é obrigatório" }],
			};

			const result2: IFormValidateResult = {
				errors: [{ path: "email", message: "Email inválido" }],
			};

			const result3: IFormValidateResult = {
				errors: [{ path: "idade", message: "Idade deve ser maior que 18" }],
			};

			const result4: IFormValidateResult = { errors: [] };

			const combinedResult = combineValidationResults(result1, result2, result3, result4);

			expect(combinedResult.errors).toHaveLength(3);
			expect(combinedResult.errors).toContainEqual({ path: "nome", message: "Nome é obrigatório" });
			expect(combinedResult.errors).toContainEqual({ path: "email", message: "Email inválido" });
			expect(combinedResult.errors).toContainEqual({ path: "idade", message: "Idade deve ser maior que 18" });
		});

		it("deve manter a ordem dos erros ao combinar resultados", () => {
			const result1: IFormValidateResult = {
				errors: [
					{ path: "campo1", message: "Erro no campo 1" },
					{ path: "campo2", message: "Erro no campo 2" },
				],
			};

			const result2: IFormValidateResult = {
				errors: [
					{ path: "campo3", message: "Erro no campo 3" },
					{ path: "campo4", message: "Erro no campo 4" },
				],
			};

			const combinedResult = combineValidationResults(result1, result2);

			expect(combinedResult.errors[0].path).toBe("campo1");
			expect(combinedResult.errors[1].path).toBe("campo2");
			expect(combinedResult.errors[2].path).toBe("campo3");
			expect(combinedResult.errors[3].path).toBe("campo4");
		});
	});

	describe("Integração entre utilitários", () => {
		it("deve funcionar corretamente ao integrar formatError com isValidResult", () => {
			// Criar erro formatado
			const error = formatError("email", "Email inválido");

			// Verificar que não é válido
			expect(isValidResult(error)).toBe(false);
		});

		it("deve funcionar corretamente ao integrar formatError com combineValidationResults", () => {
			// Criar erros formatados
			const error1 = formatError("email", "Email inválido");
			const error2 = formatError("nome", "Nome é obrigatório");

			// Combinar os erros
			const combinedResult = combineValidationResults(error1, error2);

			// Verificar resultado
			expect(combinedResult.errors).toHaveLength(2);
			expect(combinedResult.errors).toContainEqual({ path: "email", message: "Email inválido" });
			expect(combinedResult.errors).toContainEqual({ path: "nome", message: "Nome é obrigatório" });

			// Verificar que não é válido
			expect(isValidResult(combinedResult)).toBe(false);
		});

		it("deve poder criar um resultado válido após combinar com um resultado vazio", () => {
			// Criar erro formatado
			const error = formatError("email", "Email inválido");

			// Resultado válido vazio
			const validResult: IFormValidateResult = { errors: [] };

			// Combinação deve conter apenas o erro
			const combinedResult = combineValidationResults(error, validResult);
			expect(combinedResult.errors).toHaveLength(1);
			expect(combinedResult.errors[0]).toEqual({ path: "email", message: "Email inválido" });
		});
	});
});
