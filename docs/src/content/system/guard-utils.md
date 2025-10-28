category: Controle de Acesso
categoryId: 5
articleId: 4
slug: guard-utils
title: Utilitários de Permissão
description: Aprenda sobre funções utilitárias para criar, combinar e gerenciar permissões.
---

# Utilitários de Permissão

## Referência da API

### combinePermissions

```typescript
// Assinatura da função
function combinePermissions(...permissionSets: TPermission[][]): TPermission[];

// Exemplo de uso
const userPermissions = definePermissions('user', 'articles').allow('read').save();
const editorPermissions = definePermissions('editor', 'articles').allow('edit').save();

const allPermissions = combinePermissions(userPermissions, editorPermissions);
```

### createPermission

```typescript
// Assinatura da função
function createPermission(
  role: string | string[],
  subject: string | string[],
  action: string | string[],
  granted: boolean,
  attributes?: string | string[]
): TPermission;

// Exemplo de uso
const viewPermission = createPermission('user', 'articles', 'read', true);
const editPermission = createPermission('editor', 'articles', 'edit', true, 'own');
```

## Visão Geral

O sistema Guard fornece funções utilitárias para ajudar você a criar e combinar permissões de diferentes maneiras. Esses utilitários são especialmente úteis em cenários de permissões dinâmicas ou quando é necessário gerenciar permissões provenientes de múltiplas fontes.

## Combinando Permissões

A função `combinePermissions` permite mesclar múltiplos conjuntos de permissões em um único array. Isso é útil quando:

- As permissões vêm de diferentes partes da aplicação
- Você quer separar permissões por funcionalidade ou módulo
- É necessário juntar permissões de diferentes origens (ex.: baseadas em papéis e baseadas em funcionalidades)

### Uso Básico

```typescript
import { definePermissions, combinePermissions } from '@jay-js/system/guard';

// Define permissões para diferentes papéis
const userPermissions = definePermissions('user', 'articles')
  .allow('read')
  .save();

const editorPermissions = definePermissions('editor', 'articles')
  .allow(['read', 'edit'])
  .save();

const adminPermissions = definePermissions('admin', 'articles')
  .allow(['read', 'edit', 'delete', 'publish'])
  .save();

// Combina todas as permissões em um único array
const allPermissions = combinePermissions(
  userPermissions,
  editorPermissions,
  adminPermissions
);

// Usa as permissões combinadas para verificação
const canPublish = hasPermission(allPermissions, 'admin', 'articles', 'publish');
```

### Mesclando Permissões Baseadas em Funcionalidades

Você pode organizar permissões por funcionalidade e então combiná-las:

```typescript
// Permissões relacionadas a artigos
const articlePermissions = combinePermissions(
  definePermissions('user', 'articles').allow('read').save(),
  definePermissions('editor', 'articles').allow(['read', 'edit']).save(),
  definePermissions('admin', 'articles').allow(['read', 'edit', 'delete']).save()
);

// Permissões relacionadas a comentários
const commentPermissions = combinePermissions(
  definePermissions('user', 'comments').allow(['read', 'create']).save(),
  definePermissions('editor', 'comments').allow(['read', 'create', 'edit']).save(),
  definePermissions('admin', 'comments').allow(['read', 'create', 'edit', 'delete']).save()
);

// Permissões relacionadas a usuários
const userPermissions = combinePermissions(
  definePermissions('admin', 'users').allow(['read', 'create', 'edit', 'delete']).save()
);

// Combina todas as permissões de funcionalidades em um único array
const applicationPermissions = combinePermissions(
  articlePermissions,
  commentPermissions,
  userPermissions
);
```

## Criando Permissões Individuais

A função `createPermission` oferece uma maneira direta de criar objetos de permissão sem usar o padrão de builder. Isso é útil para:

- Criação dinâmica de permissões
- Geração programática de permissões
- Simplificar a criação quando você precisa apenas de uma única regra

### Uso Básico

```typescript
import { createPermission, hasPermission } from '@jay-js/system/guard';

// Cria permissões individuais
const readPermission = createPermission('user', 'articles', 'read', true);
const editPermission = createPermission('editor', 'articles', 'edit', true);
const deletePermission = createPermission('admin', 'articles', 'delete', true);

// Combina em um array
const permissions = [readPermission, editPermission, deletePermission];

// Verifica permissões
const canUserRead = hasPermission(permissions, 'user', 'articles', 'read');
if (canUserRead.granted) {
  // Usuário pode ler artigos
}
```

### Suporte a Múltiplos Valores

Todos os parâmetros que aceitam arrays podem ser usados com múltiplos valores:

```typescript
// Permissão para múltiplos papéis
const viewDashboardPermission = createPermission(
  ['admin', 'manager', 'analyst'],
  'dashboard',
  'view',
  true
);

// Permissão para múltiplos assuntos (subjects)
const manageContentPermission = createPermission(
  'editor',
  ['articles', 'pages', 'media'],
  'edit',
  true
);

// Permissão para múltiplas ações
const contentAdminPermission = createPermission(
  'content-admin',
  'content',
  ['create', 'read', 'update', 'delete'],
  true
);
```

### Adicionando Atributos

Você pode adicionar atributos para limitar o escopo das permissões:

```typescript
// Permissão limitada a recursos 'own' (próprios)
const editOwnArticlesPermission = createPermission(
  'writer',
  'articles',
  'edit',
  true,
  'own'
);

// Permissão com múltiplos atributos
const moderationPermission = createPermission(
  'moderator',
  'comments',
  'moderate',
  true,
  ['flagged', 'reported', 'new']
);
```

## Geração Dinâmica de Permissões

Essas funções utilitárias são particularmente úteis para gerar permissões dinamicamente:

```typescript
function generateRolePermissions(role, permissionConfig) {
  const permissions = [];

  for (const [subject, actions] of Object.entries(permissionConfig)) {
    for (const action of Object.keys(actions)) {
      const { granted, attributes } = actions[action];

      permissions.push(
        createPermission(role, subject, action, granted, attributes)
      );
    }
  }

  return permissions;
}

// Uso
const editorConfig = {
  articles: {
    read: { granted: true },
    create: { granted: true },
    edit: { granted: true, attributes: ['own', 'draft'] },
    delete: { granted: false }
  },
  comments: {
    read: { granted: true },
    moderate: { granted: true, attributes: ['flagged'] }
  }
};

const editorPermissions = generateRolePermissions('editor', editorConfig);
```

## Carregando Permissões de Fontes Externas

As funções utilitárias facilitam carregar permissões a partir de arquivos de configuração ou bancos de dados:

```typescript
async function loadPermissionsFromDatabase() {
  // Fetch permission records from database
  const records = await db.query('SELECT role, subject, action, granted, attributes FROM permissions');

  // Convert records to permission objects
  const permissions = records.map(record => {
    const { role, subject, action, granted, attributes } = record;
    return createPermission(
      role,
      subject,
      action,
      granted === 1, // Convert to boolean
      attributes ? JSON.parse(attributes) : undefined
    );
  });

  return permissions;
}

// Uso
const dbPermissions = await loadPermissionsFromDatabase();
const configPermissions = loadPermissionsFromConfig();

// Combina todas as fontes de permissão
const allPermissions = combinePermissions(dbPermissions, configPermissions);
```

## Trabalhando com Grupos de Permissões

Você pode criar grupos lógicos de permissões para diferentes aspectos da sua aplicação:

```typescript
// Permissões base que todos usuários autenticados possuem
const basePermissions = [
  createPermission('user', 'profile', 'read', true),
  createPermission('user', 'profile', 'edit', true, 'own'),
  createPermission('user', 'settings', ['read', 'update'], true)
];

// Permissões específicas de funcionalidade
const forumPermissions = [
  createPermission('user', 'topics', ['read', 'create'], true),
  createPermission('user', 'posts', ['read', 'create'], true),
  createPermission('user', 'posts', ['edit', 'delete'], true, 'own')
];

// Permissões de funcionalidades premium
const premiumPermissions = [
  createPermission('premium', 'exclusiveContent', 'access', true),
  createPermission('premium', 'downloads', 'unlimited', true)
];

// Combina as permissões relevantes com base no status do usuário
function getUserPermissions(user) {
  const permissions = [...basePermissions];

  if (user.forumAccess) {
    permissions.push(...forumPermissions);
  }

  if (user.subscription === 'premium') {
    permissions.push(...premiumPermissions);
  }

  return permissions;
}

// Uso
const userPermissions = getUserPermissions(currentUser);
```

No próximo artigo, veremos exemplos reais de implementação de controle de acesso usando o sistema Guard.