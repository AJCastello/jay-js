---
category: Access Control
categoryId: 5
articleId: 4
slug: guard-utils
title: Permission Utilities
description: Learn about utility functions for creating, combining, and managing permissions.
---

# Permission Utilities

## API Reference

### combinePermissions

```typescript
// Function signature
function combinePermissions(...permissionSets: TPermission[][]): TPermission[];

// Example usage
const userPermissions = definePermissions('user', 'articles').allow('read').save();
const editorPermissions = definePermissions('editor', 'articles').allow('edit').save();

const allPermissions = combinePermissions(userPermissions, editorPermissions);
```

### createPermission

```typescript
// Function signature
function createPermission(
  role: string | string[],
  subject: string | string[],
  action: string | string[],
  granted: boolean,
  attributes?: string | string[]
): TPermission;

// Example usage
const viewPermission = createPermission('user', 'articles', 'read', true);
const editPermission = createPermission('editor', 'articles', 'edit', true, 'own');
```

## Overview

The Guard system provides utility functions to help you create and combine permissions in different ways. These utilities are especially useful for more dynamic permission scenarios or when managing permissions from multiple sources.

## Combining Permissions

The `combinePermissions` function allows you to merge multiple sets of permissions into a single array. This is useful when:

- Permissions come from different parts of your application
- You want to separate permissions by feature or module
- You need to merge permissions from different sources (e.g., role-based and feature-based)

### Basic Usage

```typescript
import { definePermissions, combinePermissions } from '@jay-js/system/guard';

// Define permissions for different roles
const userPermissions = definePermissions('user', 'articles')
  .allow('read')
  .save();

const editorPermissions = definePermissions('editor', 'articles')
  .allow(['read', 'edit'])
  .save();

const adminPermissions = definePermissions('admin', 'articles')
  .allow(['read', 'edit', 'delete', 'publish'])
  .save();

// Combine all permissions into a single array
const allPermissions = combinePermissions(
  userPermissions,
  editorPermissions,
  adminPermissions
);

// Use the combined permissions for checking
const canPublish = hasPermission(allPermissions, 'admin', 'articles', 'publish');
```

### Merging Feature-based Permissions

You can organize permissions by feature and then combine them:

```typescript
// Article-related permissions
const articlePermissions = combinePermissions(
  definePermissions('user', 'articles').allow('read').save(),
  definePermissions('editor', 'articles').allow(['read', 'edit']).save(),
  definePermissions('admin', 'articles').allow(['read', 'edit', 'delete']).save()
);

// Comment-related permissions
const commentPermissions = combinePermissions(
  definePermissions('user', 'comments').allow(['read', 'create']).save(),
  definePermissions('editor', 'comments').allow(['read', 'create', 'edit']).save(),
  definePermissions('admin', 'comments').allow(['read', 'create', 'edit', 'delete']).save()
);

// User-related permissions
const userPermissions = combinePermissions(
  definePermissions('admin', 'users').allow(['read', 'create', 'edit', 'delete']).save()
);

// Combine all feature permissions into one array
const applicationPermissions = combinePermissions(
  articlePermissions,
  commentPermissions,
  userPermissions
);
```

## Creating Individual Permissions

The `createPermission` function provides a direct way to create permission objects without using the builder pattern. This is useful for:

- Dynamic permission creation
- Programmatically generating permissions
- Simplifying permission creation when you only need a single rule

### Basic Usage

```typescript
import { createPermission, hasPermission } from '@jay-js/system/guard';

// Create individual permissions
const readPermission = createPermission('user', 'articles', 'read', true);
const editPermission = createPermission('editor', 'articles', 'edit', true);
const deletePermission = createPermission('admin', 'articles', 'delete', true);

// Combine them into an array
const permissions = [readPermission, editPermission, deletePermission];

// Check permissions
const canUserRead = hasPermission(permissions, 'user', 'articles', 'read');
if (canUserRead.granted) {
  // User can read articles
}
```

### Supporting Multiple Values

All parameters that accept arrays can be used with multiple values:

```typescript
// Permission for multiple roles
const viewDashboardPermission = createPermission(
  ['admin', 'manager', 'analyst'],
  'dashboard',
  'view',
  true
);

// Permission for multiple subjects
const manageContentPermission = createPermission(
  'editor',
  ['articles', 'pages', 'media'],
  'edit',
  true
);

// Permission for multiple actions
const contentAdminPermission = createPermission(
  'content-admin',
  'content',
  ['create', 'read', 'update', 'delete'],
  true
);
```

### Adding Attributes

You can add attributes to limit the scope of permissions:

```typescript
// Permission limited to 'own' resources
const editOwnArticlesPermission = createPermission(
  'writer',
  'articles',
  'edit',
  true,
  'own'
);

// Permission with multiple attributes
const moderationPermission = createPermission(
  'moderator',
  'comments',
  'moderate',
  true,
  ['flagged', 'reported', 'new']
);
```

## Dynamic Permission Generation

These utility functions are particularly useful for generating permissions dynamically:

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

// Usage
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

## Loading Permissions from External Sources

The utility functions make it easy to load permissions from configuration files or databases:

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

// Usage
const dbPermissions = await loadPermissionsFromDatabase();
const configPermissions = loadPermissionsFromConfig();

// Combine all permission sources
const allPermissions = combinePermissions(dbPermissions, configPermissions);
```

## Working with Permission Groups

You can create logical groups of permissions for different aspects of your application:

```typescript
// Base permissions that all authenticated users have
const basePermissions = [
  createPermission('user', 'profile', 'read', true),
  createPermission('user', 'profile', 'edit', true, 'own'),
  createPermission('user', 'settings', ['read', 'update'], true)
];

// Feature-specific permissions
const forumPermissions = [
  createPermission('user', 'topics', ['read', 'create'], true),
  createPermission('user', 'posts', ['read', 'create'], true),
  createPermission('user', 'posts', ['edit', 'delete'], true, 'own')
];

// Premium feature permissions
const premiumPermissions = [
  createPermission('premium', 'exclusiveContent', 'access', true),
  createPermission('premium', 'downloads', 'unlimited', true)
];

// Combine all relevant permissions based on user status
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

// Usage
const userPermissions = getUserPermissions(currentUser);
```

In the next article, we'll look at real-world examples of implementing access control using the Guard system. 