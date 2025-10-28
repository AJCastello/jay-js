---
category: Controle de Acesso
categoryId: 5
articleId: 2
slug: guard-define
title: Definindo Permissões
description: Aprenda a definir permissões usando a função definePermissions para controle de acesso baseado em papéis (RBAC).
---

# Definindo Permissões

## Referência da API

### definePermissions

```typescript
// Function signature
function definePermissions(role: string | string[], subject: string): TDefinePermission;

// Return type interface
interface TDefinePermission {
  allow(action: string | string[], attributes?: string[]): TDefinePermission; // Permite ações
  forbid(action: string | string[], attributes?: string[]): TDefinePermission; // Proíbe ações
  save(): TPermission[]; // Finaliza e retorna a lista de permissões
}

// Exemplos de uso
const userPermissions = definePermissions('user', 'articles')
  .allow(['read', 'comment'])
  .forbid(['edit', 'delete'])
  .save();

const adminPermissions = definePermissions(['admin', 'superAdmin'], 'articles')
  .allow(['read', 'comment', 'edit', 'delete', 'publish'])
  .save();
```

### Parâmetros

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `role` | `string \| string[]` | O papel (ou lista de papéis) ao qual as permissões se aplicam |
| `subject` | `string` | O assunto/recurso ao qual as permissões se aplicam |

### Métodos

| Método | Parâmetros | Descrição |
|--------|------------|-----------|
| `allow` | `action: string \| string[], attributes?: string[]` | Adiciona uma regra permitindo as ações especificadas |
| `forbid` | `action: string \| string[], attributes?: string[]` | Adiciona uma regra proibindo as ações especificadas |
| `save` | Nenhum | Retorna o array de objetos de permissão definidos |

## Visão Geral

A função `definePermissions` fornece um padrão de construção (builder) para criar regras de permissão. Essa abordagem facilita definir e compreender a lógica de controle de acesso da sua aplicação de forma declarativa e legível.

## Uso Básico

O padrão mais comum é definir quais ações um determinado papel pode realizar sobre um recurso (subject):

```typescript
import { definePermissions } from '@jay-js/system/guard';

// Define permissões básicas para o usuário
const userPermissions = definePermissions('user', 'articles')
  .allow('read')                // Usuários podem ler artigos
  .forbid(['edit', 'delete'])   // Usuários não podem editar ou deletar artigos
  .save();
```

## Múltiplos Papéis e Ações

Você pode aplicar as mesmas permissões a vários papéis passando um array de papéis:

```typescript
// Aplica as mesmas permissões a vários papéis
const staffPermissions = definePermissions(['editor', 'contributor'], 'articles')
  .allow(['read', 'create', 'edit'])
  .forbid('delete')
  .save();
```

Da mesma forma, você pode permitir ou proibir várias ações de uma vez:

```typescript
const adminPermissions = definePermissions('admin', 'users')
  .allow(['read', 'create', 'edit', 'delete'])
  .save();
```

## Atributos de Permissão

Atributos oferecem uma forma de aplicar permissões condicionais, como limitar o usuário a operar apenas sobre seus próprios recursos:

```typescript
// Usuários só podem editar e deletar seus próprios artigos
const authorPermissions = definePermissions('author', 'articles')
  .allow('read')                               // Pode ler qualquer artigo
  .allow(['edit', 'delete'], ['own'])          // Só pode editar/deletar artigos próprios
  .forbid(['publish', 'feature'])              // Não pode publicar ou destacar artigos
  .save();
```

Ao verificar permissões com atributos, você precisa informar o atributo relevante:

```typescript
// Verifica se um autor pode editar seu próprio artigo
const canEditOwn = hasPermission(authorPermissions, 'author', 'articles', 'edit', 'own');
if (canEditOwn.granted) {
  // Permite a edição do próprio artigo
}
```

## Precedência de Permissões

Ao definir permissões, lembre-se de que regras de proibição (`forbid`) têm precedência sobre regras de permissão (`allow`). Isso significa que se você permitir e também proibir a mesma ação para um papel, a proibição vence:

```typescript
const moderatorPermissions = definePermissions('moderator', 'comments')
  .allow(['read', 'approve', 'edit', 'delete'])
  .forbid('delete')  // Isto sobrescreve a permissão de 'delete'
  .save();

// Retornará { granted: false }
const canDelete = hasPermission(moderatorPermissions, 'moderator', 'comments', 'delete');
```

## Encadeando Definições de Permissão

Você pode encadear múltiplas chamadas de `allow` e `forbid` para construir um conjunto complexo de permissões:

```typescript
const editorPermissions = definePermissions('editor', 'articles')
  .allow(['read', 'create'])
  .allow('edit', ['own', 'draft'])
  .allow('publish', ['own'])
  .forbid('delete')
  .forbid('feature')
  .save();
```

## Salvando e Usando Permissões

O método `save()` retorna um array de objetos de permissão que você pode passar para outras funções como `hasPermission` ou combinar com outros conjuntos de permissões:

```typescript
// Define permissões para diferentes funcionalidades
const articlePermissions = definePermissions('user', 'articles')
  .allow('read')
  .save();

const commentPermissions = definePermissions('user', 'comments')
  .allow(['read', 'create'])
  .save();

// Combina permissões e usa na aplicação
import { combinePermissions, hasPermission } from '@jay-js/system/guard';

const allPermissions = combinePermissions(articlePermissions, commentPermissions);

function showArticle(articleId) {
  const canReadArticles = hasPermission(allPermissions, 'user', 'articles', 'read');
  if (canReadArticles.granted) {
    fetchAndDisplayArticle(articleId);
  } else {
    showAccessDenied();
  }
}
```

No próximo artigo, veremos como verificar permissões usando a função `hasPermission`.