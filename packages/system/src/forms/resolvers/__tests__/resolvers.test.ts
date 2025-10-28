import { vi } from 'vitest';
import * as yup from "yup";
import { z } from "zod";
import { yupResolver, zodResolver } from "../index.js";

describe("Form Resolvers", () => {
	describe("zodResolver", () => {
		it("should correctly validate Zod schemas", async () => {
			// Define the Zod validation schema
			const schema = z.object({
				nome: z.string().min(2, "Name is too short"),
				email: z.string().email("Invalid email"),
				idade: z.number().min(18, "Must be of legal age"),
			});

			// Create the resolver
			const resolver = zodResolver(schema);

			// Test with valid data
			const validData = {
				nome: "João",
				email: "joao@example.com",
				idade: 25,
			};

			const validResult = await resolver(validData);
			expect(validResult.errors).toHaveLength(0);

			// Test with invalid data
			const invalidData = {
				nome: "J", // too short
				email: "invalid-email", // invalid email format
				idade: 16, // underage
			};

			const invalidResult = await resolver(invalidData);
			expect(invalidResult.errors).toHaveLength(3);

			// Check specific error messages
			expect(invalidResult.errors).toContainEqual({
				path: "nome",
				message: "Name is too short",
			});

			expect(invalidResult.errors).toContainEqual({
				path: "email",
				message: "Invalid email",
			});

			expect(invalidResult.errors).toContainEqual({
				path: "idade",
				message: "Must be of legal age",
			});
		});

		it("should validate only a specific field when requested", async () => {
			const schema = z.object({
				nome: z.string().min(3, "Name is too short"),
				email: z.string().email("Invalid email"),
			});

			const resolver = zodResolver(schema);

			const data = {
				nome: "Jo", // invalid
				email: "joao@example.com", // valid
			};

			// Validate only the email field
			const emailResult = await resolver(data, "email");
			expect(emailResult.errors).toHaveLength(0); // email is valid

			// Validate only the name field
			const nomeResult = await resolver(data, "nome");
			expect(nomeResult.errors).toHaveLength(1);
			expect(nomeResult.errors[0]).toEqual({
				path: "nome",
				message: "Name is too short",
			});
		});

		it("should handle schemas with cross-field validation", async () => {
			const baseSchema = z.object({
				senha: z.string().min(6, "Password must be at least 6 characters"),
				confirmarSenha: z.string(),
			});

			// Create a wrapper for the refined schema
			const schema = z
				.object({
					senha: baseSchema.shape.senha,
					confirmarSenha: baseSchema.shape.confirmarSenha,
				})
				.superRefine((data, ctx) => {
					if (data.senha !== data.confirmarSenha) {
						ctx.addIssue({
							code: "custom",
							message: "Passwords do not match",
							path: ["confirmarSenha"],
						});
					}
				});

			const resolver = zodResolver(schema);

			// Test with matching passwords
			const validData = {
				senha: "senha123",
				confirmarSenha: "senha123",
			};

			const validResult = await resolver(validData);
			expect(validResult.errors).toHaveLength(0);

			// Test with non-matching passwords
			const invalidData = {
				senha: "senha123",
				confirmarSenha: "senha456",
			};

			const invalidResult = await resolver(invalidData);
			expect(invalidResult.errors).toHaveLength(1);
			expect(invalidResult.errors[0]).toEqual({
				path: "confirmarSenha",
				message: "Passwords do not match",
			});
		});
	});

	describe("yupResolver", () => {
		it("should correctly validate Yup schemas", async () => {
			// Define the Yup validation schema
			const schema = yup.object({
				nome: yup.string().required("Name is required").min(2, "Name is too short"),
				email: yup.string().required("Email is required").email("Invalid email"),
				idade: yup.number().required("Age is required").min(18, "Must be of legal age"),
			});

			// Create the resolver
			const resolver = yupResolver(schema);

			// Test with valid data
			const validData = {
				nome: "Maria",
				email: "maria@example.com",
				idade: 30,
			};

			const validResult = await resolver(validData);
			expect(validResult.errors).toHaveLength(0);

			// Test with invalid data
			const invalidData = {
				nome: "M", // too short
				email: "invalid-email", // invalid email format
				idade: 16, // underage
			};

			const invalidResult = await resolver(invalidData);
			expect(invalidResult.errors).toHaveLength(3);

			// Check error messages
			const errorMessages = invalidResult.errors.map((err) => err.message);
			expect(errorMessages).toContain("Name is too short");
			expect(errorMessages).toContain("Invalid email");
			expect(errorMessages).toContain("Must be of legal age");
		});

		it("should validate only a specific field when requested", async () => {
			const schema = yup.object({
				nome: yup.string().required("Name is required").min(3, "Name is too short"),
				email: yup.string().required("Email is required").email("Invalid email"),
			});

			const resolver = yupResolver(schema);

			const data = {
				nome: "Ju", // invalid
				email: "julia@example.com", // valid
			};

			// Validate only the email field
			const emailResult = await resolver(data, "email");
			expect(emailResult.errors).toHaveLength(0); // email is valid

			// Validate only the name field
			const nomeResult = await resolver(data, "nome");
			expect(nomeResult.errors).toHaveLength(1);
			expect(nomeResult.errors[0].path).toBe("nome");
			expect(nomeResult.errors[0].message).toBe("Name is too short");
		});

		it("should handle Yup conditional validation", async () => {
			const schema = yup.object({
				temCartaoCredito: yup.boolean(),
				numeroCartao: yup.string().when("temCartaoCredito", {
					is: true,
					then: () => yup.string().required("Card number is required when you have a card"),
				}),
			});

			const resolver = yupResolver(schema);

			// Case where there is no card (optional field)
			const validData1 = {
				temCartaoCredito: false,
				numeroCartao: "",
			};

			const result1 = await resolver(validData1);
			expect(result1.errors).toHaveLength(0);

			// Case where there is a card (required field)
			const invalidData = {
				temCartaoCredito: true,
				numeroCartao: "", // should have a value
			};

			const result2 = await resolver(invalidData);
			expect(result2.errors).toHaveLength(1);
			expect(result2.errors[0].path).toBe("numeroCartao");
		});
	});

	describe("Advanced use cases", () => {
		it("should handle array validation with Zod", async () => {
			// Schema for an array of phones
			const schema = z.object({
				nome: z.string(),
				telefones: z
					.array(
						z.object({
							numero: z.string().min(8, "Phone number is too short"),
							tipo: z.enum(["casa", "trabalho", "celular"]),
						}),
					)
					.min(1, "At least one phone is required"),
			});

			const resolver = zodResolver(schema);

			// Valid data
			const validData = {
				nome: "Carlos",
				telefones: [
					{ numero: "12345678", tipo: "casa" as const },
					{ numero: "87654321", tipo: "celular" as const },
				],
			};
			const validResult = await resolver(validData);
			expect(validResult.errors).toHaveLength(0);

			// Invalid data: empty array
			const invalidData1 = {
				nome: "Carlos",
				telefones: [],
			};

			const invalidResult1 = await resolver(invalidData1);
			expect(invalidResult1.errors).toHaveLength(1);
			expect(invalidResult1.errors[0].path).toBe("telefones");

			// Invalid data: short phone number
			const invalidData2 = {
				nome: "Carlos",
				telefones: [{ numero: "123", tipo: "casa" as const }],
			};
			const invalidResult2 = await resolver(invalidData2);
			expect(invalidResult2.errors).toHaveLength(1);
			expect(invalidResult2.errors[0].path).toBe("telefones.0.numero");

			// Invalid data: invalid phone type
			const invalidData3 = {
				nome: "Carlos",
				telefones: [{ numero: "12345678", tipo: "outro" as any }],
			};

			const invalidResult3 = await resolver(invalidData3);
			expect(invalidResult3.errors).toHaveLength(1);
			expect(invalidResult3.errors[0].path).toBe("telefones.0.tipo");
		});

		it("should handle nested object validation with Yup", async () => {
			const schema = yup.object({
				usuario: yup.object({
					nome: yup.string().required("Name is required"),
					endereco: yup.object({
						rua: yup.string().required("Street is required"),
						numero: yup.number().required("Number is required"),
						cidade: yup.string().required("City is required"),
					}),
				}),
			});

			const resolver = yupResolver(schema);

			// Valid data
			const validData = {
				usuario: {
					nome: "Ana",
					endereco: {
						rua: "Rua das Flores",
						numero: 123,
						cidade: "São Paulo",
					},
				},
			};

			const validResult = await resolver(validData);
			expect(validResult.errors).toHaveLength(0);

			// Invalid data: missing nested field
			const invalidData = {
				usuario: {
					nome: "Ana",
					endereco: {
						rua: "Rua das Flores",
						numero: 123,
						cidade: "", // empty city
					},
				},
			};

			const invalidResult = await resolver(invalidData);
			expect(invalidResult.errors).toHaveLength(1);
			expect(invalidResult.errors[0].path).toBe("usuario.endereco.cidade");
		});
	});
});
