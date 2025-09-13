---
category: Internacionalização
categoryId: 6
articleId: 4
slug: i18n-provider
title: Provedor I18n
description: Aprenda como configurar e usar o provedor i18n na sua aplicação
---

# Provedor I18n

O provedor i18n é responsável por inicializar e gerenciar o sistema de internacionalização na sua aplicação. Este guia explica como configurar e usar o provedor de forma eficaz.

## Referência da API

### Função do Provedor

```typescript
// Sintaxe básica do provedor
i18nProvider(
  callback: (language: Ti18nLanguages) => void,
  options?: Ii18nOptions
);
```

### Parâmetros

| Parâmetro | Tipo | Descrição |
|-----------|------|-------------|
| `callback` | `(language: Ti18nLanguages) => void` | Função chamada após a inicialização do idioma |
| `options` | `Ii18nOptions` | Opções de configuração para o sistema i18n |

### Tipo de Configuração

```typescript
interface Ii18nOptions {
  languages: Array<{
    code: string;
    data?: Record<string, any>;
    import?: () => Promise<Record<string, any>>;
  }>;
  defaultLocale?: string;
  saveToLocalStorage?: boolean;
  localStorageKey?: string;
  nestedKeys?: boolean;
}
```

### Comportamento

- **Inicialização**: Configura o sistema i18n e carrega o idioma padrão
- **Timing do Callback**: O callback é chamado após o idioma ser carregado
- **Tratamento de Erros**: Tratamento de erros integrado para falhas no carregamento de idiomas
- **Carregamento Dinâmico**: Suporta carregamento imediato e dinâmico de idiomas
- **Persistência**: Gerencia automaticamente as configurações do localStorage quando habilitado

## Configuração Básica

A maneira mais comum de configurar o sistema i18n é no ponto de entrada da sua aplicação:

```typescript
import { i18nProvider } from '@jay-js/system';
import { i18nConfig } from './locales/i18n';

// Inicializa o i18n antes de renderizar sua aplicação
i18nProvider(() => {
  // Renderiza sua aplicação aqui
  renderApp();
}, i18nConfig);
```

## Configuração do Provedor

O provedor aceita dois parâmetros:
1. Uma função callback que executa após a inicialização
2. Opções de configuração para o sistema i18n

```typescript
import { i18nProvider } from '@jay-js/system';

i18nProvider(
  (language) => {
    // language contém os dados do idioma carregado
    console.log('Idioma carregado:', language.code);
    startApp();
  },
  {
    languages: [...],
    defaultLocale: 'en',
    saveToLocalStorage: true,
    localStorageKey: 'app-language',
    nestedKeys: false
  }
);
```

## Exemplo de Carregamento Dinâmico

```typescript
// i18n.ts
import { Ii18nOptions } from '@jay-js/system';

export const i18nConfig: Ii18nOptions = {
  defaultLocale: 'en-US',
  nestedKeys: false,
  saveToLocalStorage: true,
  languages: [
    {
      code: 'en-US',
      import: async () => (await import('./locales/en-us')).default
    },
    {
      code: 'es-ES',
      import: async () => (await import('./locales/es-es')).default
    }
  ]
};

// main.ts
import { i18nProvider } from '@jay-js/system';
import { i18nConfig } from './i18n';

const app = document.querySelector('#app');

i18nProvider(() => {
  // A aplicação é renderizada após o idioma ser carregado
  renderApp(app);
}, i18nConfig);
```

## Comportamento do Provedor

O provedor:
1. Aceita e aplica opções de configuração
2. Inicializa o sistema de idiomas
3. Carrega o idioma padrão ou preferido
4. Configura a persistência no localStorage se habilitada
5. Se inscreve para mudanças de idioma
6. Gerencia importações dinâmicas de idiomas
7. Chama seu callback quando estiver pronto

## Tratamento de Erros

O provedor inclui tratamento de erros integrado:

```typescript
i18nProvider(
  (language) => {
    // Seguro para usar dados de idioma aqui
    startApp();
  },
  {
    languages: [
      {
        code: 'en',
        import: async () => {
          try {
            return (await import('./en.json')).default;
          } catch (error) {
            console.error('Falha ao carregar idioma:', error);
            return {}; // Traduções vazias como fallback
          }
        }
      }
    ]
  }
);
```

## Segurança de Tipos

O provedor mantém segurança de tipos durante todo o processo de inicialização:

```typescript
import { Ii18nOptions, Ti18nLanguages } from '@jay-js/system';

const config: Ii18nOptions = {
  // Configuração type-safe
};

i18nProvider((language: Ti18nLanguages) => {
  // Dados de idioma type-safe
}, config);
```