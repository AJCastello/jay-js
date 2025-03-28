---
category: Access Control
categoryId: 5
articleId: 3
slug: guard-check
title: Checking Permissions
description: Learn how to check if a role has permission to perform actions using the hasPermission function.
---

# Checking Permissions

## API Reference

### hasPermission

```typescript
// Function signature
function hasPermission(
  permissions: TPermission[],
  role: string,
  subject: string,
  action: string,
  attribute?: string
): THasPermission;

// Return type
interface THasPermission {
  granted: boolean;
  attributes?: string[];
}

// Example usage
const result = hasPermission(permissions, 'editor', 'articles', 'edit');
if (result.granted) {
  // User has permission to edit articles
}
```

### Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `permissions` | `TPermission[]` | Array of permission objects to check against |
| `role` | `string` | The role to check permissions for |
| `subject` | `string` | The subject to check permissions on |
| `action` | `string` | The action to check permission for |
| `attribute` | `string` (optional) | Optional attribute to check permission for |

### Return Value

| Property | Type | Description |
|----------|------|-------------|
| `granted` | `boolean` | Whether the permission is granted (`true`) or denied (`false`) |
| `attributes` | `string[]` (optional) | Available attributes for the permission, if any |

## Overview

The `hasPermission` function checks if a specific role has permission to perform an action on a subject. It evaluates all relevant permission rules and returns an object with the permission status and any applicable attributes.

## Basic Permission Checking

To check if a role has permission to perform an action:

```typescript
import { definePermissions, hasPermission } from '@jay-js/system/guard';

// Define some permissions
const userPermissions = definePermissions('user', 'articles')
  .allow('read')
  .forbid(['edit', 'delete'])
  .save();

// Check if a user can read articles
const canRead = hasPermission(userPermissions, 'user', 'articles', 'read');
if (canRead.granted) {
  // User can read articles
  showArticleContent();
} else {
  // User cannot read articles
  showAccessDenied();
}

// Check if a user can edit articles
const canEdit = hasPermission(userPermissions, 'user', 'articles', 'edit');
if (!canEdit.granted) {
  // User cannot edit articles
  hideEditButton();
}
```

## Permission Evaluation Rules

The `hasPermission` function follows these rules when evaluating permissions:

1. It identifies all permission entries that match the specified role, subject, and action
2. If any matching permission explicitly forbids the action (has `granted: false`), the function returns `{ granted: false }`
3. If any matching permission allows the action (has `granted: true`) and no forbidding permissions are found, the function returns `{ granted: true }`
4. If no matching permissions are found, the function returns `{ granted: false }`

This means that explicit deny rules take precedence over allow rules, ensuring that when you specifically forbid an action, it will always be denied regardless of any other allow rules.

## Checking Permissions with Attributes

When permissions include attributes, you can check for a specific attribute:

```typescript
// Define permissions with attributes
const authorPermissions = definePermissions('author', 'articles')
  .allow('read')
  .allow(['edit', 'delete'], ['own'])  // Can only edit/delete own articles
  .save();

// Check if an author can edit their own article
const canEditOwn = hasPermission(authorPermissions, 'author', 'articles', 'edit', 'own');
if (canEditOwn.granted) {
  // Author can edit their own article
  enableEditMode();
}

// Check if an author can edit any article
const canEditAny = hasPermission(authorPermissions, 'author', 'articles', 'edit', 'any');
if (!canEditAny.granted) {
  // Author cannot edit articles they don't own
  showPermissionError('You can only edit your own articles');
}
```

When checking with attributes:
1. If the permission has attributes and the attribute parameter is provided, the function checks if the requested attribute is included in the allowed attributes
2. If the permission has attributes but no attribute parameter is provided, the function returns all available attributes in the result
3. If the permission has no attributes, the function simply returns the granted status

## Accessing Available Attributes

When permissions include attributes, the `hasPermission` result includes all available attributes:

```typescript
const editorPermissions = definePermissions('editor', 'articles')
  .allow('edit', ['draft', 'pending', 'own'])
  .save();

const editPermission = hasPermission(editorPermissions, 'editor', 'articles', 'edit');
if (editPermission.granted && editPermission.attributes) {
  console.log('Editor can edit articles with these attributes:', editPermission.attributes);
  // Outputs: "Editor can edit articles with these attributes: ['draft', 'pending', 'own']"
  
  // You can use this to dynamically enable UI elements
  if (editPermission.attributes.includes('draft')) {
    enableDraftEditing();
  }
  
  if (editPermission.attributes.includes('pending')) {
    enablePendingEditing();
  }
}
```

## Practical Usage Patterns

### UI Conditional Rendering

A common use case is to conditionally render UI elements based on permissions:

```typescript
function renderArticleActions(permissions, userRole, article) {
  const actionsContainer = document.getElementById('article-actions');
  actionsContainer.innerHTML = '';
  
  // Check read permission
  const canRead = hasPermission(permissions, userRole, 'articles', 'read');
  if (canRead.granted) {
    const viewButton = document.createElement('button');
    viewButton.textContent = 'View';
    viewButton.onclick = () => viewArticle(article.id);
    actionsContainer.appendChild(viewButton);
  }
  
  // Check edit permission with attributes
  const canEdit = hasPermission(permissions, userRole, 'articles', 'edit', 'own');
  if (canEdit.granted && article.authorId === currentUser.id) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editArticle(article.id);
    actionsContainer.appendChild(editButton);
  }
  
  // Check delete permission
  const canDelete = hasPermission(permissions, userRole, 'articles', 'delete');
  if (canDelete.granted) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteArticle(article.id);
    actionsContainer.appendChild(deleteButton);
  }
}
```

### Function Guards

You can use permissions to guard function execution:

```typescript
function deleteArticle(articleId, userRole, permissions) {
  const canDelete = hasPermission(permissions, userRole, 'articles', 'delete');
  
  if (!canDelete.granted) {
    throw new Error('Permission denied: You cannot delete articles');
  }
  
  // Continue with deletion if permission is granted
  performArticleDeletion(articleId);
}
```

### Middleware for API Routes

In a server environment, you might use permissions as middleware:

```typescript
function permissionMiddleware(permissions) {
  return (req, res, next) => {
    const { role } = req.user;
    const { resource, action } = req.params;
    
    const hasAccess = hasPermission(permissions, role, resource, action);
    
    if (hasAccess.granted) {
      next(); // Continue to the actual route handler
    } else {
      res.status(403).json({ error: 'Permission denied' });
    }
  };
}

// Usage
app.delete('/api/articles/:id',
  permissionMiddleware(articlePermissions),
  (req, res) => {
    // Handle article deletion
  }
);
```

In the next article, we'll explore utility functions for creating and combining permissions. 