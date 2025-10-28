---
category: Conventions
categoryId: 1
articleId: 1
slug: overview
title: Overview
description: Guia de convenções e melhores práticas para desenvolvimento com Jay JS framework.
---

# Conventions Overview

As **Convenções Jay JS** são um conjunto abrangente de diretrizes, padrões e melhores práticas para desenvolvimento consistente e eficiente com o Jay JS framework. Estas convenções garantem código limpo, manutenível e profissional em todos os projetos.

## O que são as Conventions?

As Conventions são diretrizes cuidadosamente elaboradas que cobrem todos os aspectos do desenvolvimento com Jay JS, desde nomenclatura de arquivos até padrões arquiteturais. Elas promovem consistência, legibilidade e colaboração eficiente entre desenvolvedores.

## Principais Áreas Cobertas

### 📁 **File & Folder Structure**
- Organização padronizada de projetos
- Convenções de nomenclatura de arquivos
- Estrutura de pastas hierárquica
- Separação lógica de responsabilidades

### 🏷️ **Naming Conventions**
- Padrões de nomenclatura para variáveis, funções e componentes
- Convenções para tipos TypeScript
- Nomes descritivos e consistentes
- Diferenciação entre contextos (componentes, utilitários, tipos)

### 🏗️ **Code Architecture**
- Padrões arquiteturais recomendados
- Organização de módulos e dependências
- Separação de concerns
- Estrutura de componentes e serviços

### 📝 **Code Style**
- Formatação e indentação consistente
- Uso de ESLint e Prettier
- Convenções de importação e exportação
- Documentação inline e comentários

## Convenções Fundamentais

### **Nomenclatura de Tipos**
```typescript
// ✅ Correto - Prefixo 'T' para tipos
export type TPerson = {
  name: string;
  age: number;
};

export type TApiResponse<T> = {
  data: T;
  status: number;
};
```

### **Nomenclatura de Componentes**
```typescript
// ✅ Correto - PascalCase para componentes
export function UserProfileComponent() {
  // implementação
}

export function NavigationMenuComponent() {
  // implementação
}
```

### **Nomenclatura de Funções**
```typescript
// ✅ Correto - camelCase para funções utilitárias
export function getUserById(id: string): TPerson | null {
  // implementação
}

export function formatCurrency(amount: number): string {
  // implementação
}
```

### **Estrutura de Projeto Padrão**
```
src/
├── components/          # Componentes reutilizáveis
├── pages/              # Componentes de página
├── services/           # Lógica de negócio
├── types/              # Definições de tipos
├── utils/              # Funções utilitárias
├── hooks/              # Custom hooks
├── stores/             # Gerenciamento de estado
├── assets/             # Recursos estáticos
└── styles/             # Estilos globais
```

## Benefícios das Conventions

- **🤝 Colaboração**: Facilitam trabalho em equipe
- **📖 Legibilidade**: Código mais claro e compreensível
- **🔧 Manutenibilidade**: Facilita modificações e correções
- **⚡ Produtividade**: Reduz tempo de compreensão do código
- **🎯 Consistência**: Padronização em todos os projetos
- **🏆 Qualidade**: Promovem código de alta qualidade

## ESLint & Prettier Configuration

```json
// .eslintrc.js recomendado
{
  "extends": ["@jay-js/eslint-config"],
  "rules": {
    "@typescript-eslint/naming-convention": [
      "error",
      {
        "selector": "typeAlias",
        "format": ["PascalCase"],
        "prefix": ["T"]
      }
    ]
  }
}
```

## Git & Commit Conventions

```bash
# Padrões de commit recomendados
git commit -m "feat: add user authentication component"
git commit -m "fix: resolve state update bug in navigation"
git commit -m "docs: update API documentation"
git commit -m "refactor: improve component structure"
```

## Code Review Guidelines

### **Checklist de Review**
- [ ] Nomenclatura segue convenções estabelecidas
- [ ] Estrutura de arquivos está organizada
- [ ] Tipos TypeScript estão bem definidos
- [ ] Código está formatado corretamente
- [ ] Testes estão incluídos quando necessário

## Ferramentas Recomendadas

- **ESLint**: Para linting e padronização
- **Prettier**: Para formatação automática
- **Husky**: Para git hooks
- **lint-staged**: Para verificação pré-commit
- **TypeScript**: Para tipagem estática

## Adoção das Conventions

Para implementar as conventions em seu projeto:

1. **Configure as ferramentas** (ESLint, Prettier)
2. **Organize a estrutura** de pastas
3. **Aplique nomenclaturas** consistentes
4. **Documente padrões** específicos do projeto
5. **Treine a equipe** nas convenções

As Conventions Jay JS são essenciais para manter a qualidade e consistência do código em projetos de qualquer tamanho, promovendo desenvolvimento profissional e colaborativo.