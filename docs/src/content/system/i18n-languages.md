---
category: Internacionalização
categoryId: 6
articleId: 3
slug: i18n-languages
title: Definindo Idiomas
description: Aprenda como configurar e gerenciar idiomas na sua aplicação internacionalizada
---

# Definindo Idiomas

## Referência da API

### Configuração de Idioma

```typescript
// Tipo de configuração de idioma
interface LanguageConfig {
  code: string;            // Identificador do idioma (ex: 'en', 'es')
  data?: Record<string, any>; // Dados de tradução diretos
  import?: () => Promise<Record<string, any>>; // Função de carregamento lazy
}

// Em i18nDefineOptions
{
  languages: LanguageConfig[];
  // ...outras opções
}
```

### Funções de Gerenciamento de Idioma

| Função | Descrição |
|----------|-------------|
| `setLanguage(code)` | Altera o idioma ativo para o código especificado |
| `getCurrentLocale()` | Retorna o código do idioma ativo atual |
| `initLanguage()` | Inicializa o sistema de idiomas com os idiomas configurados |

### Padrões de Carregamento

- **Carregamento Direto**: Fornece traduções diretamente na propriedade `data`
- **Importação Dinâmica**: Use a função `import` para carregar traduções sob demanda
- **Carregamento Híbrido**: Combine ambas as abordagens para traduções críticas vs. adicionais

O sistema i18n suporta múltiplas abordagens para definir e gerenciar os idiomas da sua aplicação. Este guia cobre as diferentes maneiras de configurar suas configurações de idioma.

## Dados de Idioma Estáticos

A abordagem mais simples é incluir dados de idioma diretamente na sua configuração:

```typescript
import { i18nDefineOptions } from '@jay-js/system';

i18nDefineOptions({
  languages: [
    {
      code: 'en',
      data: {
        'Hello': 'Hello',
        'Welcome': 'Welcome',
        'About': 'About'
      }
    },
    {
      code: 'es',
      data: {
        'Hello': 'Hola',
        'Welcome': 'Bienvenido',
        'About': 'Acerca de'
      }
    }
  ],
  defaultLocale: 'en'
});
```

## Carregamento Dinâmico

Para melhor desempenho, você pode carregar arquivos de idioma de forma lazy:

```typescript
i18nDefineOptions({
  languages: [
    {
      code: 'en',
      data: enTranslations  // Idioma base carregado imediatamente
    },
    {
      code: 'es',
      import: () => import('./locales/es.json')  // Carregado sob demanda
    },
    {
      code: 'fr',
      import: () => import('./locales/fr.json')
    }
  ],
  defaultLocale: 'en'
});
```

## Estrutura de Arquivos de Idioma

### Estrutura Plana
```typescript
// en-us.ts
const translations = {
  'Hello': 'Hello',
  'Welcome, {{name}}!': 'Welcome, {{name}}!',
  'About Us': 'About Us'
};

export default translations;
```

### Estrutura Aninhada
```typescript
// en-us.ts
const translations = {
  common: {
    hello: 'Hello',
    welcome: 'Welcome, {{name}}!'
  },
  navigation: {
    home: 'Home',
    about: 'About Us',
    contact: 'Contact'
  }
};

export default translations;
```

## Integração com TypeScript

Defina tipos para suas traduções para garantir segurança de tipos:

```typescript
// i18n.types.ts
export interface Translations {
  // Estrutura plana
  'Hello': string;
  'Welcome, {{name}}!': string;

  // Ou estrutura aninhada
  common: {
    hello: string;
    welcome: string;
  };
  navigation: {
    home: string;
    about: string;
  };
}

// Use com sua configuração
import { useI18n } from '@jay-js/system';
export const i18n = useI18n<Translations>();
```

## Detecção de Idioma

O sistema automaticamente:
1. Verifica as configurações de idioma do navegador
2. Procura por preferências armazenadas no localStorage
3. Retorna ao idioma padrão

Você pode sobrescrever esse comportamento na sua configuração:

```typescript
i18nDefineOptions({
  languages: [...],
  defaultLocale: 'en',
  saveToLocalStorage: true,  // Habilita/desabilita persistência
  localStorageKey: 'app-language'  // Chave de armazenamento personalizada
});
```