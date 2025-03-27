---
category: Access Control
categoryId: 3
articleId: 2
slug: guard-define
title: Defining Permissions
description: Learn how to define permissions using the definePermissions function for role-based access control.
---

# Defining Permissions

## API Reference

### definePermissions

```typescript
// Function signature
function definePermissions(role: string | string[], subject: string): TDefinePermission;

// Return type interface
interface TDefinePermission {
  allow(action: string | string[], attributes?: string[]): TDefinePermission;
  forbid(action: string | string[], attributes?: string[]): TDefinePermission;
  save(): TPermission[];
}

// Usage examples
const userPermissions = definePermissions('user', 'articles')
  .allow(['read', 'comment'])
  .forbid(['edit', 'delete'])
  .save();

const adminPermissions = definePermissions(['admin', 'superAdmin'], 'articles')
  .allow(['read', 'comment', 'edit', 'delete', 'publish'])
  .save();
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `role` | `string \| string[]` | The role or roles that the permissions apply to |
| `subject` | `string` | The subject the permissions apply to |

### Methods

| Method | Parameters | Description |
|--------|------------|-------------|
| `allow` | `action: string \| string[], attributes?: string[]` | Adds a permission rule to allow the specified actions |
| `forbid` | `action: string \| string[], attributes?: string[]` | Adds a permission rule to forbid the specified actions |
| `save` | None | Returns the array of defined permission objects |

## Overview

The `definePermissions` function provides a builder pattern for creating permission rules. This approach makes it easy to define and understand your application's access control logic in a declarative way.

## Basic Usage

The most common pattern is to define what actions a specific role can perform on a subject:

```typescript
import { definePermissions } from '@jay-js/system/guard';

// Define basic user permissions
const userPermissions = definePermissions('user', 'articles')
  .allow('read')                // Users can read articles
  .forbid(['edit', 'delete'])   // Users cannot edit or delete articles
  .save();
```

## Multiple Roles and Actions

You can apply the same permissions to multiple roles by passing an array of roles:

```typescript
// Apply same permissions to multiple roles
const staffPermissions = definePermissions(['editor', 'contributor'], 'articles')
  .allow(['read', 'create', 'edit'])
  .forbid('delete')
  .save();
```

Similarly, you can allow or forbid multiple actions at once:

```typescript
const adminPermissions = definePermissions('admin', 'users')
  .allow(['read', 'create', 'edit', 'delete'])
  .save();
```

## Permission Attributes

Attributes provide a way to apply conditional permissions, such as limiting users to only operate on their own resources:

```typescript
// Users can only edit and delete their own articles
const authorPermissions = definePermissions('author', 'articles')
  .allow('read')                               // Can read any article
  .allow(['edit', 'delete'], ['own'])          // Can only edit/delete own articles
  .forbid(['publish', 'feature'])              // Cannot publish or feature articles
  .save();
```

When checking permissions with attributes, you'll need to specify the relevant attribute:

```typescript
// Check if an author can edit their own article
const canEditOwn = hasPermission(authorPermissions, 'author', 'articles', 'edit', 'own');
if (canEditOwn.granted) {
  // Allow editing of own article
}
```

## Permission Precedence

When defining permissions, be aware that forbid rules take precedence over allow rules. This means that if you both allow and forbid the same action for a role, the forbid rule will win:

```typescript
const moderatorPermissions = definePermissions('moderator', 'comments')
  .allow(['read', 'approve', 'edit', 'delete'])
  .forbid('delete')  // This overrides the allow rule for 'delete'
  .save();

// This will return { granted: false }
const canDelete = hasPermission(moderatorPermissions, 'moderator', 'comments', 'delete');
```

## Chaining Permission Definitions

You can chain multiple `allow` and `forbid` calls to build up a complex permission set:

```typescript
const editorPermissions = definePermissions('editor', 'articles')
  .allow(['read', 'create'])
  .allow('edit', ['own', 'draft'])
  .allow('publish', ['own'])
  .forbid('delete')
  .forbid('feature')
  .save();
```

## Saving and Using Permissions

The `save()` method returns an array of permission objects that you can pass to other functions like `hasPermission` or combine with other permission sets:

```typescript
// Define permissions for different features
const articlePermissions = definePermissions('user', 'articles')
  .allow('read')
  .save();

const commentPermissions = definePermissions('user', 'comments')
  .allow(['read', 'create'])
  .save();

// Combine permissions and use them in your application
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

In the next article, we'll explore how to check permissions using the `hasPermission` function. 