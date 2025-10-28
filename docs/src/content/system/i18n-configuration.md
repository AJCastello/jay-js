---
categoria: Internacionalização
categoriaId: 6
artigoId: 2
slug: configuracao-i18n
titulo: Configuração de I18n
descricao: Guia completo para configurar o sistema de internacionalização
---

# Configuração de I18n

## Referência da API

### Função de Configuração

```typescript
// Sintaxe básica de configuração
i18nDefineOptions(options: Ii18nOptions);
```

### Tipo de Configuração

```typescript
interface Ii18nOptions {
  languages: LanguageConfig[];
  defaultLocale?: string;
  saveToLocalStorage?: boolean;
  localStorageKey?: string;
  nestedKeys?: boolean;
}

interface LanguageConfig {
  code: string;
  data?: Record<string, any>;
  import?: () => Promise<Record<string, any>>;
}
```

### Parâmetros

| Opção | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `languages` | `LanguageConfig[]` | Obrigatório | Array de configurações de idiomas |
| `defaultLocale` | `string` | `'en'` | Código do idioma padrão |
| `saveToLocalStorage` | `boolean` | `true` | Salvar preferência de idioma |
| `localStorageKey` | `string` | `'jayjs-i18n-default-locale'` | Nome da chave de armazenamento |
| `nestedKeys` | `boolean` | `false` | Habilitar chaves de tradução aninhadas |

### Padrões de Uso

- **Configuração Básica**: Configuração direta com traduções estáticas
- **Carregamento Dinâmico**: Configuração com traduções carregadas sob demanda
- **Abordagem Mista**: Dados estáticos para traduções críticas com carregamento dinâmico para outras
- **Integração com Frameworks**: Configuração como parte da inicialização do framework

O sistema de i18n oferece uma API de configuração flexível através da função `i18nDefineOptions`. Este guia cobre todas as opções de configuração disponíveis e seus casos de uso.

## Opções de Configuração

Aqui estão todas as opções de configuração disponíveis:

```typescript
import { i18nDefineOptions } from '@jay-js/system';

i18nDefineOptions({
  // Array de idiomas suportados
  languages: [
    {
      code: 'en',          // Código do idioma
      data?: {...},        // Dados imediatos opcionais
      import?: () => {...} // Importação dinâmica opcional
    }
  ],

  defaultLocale: 'en',     // Código do idioma padrão
  saveToLocalStorage: true,// Salvar preferência de idioma
  localStorageKey: 'lang', // Nome da chave de armazenamento
  nestedKeys: false        // Habilitar chaves aninhadas
});
```

## Configuração de Idiomas

O array `languages` define todos os idiomas suportados:

```typescript
i18nDefineOptions({
  languages: [
    // Carregamento imediato de dados
    {
      code: 'en',
      data: {
        'Hello': 'Olá',
        'Welcome': 'Bem-vindo'
      }
    },

    // Carregamento dinâmico
    {
      code: 'es',
      import: () => import('./locales/es.json')
    },

    // Abordagem mista
    {
      code: 'fr',
      data: { /* traduções críticas */ },
      import: () => import('./locales/fr-extended.json')
    }
  ]
});
```

## Opções de Armazenamento

Configure como as preferências de idioma são armazenadas:

```typescript
i18nDefineOptions({
  // Habilitar/desabilitar localStorage
  saveToLocalStorage: true,

  // Chave de armazenamento personalizada (padrão: 'jayjs-i18n-default-locale')
  localStorageKey: 'meu-app-idioma',

  // Outras opções...
});
```

## Estrutura de Tradução

Escolha entre chaves de tradução planas ou aninhadas:

```typescript
// Estrutura plana (padrão)
i18nDefineOptions({
  nestedKeys: false,
  languages: [{
    code: 'en',
    data: {
      'welcome.title': 'Bem-vindo',
      'welcome.message': 'Olá'
    }
  }]
});

// Estrutura aninhada
i18nDefineOptions({
  nestedKeys: true,
  languages: [{
    code: 'en',
    data: {
      welcome: {
        title: 'Bem-vindo',
        message: 'Olá'
      }
    }
  }]
});
```

## Idioma Padrão

Configure o comportamento padrão e de fallback:

```typescript
i18nDefineOptions({
  // Idioma padrão se nenhuma preferência for encontrada
  defaultLocale: 'en',

  languages: [
    {
      code: 'en',
      data: { /* Traduções em inglês */ }
    },
    // Outros idiomas...
  ]
});
```

## Configuração com TypeScript

Configuração com segurança de tipo usando TypeScript:

```typescript
import type { Ti18nOptions, Ti18nLanguages } from '@jay-js/system';

interface Translations {
  'Hello': string;
  'Welcome': string;
}

const config: Ti18nOptions = {
  languages: [
    {
      code: 'en',
      data: {
        'Hello': 'Olá',
        'Welcome': 'Bem-vindo'
      }
    }
  ] as Array<Ti18nLanguages>,
  defaultLocale: 'en',
  saveToLocalStorage: true,
  nestedKeys: false
};

i18nDefineOptions(config);
```

## Melhores Práticas de Configuração

1. **Idioma Padrão**
   - Sempre inclua um idioma padrão com dados imediatos
   - Use um idioma amplamente suportado como padrão (por exemplo, 'en')

2. **Carregamento Dinâmico**
   - Use imports dinâmicos para idiomas não padrão
   - Considere agrupar traduções críticas com o idioma padrão

3. **Armazenamento**
   - Use chaves de armazenamento personalizadas em ambientes multi-aplicativos
   - Considere desabilitar o armazenamento em ambientes SSR

4. **Estrutura**
   - Escolha entre estrutura plana ou aninhada com base no tamanho do projeto
   - Mantenha consistência com a estrutura escolhida em todo o projeto