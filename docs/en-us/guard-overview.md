---
category: Access Control
categoryId: 5
articleId: 1
slug: guard-overview
title: Guard System Overview
description: An introduction to the Guard access control system for role-based permissions management.
---

# Guard System Overview

## API Reference

### Core Functions

```typescript
// Define permissions for a role and subject
const permissions = definePermissions(role, subject)
  .allow(actions)
  .forbid(actions)
  .save();

// Check if a role has permission
const result = hasPermission(permissions, role, subject, action);
if (result.granted) {
  // Permission granted
}
```

### Utility Functions

```typescript
// Combine multiple permission sets
const allPermissions = combinePermissions(
  rolePermissions,
  featurePermissions
);

// Create an individual permission
const permission = createPermission(role, subject, action, granted);
```

## Overview

The Guard module provides a flexible permission management system for implementing access control in your applications. It offers a simple yet powerful API for defining permissions, checking access, and managing role-based security.

Key features include:
- Role-based permission definitions
- Subject and action-specific rules
- Fine-grained attribute controls
- Flexible permission checking

## Basic Concepts

The Guard system is built around these core concepts:

### Roles

Roles represent different types of users or entities in your system. Examples include:
- `admin`
- `editor`
- `user`
- `guest`

### Subjects

Subjects are the resources or entities that permissions apply to. Examples include:
- `articles`
- `users`
- `settings`
- `payments`

### Actions

Actions are operations that can be performed on subjects. Common examples include:
- `read`
- `create`
- `update`
- `delete`

### Attributes

Optional qualifiers that further restrict permissions, such as:
- `own` (only the user's own resources)
- `published` (only published resources)
- `premium` (only premium features)

## Permission Structure

Permissions are defined as rules that specify whether a role is allowed or forbidden to perform an action on a subject. Each permission includes:

- `role`: The role(s) the permission applies to
- `subject`: The subject(s) the permission applies to
- `action`: The action(s) being permitted or denied
- `granted`: Whether the action is allowed (true) or denied (false)
- `attributes`: Optional qualifiers that further restrict the permission

## Getting Started

To start using the Guard system, you first define permissions for different roles and then check those permissions when accessing protected features or resources:

```typescript
import { definePermissions, hasPermission } from '@jay-js/system/guard';

// Define permissions
const editorPermissions = definePermissions('editor', 'articles')
  .allow(['read', 'create', 'update'])
  .forbid('delete')
  .save();

// Check permissions in your application
function editArticle(articleId) {
  const canEdit = hasPermission(editorPermissions, 'editor', 'articles', 'update');
  
  if (canEdit.granted) {
    // Allow editing
    showEditor(articleId);
  } else {
    // Show access denied message
    showErrorMessage('You do not have permission to edit articles');
  }
}
```

In the following articles, we'll explore each aspect of the Guard system in detail and demonstrate advanced usage patterns. 