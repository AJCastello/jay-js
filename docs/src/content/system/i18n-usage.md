---
category: Internacionalização
categoryId: 6
articleId: 5
slug: i18n-usage
title: Usando Traduções
description: Aprenda como usar traduções nos seus componentes com segurança de tipos
---

# Usando Traduções

## Referência da API

### Função Principal

```typescript
// Sintaxe básica de uso
const t = useI18n<TranslationsType>();
const translatedText = t(key, variables?, options?);
```

### Parâmetros

| Parâmetro | Tipo | Descrição |
|-----------|------|-------------|
| `key` | `string` | Chave de tradução para buscar |
| `variables` | `Record<string, string \| number>` | Variáveis opcionais para injetar na tradução |
| `options` | `{ default?: string }` | Configuração opcional com texto de fallback padrão |

### Valor de Retorno

| Tipo | Descrição |
|------|-------------|
| `string` | O texto traduzido com quaisquer variáveis substituídas |

### Parâmetros de Tipo

| Parâmetro | Descrição |
|-----------|-------------|
| `T` | Tipo TypeScript representando sua estrutura de traduções |

### Recursos Especiais

- **Segurança de Tipos**: Suporte completo ao TypeScript para chaves de tradução
- **Injeção de Variáveis**: Suporte para sintaxe `{{nomeVariavel}}` nas traduções
- **Valores Padrão**: Texto de fallback para traduções ausentes
- **Chaves Aninhadas**: Suporte para notação de pontos com traduções aninhadas (quando habilitado)
- **Detecção Automática**: Não é necessário especificar o idioma atual, gerenciado internamente

O sistema i18n fornece uma API simples baseada em hooks para acessar traduções nos seus componentes. Este guia cobre os padrões básicos de uso e recursos avançados.

## Uso Básico

O hook `useI18n` é a maneira principal de acessar traduções nos seus componentes. Veja como usá-lo:

```typescript
import { useI18n } from '@jay-js/system';

// Defina seu tipo de traduções
type Translations = {
  'Hello': string;
  'Welcome to our app': string;
};

function MyComponent() {
  const t = useI18n<Translations>();

  return (
    <div>
      <h1>{t('Hello')}</h1>
      <p>{t('Welcome to our app')}</p>
    </div>
  );
}
```

## Usando Variáveis

Você pode incluir conteúdo dinâmico nas suas traduções usando variáveis:

```typescript
type Translations = {
  'Welcome, {{name}}!': string;
  'You have {{count}} messages': string;
};

function MyComponent() {
  const t = useI18n<Translations>();
  const user = { name: 'João', messageCount: 5 };

  return (
    <div>
      <p>{t('Welcome, {{name}}!', { name: user.name })}</p>
      <p>{t('You have {{count}} messages', { count: user.messageCount })}</p>
    </div>
  );
}
```

## Usando Chaves Aninhadas

Ao trabalhar com traduções aninhadas (requer `nestedKeys: true` na configuração):

```typescript
type Translations = {
  greeting: {
    welcome: string;
    hello: string;
  };
  navigation: {
    home: string;
    about: string;
  };
};

function MyComponent() {
  const t = useI18n<Translations>();

  return (
    <div>
      <h1>{t('greeting.hello')}</h1>
      <p>{t('greeting.welcome')}</p>
      <nav>
        <a href="/">{t('navigation.home')}</a>
        <a href="/about'>{t('navigation.about')}</a>
      </nav>
    </div>
  );
}
```

## Valores Padrão

Você pode fornecer valores padrão para traduções ausentes:

```typescript
function MyComponent() {
  const t = useI18n<Translations>();

  return (
    <div>
      {t('missing.key', {}, { default: 'Texto de Fallback' })}
    </div>
  );
}
```

## Segurança de Tipos

O sistema fornece segurança de tipos completa para suas traduções:

- As chaves devem existir no seu tipo de traduções
- Variáveis são verificadas quanto ao tipo
- Caminhos aninhados são validados
- O TypeScript detectará erros em tempo de compilação

```typescript
// Isso causará um erro do TypeScript
t('non.existent.key');

// Isso causará um erro do TypeScript se 'name' não estiver definido nas traduções
t('Welcome', { wrongVariable: 'João' });
```