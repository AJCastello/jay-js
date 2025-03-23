# Guard - Access Control System

A flexible role-based access control and permission management system for JavaScript applications.

## Table of Contents
- [Overview](#overview)
- [Installation](#installation)
- [Basic Usage](#basic-usage)
- [API Reference](#api-reference)
  - [Core Functions](#core-functions)
  - [Utility Functions](#utility-functions)
  - [Types](#types)
- [Examples](#examples)
  - [Simple Role-based Permissions](#simple-role-based-permissions)
  - [Complex Permission Rules](#complex-permission-rules)
  - [Combining Permissions](#combining-permissions)
- [Advanced Usage](#advanced-usage)
  - [Resource-specific Permissions](#resource-specific-permissions)
  - [Integration with Authentication](#integration-with-authentication)

## Overview

The Guard module provides a comprehensive permission management system for implementing robust access control in your applications. It offers a flexible permission definition API, role-based access control, and precise permission checking.

## Installation

```bash
npm install @jay-js/system
```

## Basic Usage

Here's a simple example of how to use the guard system:

```typescript
import { definePermissions, hasPermission } from '@jay-js/system/guard';

// Define permissions for the 'admin' role on 'articles'
const adminPermissions = definePermissions('admin', 'articles')
  .allow(['read', 'write', 'delete'])
  .save();

// Define permissions for the 'editor' role
const editorPermissions = definePermissions('editor', 'articles')
  .allow(['read', 'write'])
  .forbid('delete')
  .save();

// Check if an admin can delete articles
const canDelete = hasPermission(adminPermissions, 'admin', 'articles', 'delete');
if (canDelete.granted) {
  // Admin can delete articles
  deleteArticle(articleId);
}

// Check if an editor can delete articles
const editorCanDelete = hasPermission(editorPermissions, 'editor', 'articles', 'delete');
if (!editorCanDelete.granted) {
  // Editor cannot delete articles
  hideDeleteButton();
}
```

## API Reference

### Core Functions

#### `definePermissions`

Defines permissions for a role and subject.

```typescript
function definePermissions(role: string | string[], subject: string): TDefinePermission;

// Example
const userPermissions = definePermissions('user', 'articles')
  .allow(['read', 'comment'])
  .forbid(['edit', 'delete'])
  .save();
```

#### `hasPermission`

Checks if a role has permission to perform an action on a subject.

```typescript
function hasPermission(
  permissions: TPermission[],
  role: string,
  subject: string,
  action: string,
  attribute?: string
): THasPermission;

// Example
const result = hasPermission(userPermissions, 'user', 'articles', 'read');
if (result.granted) {
  // User can read articles
}
```

### Utility Functions

#### `combinePermissions`

Combines multiple permission arrays into a single array.

```typescript
function combinePermissions(...permissionSets: TPermission[][]): TPermission[];

// Example
const rolePermissions = definePermissions('user', 'articles').allow('read').save();
const featurePermissions = definePermissions('user', 'beta-features').allow('access').save();

const allPermissions = combinePermissions(rolePermissions, featurePermissions);
```

#### `createPermission`

Creates a permission object for a single permission rule.

```typescript
function createPermission(
  role: string | string[],
  subject: string | string[],
  action: string | string[],
  granted: boolean,
  attributes?: string | string[]
): TPermission;

// Example
const viewArticlesPermission = createPermission('editor', 'articles', 'view', true);
const deleteArticlesPermission = createPermission('editor', 'articles', 'delete', false);
```

### Types

#### `TPermission`

Represents a permission entry in the guard system.

```typescript
type TPermission = {
  role: string | string[];
  subject: string | string[];
  action: string | string[];
  granted: boolean;
  attributes?: string | string[];
};
```

#### `TDefinePermission`

Interface for the permission definition builder.

```typescript
type TDefinePermission = {
  allow: (action: string | string[], attributes?: string[]) => TDefinePermission;
  forbid: (action: string | string[], attributes?: string[]) => TDefinePermission;
  save: () => TPermission[];
};
```

#### `THasPermission`

Result of a permission check.

```typescript
type THasPermission = {
  granted: boolean;
  attributes?: string[];
};
```

## Examples

### Simple Role-based Permissions

```typescript
import { definePermissions, hasPermission, combinePermissions } from '@jay-js/system/guard';

// Define different role permissions
const adminPermissions = definePermissions('admin', 'dashboard')
  .allow(['view', 'manage', 'configure'])
  .save();

const moderatorPermissions = definePermissions('moderator', 'dashboard')
  .allow('view')
  .forbid(['manage', 'configure'])
  .save();

const userPermissions = definePermissions('user', 'dashboard')
  .allow('view')
  .forbid(['manage', 'configure'])
  .save();

// Combine all permissions
const allPermissions = combinePermissions(adminPermissions, moderatorPermissions, userPermissions);

// Check permissions based on user role
function checkAccess(role: string) {
  const canView = hasPermission(allPermissions, role, 'dashboard', 'view');
  const canManage = hasPermission(allPermissions, role, 'dashboard', 'manage');
  
  if (canView.granted) {
    showDashboard();
  }
  
  if (canManage.granted) {
    showManagementControls();
  }
}

// Usage
checkAccess('admin'); // Can view and manage
checkAccess('moderator'); // Can only view
checkAccess('user'); // Can only view
```

### Complex Permission Rules

```typescript
import { definePermissions, hasPermission } from '@jay-js/system/guard';

// Define complex permissions with attributes
const userPostPermissions = definePermissions('user', 'posts')
  .allow('read')
  .allow(['create', 'update', 'delete'], ['own']) // Can only create, update, delete own posts
  .save();

// Check basic permission
const canReadPosts = hasPermission(userPostPermissions, 'user', 'posts', 'read');
if (canReadPosts.granted) {
  loadAllPosts();
}

// Check attribute-restricted permission
const canUpdatePost = hasPermission(userPostPermissions, 'user', 'posts', 'update', 'own');
if (canUpdatePost.granted) {
  enableEditForOwnPosts();
}

// This will return false as 'any' is not in the allowed attributes
const canUpdateAnyPost = hasPermission(userPostPermissions, 'user', 'posts', 'update', 'any');
if (!canUpdateAnyPost.granted) {
  disableEditForOtherPosts();
}
```

### Combining Permissions

```typescript
import { definePermissions, combinePermissions, hasPermission } from '@jay-js/system/guard';

// Application permissions
const appPermissions = definePermissions('user', 'app')
  .allow(['use', 'configure-profile'])
  .forbid('admin-panel')
  .save();

// Feature-specific permissions
const editorPermissions = definePermissions('user', 'editor')
  .allow(['basic', 'format'])
  .forbid('advanced')
  .save();

const analyticsPermissions = definePermissions('user', 'analytics')
  .allow('view')
  .forbid(['export', 'configure'])
  .save();

// Subscription-based permissions
const premiumPermissions = definePermissions('premium', 'editor')
  .allow('advanced')
  .save();

const premiumAnalyticsPermissions = definePermissions('premium', 'analytics')
  .allow(['export', 'configure'])
  .save();

// Combine all permissions
const userPermissions = combinePermissions(
  appPermissions,
  editorPermissions,
  analyticsPermissions
);

const premiumUserPermissions = combinePermissions(
  appPermissions,
  editorPermissions,
  analyticsPermissions,
  premiumPermissions,
  premiumAnalyticsPermissions
);

// Check permissions based on user type
function setupUI(isPremium: boolean) {
  const permissions = isPremium ? premiumUserPermissions : userPermissions;
  const userRole = isPremium ? 'premium' : 'user';
  
  // Basic app features
  if (hasPermission(permissions, userRole, 'app', 'use').granted) {
    enableAppFeatures();
  }
  
  // Editor features
  if (hasPermission(permissions, userRole, 'editor', 'advanced').granted) {
    enableAdvancedEditorFeatures();
  }
  
  // Analytics features
  if (hasPermission(permissions, userRole, 'analytics', 'export').granted) {
    showExportButton();
  }
}
```

## Advanced Usage

### Resource-specific Permissions

```typescript
import { definePermissions, createPermission, combinePermissions, hasPermission } from '@jay-js/system/guard';

// Base permissions for the editor role
const editorBasePermissions = definePermissions('editor', 'content')
  .allow(['create', 'read', 'update'])
  .forbid('delete')
  .save();

// Resource-specific override permissions
function createResourcePermissions(resourceId: string) {
  // Special case: editors can delete their own content
  if (isOwnedByCurrentUser(resourceId)) {
    return [
      createPermission('editor', `content:${resourceId}`, 'delete', true)
    ];
  }
  
  // For protected content, editors cannot update
  if (isProtectedContent(resourceId)) {
    return [
      createPermission('editor', `content:${resourceId}`, 'update', false)
    ];
  }
  
  return [];
}

// Check permission for a specific resource
function checkPermission(action: string, resourceId: string) {
  const role = 'editor';
  const resourceSpecificPermissions = createResourcePermissions(resourceId);
  const allPermissions = combinePermissions(editorBasePermissions, resourceSpecificPermissions);
  
  // Try resource-specific permission first
  const specificResult = hasPermission(
    allPermissions,
    role,
    `content:${resourceId}`,
    action
  );
  
  if (specificResult.granted !== undefined) {
    return specificResult.granted;
  }
  
  // Fall back to general permission
  const generalResult = hasPermission(
    allPermissions,
    role,
    'content',
    action
  );
  
  return generalResult.granted;
}
```

### Integration with Authentication

```typescript
import { definePermissions, createPermission, combinePermissions, hasPermission } from '@jay-js/system/guard';
import { getCurrentUser, isAuthenticated } from './auth-service';

// Generate permissions based on current user
function getUserPermissions() {
  const user = getCurrentUser();
  const permissions = [];
  
  // Authentication permissions
  permissions.push(
    createPermission('user', 'auth', 'authenticated', isAuthenticated())
  );
  
  if (!user) {
    return permissions;
  }
  
  // Role-based permissions
  user.roles.forEach(role => {
    // Add role-specific permissions
    switch (role) {
      case 'admin':
        permissions.push(...definePermissions('admin', 'system')
          .allow(['view', 'configure', 'manage-users'])
          .save());
        break;
      case 'editor':
        permissions.push(...definePermissions('editor', 'content')
          .allow(['create', 'read', 'update'])
          .forbid('delete')
          .save());
        break;
      case 'viewer':
        permissions.push(...definePermissions('viewer', 'content')
          .allow('read')
          .forbid(['create', 'update', 'delete'])
          .save());
        break;
    }
  });
  
  // Feature flag permissions based on user's plan
  if (user.plan === 'premium') {
    permissions.push(...definePermissions(user.plan, 'features')
      .allow(['advanced-analytics', 'export', 'templates'])
      .save());
  } else {
    permissions.push(...definePermissions(user.plan, 'features')
      .allow('basic-analytics')
      .forbid(['advanced-analytics', 'export', 'templates'])
      .save());
  }
  
  return permissions;
}

// Create a permission checker for the current user
function can(subject: string, action: string, attribute?: string) {
  const permissions = getUserPermissions();
  const user = getCurrentUser();
  
  if (!user) {
    return false;
  }
  
  // Check plan-specific permissions
  const planPermission = hasPermission(permissions, user.plan, 'features', action);
  if (planPermission.granted) {
    return true;
  }
  
  // Check role-specific permissions for all user roles
  return user.roles.some(role => {
    const result = hasPermission(permissions, role, subject, action, attribute);
    return result.granted;
  });
}

// Usage in the application
function setupUI() {
  if (can('content', 'create')) {
    showCreateButton();
  }
  
  if (can('system', 'manage-users')) {
    showAdminPanel();
  }
  
  if (can('features', 'export')) {
    enableExportFeature();
  }
}
```
