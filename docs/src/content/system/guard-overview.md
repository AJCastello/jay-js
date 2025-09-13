---
category: Controle de Acesso
categoryId: 5
articleId: 1
slug: guard-overview
title: Visão Geral do Sistema Guard
description: Introdução ao sistema de controle de acesso Guard para gerenciamento de permissões baseadas em papéis.
---

# Visão Geral do Sistema Guard

## Referência da API

### Funções Principais

```typescript
// Define permissões para um papel (role) e um recurso (subject)
const permissions = definePermissions(role, subject)
  .allow(actions)
  .forbid(actions)
  .save();

// Verifica se um papel possui a permissão
const result = hasPermission(permissions, role, subject, action);
if (result.granted) {
  // Permissão concedida
}
```

### Funções Utilitárias

```typescript
// Combina múltiplos conjuntos de permissões
const allPermissions = combinePermissions(
  rolePermissions,
  featurePermissions
);

// Cria uma permissão individual
const permission = createPermission(role, subject, action, granted);
```

## Visão Geral

O módulo Guard fornece um sistema flexível de gerenciamento de permissões para implementar controle de acesso em suas aplicações. Ele oferece uma API simples porém poderosa para definir permissões, verificar acesso e gerenciar segurança baseada em papéis (RBAC).

Principais recursos incluem:
- Definição de permissões baseada em papéis
- Regras específicas por recurso (subject) e ação
- Controle refinado por atributos
- Verificação de permissões flexível

## Conceitos Básicos

O sistema Guard é construído sobre estes conceitos centrais:

### Papéis (Roles)

Papéis representam diferentes tipos de usuários ou entidades no sistema. Exemplos:
- `admin`
- `editor`
- `user`
- `guest`

### Recursos (Subjects)

Subjects (recursos) são as entidades às quais as permissões se aplicam. Exemplos:
- `articles`
- `users`
- `settings`
- `payments`

### Ações

Ações são operações que podem ser realizadas sobre recursos. Exemplos comuns:
- `read`
- `create`
- `update`
- `delete`

### Atributos

Qualificadores opcionais que restringem ainda mais as permissões, como:
- `own` (only the user's own resources)
- `published` (only published resources)
- `premium` (only premium features)

## Estrutura de Permissão

Permissões são definidas como regras que especificam se um papel tem ou não autorização para executar uma ação sobre um recurso. Cada permissão inclui:

- `role`: Papel(is) aos quais a permissão se aplica
- `subject`: Recurso(s) aos quais a permissão se aplica
- `action`: Ação(ões) permitidas ou negadas
- `granted`: Indica se a ação é permitida (true) ou negada (false)
- `attributes`: Qualificadores opcionais que restringem a permissão

## Iniciando

Para começar a usar o sistema Guard, primeiro defina permissões para diferentes papéis e depois verifique essas permissões ao acessar funcionalidades ou recursos protegidos:

```typescript
import { definePermissions, hasPermission } from '@jay-js/system/guard';

// Define permissões
const editorPermissions = definePermissions('editor', 'articles')
  .allow(['read', 'create', 'update'])
  .forbid('delete')
  .save();

// Verifica permissões na aplicação
function editArticle(articleId) {
  const canEdit = hasPermission(editorPermissions, 'editor', 'articles', 'update');

  if (canEdit.granted) {
  // Permite edição
    showEditor(articleId);
  } else {
  // Mostra mensagem de acesso negado
  showErrorMessage('Você não tem permissão para editar artigos');
  }
}
```

Nos próximos artigos, exploraremos cada aspecto do sistema Guard em detalhe e demonstraremos padrões de uso avançados.