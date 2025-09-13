---
category: Access Control
categoryId: 5
articleId: 3
slug: guard-check
title: Verificando Permissões
description: Aprenda como verificar se um papel (role) tem permissão para executar ações usando a função hasPermission.
---

# Verificando Permissões

## Referência da API

### hasPermission

```typescript
// Assinatura da função
function hasPermission(
  permissions: TPermission[],
  role: string,
  subject: string,
  action: string,
  attribute?: string
): THasPermission;

// Tipo de retorno
interface THasPermission {
  granted: boolean;
  attributes?: string[];
}

// Exemplo de uso
const result = hasPermission(permissions, 'editor', 'articles', 'edit');
if (result.granted) {
  // User has permission to edit articles
}
```

### Parâmetros

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| `permissions` | `TPermission[]` | Array de objetos de permissão contra os quais será feita a verificação |
| `role` | `string` | O papel (role) para o qual as permissões serão verificadas |
| `subject` | `string` | O assunto (recurso) sobre o qual a permissão será verificada |
| `action` | `string` | A ação para a qual se deseja verificar a permissão |
| `attribute` | `string` (opcional) | Atributo opcional para verificação específica |

### Valor de Retorno

| Propriedade | Tipo | Descrição |
|-------------|------|-----------|
| `granted` | `boolean` | Indica se a permissão foi concedida (`true`) ou negada (`false`) |
| `attributes` | `string[]` (opcional) | Atributos disponíveis para a permissão, se houver |

## Visão Geral

A função `hasPermission` verifica se um papel (role) específico tem permissão para executar uma ação sobre um determinado assunto (subject). Ela avalia todas as regras de permissão relevantes e retorna um objeto com o status da permissão e quaisquer atributos aplicáveis.

## Verificação Básica de Permissão

Para verificar se um papel tem permissão para realizar uma ação:

```typescript
import { definePermissions, hasPermission } from '@jay-js/system/guard';

// Definindo algumas permissões
const userPermissions = definePermissions('user', 'articles')
  .allow('read')
  .forbid(['edit', 'delete'])
  .save();

// Verificar se um usuário pode ler artigos
const canRead = hasPermission(userPermissions, 'user', 'articles', 'read');
if (canRead.granted) {
  // Usuário pode ler artigos
  showArticleContent();
} else {
  // Usuário não pode ler artigos
  showAccessDenied();
}

// Verificar se um usuário pode editar artigos
const canEdit = hasPermission(userPermissions, 'user', 'articles', 'edit');
if (!canEdit.granted) {
  // Usuário não pode editar artigos
  hideEditButton();
}
```

## Regras de Avaliação de Permissões

A função `hasPermission` segue estas regras ao avaliar permissões:

1. Identifica todas as entradas de permissão que correspondem ao papel (role), assunto (subject) e ação especificados
2. Se qualquer permissão correspondente proibir explicitamente a ação (possuir `granted: false`), a função retorna `{ granted: false }`
3. Se alguma permissão correspondente permitir a ação (possuir `granted: true`) e não houver permissões proibitivas, a função retorna `{ granted: true }`
4. Se nenhuma permissão correspondente for encontrada, a função retorna `{ granted: false }`

Isso significa que regras de negação explícita têm precedência sobre regras de permissão, garantindo que, quando você proíbe especificamente uma ação, ela será sempre negada independentemente de outras regras que a permitam.

## Verificando Permissões com Atributos

Quando permissões incluem atributos, você pode verificar um atributo específico:

```typescript
// Definindo permissões com atributos
const authorPermissions = definePermissions('author', 'articles')
  .allow('read')
  .allow(['edit', 'delete'], ['own'])  // Só pode editar/apagar artigos próprios
  .save();

// Verificar se um autor pode editar seu próprio artigo
const canEditOwn = hasPermission(authorPermissions, 'author', 'articles', 'edit', 'own');
if (canEditOwn.granted) {
  // Autor pode editar seu próprio artigo
  enableEditMode();
}

// Verificar se um autor pode editar qualquer artigo
const canEditAny = hasPermission(authorPermissions, 'author', 'articles', 'edit', 'any');
if (!canEditAny.granted) {
  // Autor não pode editar artigos que não lhe pertencem
  showPermissionError('You can only edit your own articles');
}
```

Ao verificar com atributos:
1. Se a permissão possui atributos e o parâmetro `attribute` é fornecido, a função checa se o atributo solicitado está incluído na lista de atributos permitidos
2. Se a permissão possui atributos mas nenhum parâmetro `attribute` é fornecido, a função retorna todos os atributos disponíveis no resultado
3. Se a permissão não possui atributos, a função retorna apenas o status `granted`

## Acessando Atributos Disponíveis

Quando permissões incluem atributos, o resultado de `hasPermission` inclui todos os atributos disponíveis:

```typescript
const editorPermissions = definePermissions('editor', 'articles')
  .allow('edit', ['draft', 'pending', 'own'])
  .save();

const editPermission = hasPermission(editorPermissions, 'editor', 'articles', 'edit');
if (editPermission.granted && editPermission.attributes) {
  console.log('Editor can edit articles with these attributes:', editPermission.attributes);
  // Outputs: "Editor can edit articles with these attributes: ['draft', 'pending', 'own']"

  // Você pode usar isto para habilitar dinamicamente elementos de UI
  if (editPermission.attributes.includes('draft')) {
    enableDraftEditing();
  }

  if (editPermission.attributes.includes('pending')) {
    enablePendingEditing();
  }
}
```

## Padrões Práticos de Uso

### Renderização Condicional de UI

Um caso comum é renderizar elementos de interface condicionalmente com base nas permissões:

```typescript
function renderArticleActions(permissions, userRole, article) {
  const actionsContainer = document.getElementById('article-actions');
  actionsContainer.innerHTML = '';

  // Verificar permissão de leitura
  const canRead = hasPermission(permissions, userRole, 'articles', 'read');
  if (canRead.granted) {
    const viewButton = document.createElement('button');
  viewButton.textContent = 'Visualizar';
    viewButton.onclick = () => viewArticle(article.id);
    actionsContainer.appendChild(viewButton);
  }

  // Verificar permissão de edição com atributos
  const canEdit = hasPermission(permissions, userRole, 'articles', 'edit', 'own');
  if (canEdit.granted && article.authorId === currentUser.id) {
    const editButton = document.createElement('button');
  editButton.textContent = 'Editar';
    editButton.onclick = () => editArticle(article.id);
    actionsContainer.appendChild(editButton);
  }

  // Verificar permissão de exclusão
  const canDelete = hasPermission(permissions, userRole, 'articles', 'delete');
  if (canDelete.granted) {
    const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Excluir';
    deleteButton.onclick = () => deleteArticle(article.id);
    actionsContainer.appendChild(deleteButton);
  }
}
```

### Guardas de Função

Você pode usar permissões para proteger a execução de funções:

```typescript
function deleteArticle(articleId, userRole, permissions) {
  const canDelete = hasPermission(permissions, userRole, 'articles', 'delete');

  if (!canDelete.granted) {
    throw new Error('Permission denied: You cannot delete articles');
  }

  // Prosseguir com a exclusão se a permissão for concedida
  performArticleDeletion(articleId);
}
```

### Middleware para Rotas de API

Em um ambiente de servidor, você pode usar permissões como middleware:

```typescript
function permissionMiddleware(permissions) {
  return (req, res, next) => {
    const { role } = req.user;
    const { resource, action } = req.params;

    const hasAccess = hasPermission(permissions, role, resource, action);

    if (hasAccess.granted) {
  next(); // Continuar para o handler real da rota
    } else {
  res.status(403).json({ error: 'Permissão negada' });
    }
  };
}

// Uso
app.delete('/api/articles/:id',
  permissionMiddleware(articlePermissions),
  (req, res) => {
  // Lógica de exclusão do artigo
  }
);
```

No próximo artigo, exploraremos funções utilitárias para criar e combinar permissões.