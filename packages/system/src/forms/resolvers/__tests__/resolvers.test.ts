import { zodResolver, yupResolver } from "../index.js";
import { z } from "zod";
import * as yup from "yup";

describe("Form Resolvers", () => {
  
  describe("zodResolver", () => {
    it("deve validar esquemas do Zod corretamente", async () => {
      // Definir o esquema de validação Zod
      const schema = z.object({
        nome: z.string().min(2, "Nome muito curto"),
        email: z.string().email("Email inválido"),
        idade: z.number().min(18, "Deve ser maior de idade")
      });
      
      // Criar o resolver
      const resolver = zodResolver(schema);
      
      // Testar com dados válidos
      const validData = {
        nome: "João",
        email: "joao@example.com",
        idade: 25
      };
      
      const validResult = await resolver(validData);
      expect(validResult.errors).toHaveLength(0);
      
      // Testar com dados inválidos
      const invalidData = {
        nome: "J", // muito curto
        email: "email-invalido", // formato de email inválido
        idade: 16 // menor de idade
      };
      
      const invalidResult = await resolver(invalidData);
      expect(invalidResult.errors).toHaveLength(3);
      
      // Verificar mensagens de erro específicas
      expect(invalidResult.errors).toContainEqual({
        path: "nome",
        message: "Nome muito curto"
      });
      
      expect(invalidResult.errors).toContainEqual({
        path: "email",
        message: "Email inválido"
      });
      
      expect(invalidResult.errors).toContainEqual({
        path: "idade",
        message: "Deve ser maior de idade"
      });
    });
    
    it("deve validar apenas um campo específico quando solicitado", async () => {
      const schema = z.object({
        nome: z.string().min(3, "Nome muito curto"),
        email: z.string().email("Email inválido")
      });
      
      const resolver = zodResolver(schema);
      
      const data = {
        nome: "Jo", // inválido
        email: "joao@example.com" // válido
      };
      
      // Validar apenas o campo de email
      const emailResult = await resolver(data, "email");
      expect(emailResult.errors).toHaveLength(0); // email é válido
      
      // Validar apenas o campo de nome
      const nomeResult = await resolver(data, "nome");
      expect(nomeResult.errors).toHaveLength(1);
      expect(nomeResult.errors[0]).toEqual({
        path: "nome",
        message: "Nome muito curto"
      });
    });
    
    it("deve lidar com esquemas com validação cruzada entre campos", async () => {
      const baseSchema = z.object({
        senha: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
        confirmarSenha: z.string()
      });

      // Criar um wrapper para o schema refinado
      const schema = z.object({
        senha: baseSchema.shape.senha,
        confirmarSenha: baseSchema.shape.confirmarSenha
      }).superRefine((data, ctx) => {
        if (data.senha !== data.confirmarSenha) {
          ctx.addIssue({
            code: "custom",
            message: "As senhas não coincidem",
            path: ["confirmarSenha"]
          });
        }
      });
      
      const resolver = zodResolver(schema);
      
      // Teste com senhas que coincidem
      const validData = {
        senha: "senha123",
        confirmarSenha: "senha123"
      };
      
      const validResult = await resolver(validData);
      expect(validResult.errors).toHaveLength(0);
      
      // Teste com senhas que não coincidem
      const invalidData = {
        senha: "senha123",
        confirmarSenha: "senha456"
      };
      
      const invalidResult = await resolver(invalidData);
      expect(invalidResult.errors).toHaveLength(1);
      expect(invalidResult.errors[0]).toEqual({
        path: "confirmarSenha",
        message: "As senhas não coincidem"
      });
    });
  });
  
  describe("yupResolver", () => {
    it("deve validar esquemas do Yup corretamente", async () => {
      // Definir o esquema de validação Yup
      const schema = yup.object({
        nome: yup.string().required("Nome é obrigatório").min(2, "Nome muito curto"),
        email: yup.string().required("Email é obrigatório").email("Email inválido"),
        idade: yup.number().required("Idade é obrigatória").min(18, "Deve ser maior de idade")
      });
      
      // Criar o resolver
      const resolver = yupResolver(schema);
      
      // Testar com dados válidos
      const validData = {
        nome: "Maria",
        email: "maria@example.com",
        idade: 30
      };
      
      const validResult = await resolver(validData);
      expect(validResult.errors).toHaveLength(0);
      
      // Testar com dados inválidos
      const invalidData = {
        nome: "M", // muito curto
        email: "email-invalido", // formato de email inválido
        idade: 16 // menor de idade
      };
      
      const invalidResult = await resolver(invalidData);
      expect(invalidResult.errors).toHaveLength(3);
      
      // Verificar as mensagens de erro
      const errorMessages = invalidResult.errors.map(err => err.message);
      expect(errorMessages).toContain("Nome muito curto");
      expect(errorMessages).toContain("Email inválido");
      expect(errorMessages).toContain("Deve ser maior de idade");
    });
    
    it("deve validar apenas um campo específico quando solicitado", async () => {
      const schema = yup.object({
        nome: yup.string().required("Nome é obrigatório").min(3, "Nome muito curto"),
        email: yup.string().required("Email é obrigatório").email("Email inválido")
      });
      
      const resolver = yupResolver(schema);
      
      const data = {
        nome: "Ju", // inválido
        email: "julia@example.com" // válido
      };
      
      // Validar apenas o campo de email
      const emailResult = await resolver(data, "email");
      expect(emailResult.errors).toHaveLength(0); // email é válido
      
      // Validar apenas o campo de nome
      const nomeResult = await resolver(data, "nome");
      expect(nomeResult.errors).toHaveLength(1);
      expect(nomeResult.errors[0].path).toBe("nome");
      expect(nomeResult.errors[0].message).toBe("Nome muito curto");
    });
    
    it("deve lidar com validação condicional do Yup", async () => {
      const schema = yup.object({
        temCartaoCredito: yup.boolean(),
        numeroCartao: yup.string().when("temCartaoCredito", {
          is: true,
          then: () => yup.string().required("Número do cartão é obrigatório quando tem cartão")
        })
      });
      
      const resolver = yupResolver(schema);
      
      // Caso onde não tem cartão (campo opcional)
      const validData1 = {
        temCartaoCredito: false,
        numeroCartao: ""
      };
      
      const result1 = await resolver(validData1);
      expect(result1.errors).toHaveLength(0);
      
      // Caso onde tem cartão (campo obrigatório)
      const invalidData = {
        temCartaoCredito: true,
        numeroCartao: "" // deveria ter um valor
      };
      
      const result2 = await resolver(invalidData);
      expect(result2.errors).toHaveLength(1);
      expect(result2.errors[0].path).toBe("numeroCartao");
    });
  });
  
  describe("Casos de uso avançados", () => {
    it("deve lidar com validação de arrays com Zod", async () => {
      // Esquema para um array de telefones
      const schema = z.object({
        nome: z.string(),
        telefones: z.array(
          z.object({
            numero: z.string().min(8, "Número de telefone muito curto"),
            tipo: z.enum(["casa", "trabalho", "celular"])
          })
        ).min(1, "Pelo menos um telefone é necessário")
      });
      
      const resolver = zodResolver(schema);
      
      // Dados válidos
      const validData = {
        nome: "Carlos",
        telefones: [
          { numero: "12345678", tipo: "casa" },
          { numero: "87654321", tipo: "celular" }
        ]
      };
      
      const validResult = await resolver(validData);
      expect(validResult.errors).toHaveLength(0);
      
      // Dados inválidos: array vazio
      const invalidData1 = {
        nome: "Carlos",
        telefones: []
      };
      
      const invalidResult1 = await resolver(invalidData1);
      expect(invalidResult1.errors).toHaveLength(1);
      expect(invalidResult1.errors[0].path).toBe("telefones");
      
      // Dados inválidos: número de telefone curto
      const invalidData2 = {
        nome: "Carlos",
        telefones: [
          { numero: "123", tipo: "casa" }
        ]
      };
      
      const invalidResult2 = await resolver(invalidData2);
      expect(invalidResult2.errors).toHaveLength(1);
      expect(invalidResult2.errors[0].path).toBe("telefones.0.numero");
      
      // Dados inválidos: tipo de telefone inválido
      const invalidData3 = {
        nome: "Carlos",
        telefones: [
          { numero: "12345678", tipo: "outro" as any }
        ]
      };
      
      const invalidResult3 = await resolver(invalidData3);
      expect(invalidResult3.errors).toHaveLength(1);
      expect(invalidResult3.errors[0].path).toBe("telefones.0.tipo");
    });
    
    it("deve lidar com validação de objetos aninhados com Yup", async () => {
      const schema = yup.object({
        usuario: yup.object({
          nome: yup.string().required("Nome é obrigatório"),
          endereco: yup.object({
            rua: yup.string().required("Rua é obrigatória"),
            numero: yup.number().required("Número é obrigatório"),
            cidade: yup.string().required("Cidade é obrigatória")
          })
        })
      });
      
      const resolver = yupResolver(schema);
      
      // Dados válidos
      const validData = {
        usuario: {
          nome: "Ana",
          endereco: {
            rua: "Rua das Flores",
            numero: 123,
            cidade: "São Paulo"
          }
        }
      };
      
      const validResult = await resolver(validData);
      expect(validResult.errors).toHaveLength(0);
      
      // Dados inválidos: campo aninhado faltando
      const invalidData = {
        usuario: {
          nome: "Ana",
          endereco: {
            rua: "Rua das Flores",
            numero: 123,
            cidade: "" // cidade vazia
          }
        }
      };
      
      const invalidResult = await resolver(invalidData);
      expect(invalidResult.errors).toHaveLength(1);
      expect(invalidResult.errors[0].path).toBe("usuario.endereco.cidade");
    });
  });
});