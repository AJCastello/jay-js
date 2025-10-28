---
category: Access Control
categoryId: 5
articleId: 5
slug: guard-examples
title: Guard System Examples
description: Practical examples of implementing access control with the Guard system for common use cases.
---

# Guard System Examples

## API Reference

The examples in this article use the following Guard system functions:

```typescript
// Define permissions
const permissions = definePermissions(role, subject)
  .allow(actions)
  .forbid(actions)
  .save();

// Check permissions
const result = hasPermission(permissions, role, subject, action);

// Combine permissions
const allPermissions = combinePermissions(...permissionSets);

// Create individual permissions
const permission = createPermission(role, subject, action, granted, attributes);
```

## Overview

This article provides practical examples of implementing access control for common use cases using the Guard system. These examples demonstrate how to use the Guard functionality in real-world scenarios and can serve as templates for your own applications.

## Blog Platform Example

Let's implement a permission system for a blog platform with different user roles:

### Define Role Permissions

```typescript
import { definePermissions, combinePermissions, hasPermission } from '@jay-js/system/guard';

// Guest permissions
const guestPermissions = definePermissions('guest', 'articles')
  .allow('read')
  .forbid(['create', 'edit', 'delete', 'publish'])
  .save();

// Author permissions
const authorPermissions = definePermissions('author', 'articles')
  .allow('read')
  .allow(['create', 'edit', 'delete'], ['own'])  // Authors can only manage their own articles
  .forbid('publish')                             // Authors cannot publish directly
  .save();

// Editor permissions
const editorPermissions = definePermissions('editor', 'articles')
  .allow(['read', 'edit', 'publish'])            // Editors can read, edit, and publish any article
  .forbid(['create', 'delete'])                  // Editors cannot create or delete articles
  .save();

// Admin permissions
const adminPermissions = definePermissions('admin', 'articles')
  .allow(['read', 'create', 'edit', 'delete', 'publish'])  // Admins have full access
  .save();

// Combine all permissions
const blogPermissions = combinePermissions(
  guestPermissions,
  authorPermissions,
  editorPermissions,
  adminPermissions
);
```

### Using Permissions in UI Components

```typescript
// Article actions component
function ArticleActions({ article, userRole }) {
  const actions = document.createElement('div');
  actions.className = 'article-actions';
  
  // View button - always shown for published articles
  if (article.status === 'published' || 
      hasPermission(blogPermissions, userRole, 'articles', 'read').granted) {
    const viewButton = document.createElement('button');
    viewButton.textContent = 'View';
    viewButton.onclick = () => viewArticle(article.id);
    actions.appendChild(viewButton);
  }
  
  // Edit button - based on role and ownership
  const canEdit = hasPermission(blogPermissions, userRole, 'articles', 'edit');
  const isOwner = article.authorId === currentUser.id;
  
  if (canEdit.granted && (isOwner || !canEdit.attributes || !canEdit.attributes.includes('own'))) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editArticle(article.id);
    actions.appendChild(editButton);
  }
  
  // Delete button
  const canDelete = hasPermission(blogPermissions, userRole, 'articles', 'delete');
  if (canDelete.granted && (isOwner || !canDelete.attributes || !canDelete.attributes.includes('own'))) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteArticle(article.id);
    actions.appendChild(deleteButton);
  }
  
  // Publish button
  const canPublish = hasPermission(blogPermissions, userRole, 'articles', 'publish');
  if (canPublish.granted && article.status !== 'published') {
    const publishButton = document.createElement('button');
    publishButton.textContent = 'Publish';
    publishButton.onclick = () => publishArticle(article.id);
    actions.appendChild(publishButton);
  }
  
  return actions;
}
```

### Permission-Based Routing

```typescript
// Define routes with required permissions
const routes = [
  {
    path: '/articles',
    component: ArticleList,
    permission: { subject: 'articles', action: 'read' }
  },
  {
    path: '/articles/new',
    component: CreateArticle,
    permission: { subject: 'articles', action: 'create' }
  },
  {
    path: '/articles/:id/edit',
    component: EditArticle,
    permission: { subject: 'articles', action: 'edit' }
  },
  {
    path: '/admin/dashboard',
    component: AdminDashboard,
    permission: { subject: 'admin', action: 'access' }
  }
];

// Router function that checks permissions
function router(path, userRole) {
  const route = routes.find(r => r.path === path || matchPattern(r.path, path));
  
  if (!route) {
    return { component: NotFound };
  }
  
  if (route.permission) {
    const { subject, action } = route.permission;
    const canAccess = hasPermission(blogPermissions, userRole, subject, action);
    
    if (!canAccess.granted) {
      return { component: AccessDenied };
    }
  }
  
  return { component: route.component, params: extractParams(route.path, path) };
}
```

## E-commerce Platform Example

Let's implement permissions for an e-commerce platform:

### Define Role Permissions

```typescript
import { definePermissions, combinePermissions } from '@jay-js/system/guard';

// Customer permissions
const customerPermissions = combinePermissions(
  definePermissions('customer', 'products').allow('view').save(),
  definePermissions('customer', 'cart').allow(['view', 'update']).save(),
  definePermissions('customer', 'orders').allow(['view', 'create']).save(),
  definePermissions('customer', 'profile').allow(['view', 'update']).save()
);

// Store manager permissions
const managerPermissions = combinePermissions(
  definePermissions('manager', 'products').allow(['view', 'create', 'update']).save(),
  definePermissions('manager', 'inventory').allow(['view', 'update']).save(),
  definePermissions('manager', 'orders').allow(['view', 'update', 'process']).save(),
  definePermissions('manager', 'customers').allow('view').save()
);

// Admin permissions
const adminPermissions = combinePermissions(
  definePermissions('admin', 'products').allow(['view', 'create', 'update', 'delete']).save(),
  definePermissions('admin', 'inventory').allow(['view', 'update']).save(),
  definePermissions('admin', 'orders').allow(['view', 'update', 'process', 'cancel']).save(),
  definePermissions('admin', 'customers').allow(['view', 'update', 'delete']).save(),
  definePermissions('admin', 'staff').allow(['view', 'create', 'update', 'delete']).save(),
  definePermissions('admin', 'settings').allow(['view', 'update']).save()
);

// Combine all permissions
const shopPermissions = combinePermissions(
  customerPermissions,
  managerPermissions,
  adminPermissions
);
```

### Navigation Menu Based on Permissions

```typescript
function renderNavigation(userRole) {
  const navItems = [
    // Items available to all users
    { label: 'Home', url: '/', permission: null },
    { label: 'Products', url: '/products', permission: { subject: 'products', action: 'view' } },
    
    // Customer-specific items
    { label: 'My Cart', url: '/cart', permission: { subject: 'cart', action: 'view' } },
    { label: 'My Orders', url: '/orders', permission: { subject: 'orders', action: 'view' } },
    { label: 'My Profile', url: '/profile', permission: { subject: 'profile', action: 'view' } },
    
    // Staff items
    { label: 'Inventory', url: '/inventory', permission: { subject: 'inventory', action: 'view' } },
    { label: 'Order Management', url: '/manage/orders', permission: { subject: 'orders', action: 'process' } },
    { label: 'Customer List', url: '/customers', permission: { subject: 'customers', action: 'view' } },
    
    // Admin items
    { label: 'Staff Management', url: '/staff', permission: { subject: 'staff', action: 'view' } },
    { label: 'Store Settings', url: '/settings', permission: { subject: 'settings', action: 'view' } }
  ];
  
  const navElement = document.getElementById('main-nav');
  navElement.innerHTML = '';
  
  navItems.forEach(item => {
    // Skip items that require permissions the user doesn't have
    if (item.permission) {
      const { subject, action } = item.permission;
      const canAccess = hasPermission(shopPermissions, userRole, subject, action);
      
      if (!canAccess.granted) {
        return;
      }
    }
    
    const linkElement = document.createElement('a');
    linkElement.textContent = item.label;
    linkElement.href = item.url;
    
    const listItem = document.createElement('li');
    listItem.appendChild(linkElement);
    navElement.appendChild(listItem);
  });
}
```

## SaaS Application Example

Let's implement permissions for a SaaS application with different subscription tiers:

### Define Plan-Based Permissions

```typescript
import { definePermissions, combinePermissions, createPermission } from '@jay-js/system/guard';

// Base permissions for all users
const basePermissions = definePermissions('user', 'account')
  .allow(['view', 'edit'])
  .save();

// Free tier permissions
const freePermissions = combinePermissions(
  definePermissions('free', 'projects').allow('create', ['max:2']).save(),
  definePermissions('free', 'storage').allow('use', ['max:100MB']).save(),
  definePermissions('free', 'export').allow(['pdf']).forbid(['excel', 'csv']).save()
);

// Pro tier permissions
const proPermissions = combinePermissions(
  definePermissions('pro', 'projects').allow('create', ['max:10']).save(),
  definePermissions('pro', 'storage').allow('use', ['max:5GB']).save(),
  definePermissions('pro', 'export').allow(['pdf', 'excel', 'csv']).save(),
  definePermissions('pro', 'api').allow('access').save(),
  definePermissions('pro', 'support').allow('priority').save()
);

// Enterprise tier permissions
const enterprisePermissions = combinePermissions(
  definePermissions('enterprise', 'projects').allow('create', ['unlimited']).save(),
  definePermissions('enterprise', 'storage').allow('use', ['max:50GB']).save(),
  definePermissions('enterprise', 'export').allow(['pdf', 'excel', 'csv', 'custom']).save(),
  definePermissions('enterprise', 'api').allow('access').save(),
  definePermissions('enterprise', 'support').allow(['priority', 'dedicated']).save(),
  definePermissions('enterprise', 'sso').allow('configure').save(),
  definePermissions('enterprise', 'users').allow('manage').save()
);

// Admin permissions (independent of subscription)
const adminPermissions = definePermissions('admin', '*')
  .allow('*')
  .save();

// Function to get permissions based on user subscription
function getUserPermissions(user) {
  let permissions = [...basePermissions];
  
  switch (user.subscription) {
    case 'free':
      permissions = permissions.concat(freePermissions);
      break;
    case 'pro':
      permissions = permissions.concat(proPermissions);
      break;
    case 'enterprise':
      permissions = permissions.concat(enterprisePermissions);
      break;
  }
  
  // Add admin permissions if user is an admin
  if (user.isAdmin) {
    permissions = permissions.concat(adminPermissions);
  }
  
  return permissions;
}
```

### Feature Toggles Based on Permissions

```typescript
function renderDashboard(user) {
  const permissions = getUserPermissions(user);
  const dashboard = document.getElementById('dashboard');
  
  // Check project creation limits
  const projectPermission = hasPermission(permissions, user.subscription, 'projects', 'create');
  const projectLimits = projectPermission.attributes || [];
  let maxProjects = 0;
  
  for (const attr of projectLimits) {
    if (attr.startsWith('max:')) {
      maxProjects = parseInt(attr.replace('max:', ''), 10);
    } else if (attr === 'unlimited') {
      maxProjects = Infinity;
    }
  }
  
  // Update project creation UI
  const projectsSection = document.createElement('section');
  projectsSection.innerHTML = `
    <h2>Projects (${user.projects.length} / ${maxProjects === Infinity ? 'Unlimited' : maxProjects})</h2>
    <div class="project-list">
      ${user.projects.map(p => `<div class="project-card">${p.name}</div>`).join('')}
    </div>
  `;
  
  // Only show create button if below limit
  if (user.projects.length < maxProjects) {
    const createButton = document.createElement('button');
    createButton.textContent = 'Create New Project';
    createButton.onclick = createNewProject;
    projectsSection.appendChild(createButton);
  } else if (maxProjects !== Infinity) {
    const upgradeMsg = document.createElement('p');
    upgradeMsg.className = 'upgrade-message';
    upgradeMsg.textContent = 'Upgrade your plan to create more projects';
    projectsSection.appendChild(upgradeMsg);
  }
  
  dashboard.appendChild(projectsSection);
  
  // Export options based on permissions
  const exportSection = document.createElement('section');
  exportSection.innerHTML = '<h2>Export Options</h2>';
  
  const exportFormats = ['pdf', 'excel', 'csv', 'custom'];
  const exportContainer = document.createElement('div');
  exportContainer.className = 'export-options';
  
  exportFormats.forEach(format => {
    const canExport = hasPermission(permissions, user.subscription, 'export', format);
    const option = document.createElement('button');
    option.textContent = format.toUpperCase();
    option.disabled = !canExport.granted;
    option.onclick = canExport.granted ? () => exportData(format) : null;
    
    if (!canExport.granted) {
      option.title = 'Upgrade your plan to use this export format';
      option.className = 'disabled';
    }
    
    exportContainer.appendChild(option);
  });
  
  exportSection.appendChild(exportContainer);
  dashboard.appendChild(exportSection);
  
  // API access based on permissions
  const apiAccess = hasPermission(permissions, user.subscription, 'api', 'access');
  if (apiAccess.granted) {
    const apiSection = document.createElement('section');
    apiSection.innerHTML = `
      <h2>API Access</h2>
      <div class="api-key">
        <p>Your API Key: ${user.apiKey || 'Not generated'}</p>
        <button id="generate-key">Generate New Key</button>
      </div>
      <div class="api-docs">
        <a href="/docs/api">View API Documentation</a>
      </div>
    `;
    dashboard.appendChild(apiSection);
  }
  
  // SSO configuration (enterprise only)
  const ssoConfig = hasPermission(permissions, user.subscription, 'sso', 'configure');
  if (ssoConfig.granted) {
    const ssoSection = document.createElement('section');
    ssoSection.innerHTML = `
      <h2>Single Sign-On Configuration</h2>
      <p>Configure SSO for your organization</p>
      <button id="configure-sso">Configure SSO</button>
    `;
    dashboard.appendChild(ssoSection);
  }
}
```

## Team Collaboration Example

Let's implement permissions for a team collaboration tool:

### Define Team-Based Permissions

```typescript
import { definePermissions, combinePermissions, createPermission } from '@jay-js/system/guard';

// Define permissions for different team roles
function createTeamPermissions(teamId) {
  // Team member permissions
  const memberPermissions = combinePermissions(
    definePermissions('member', `team:${teamId}`).allow('access').save(),
    definePermissions('member', `team:${teamId}:tasks`).allow(['view', 'create']).save(),
    definePermissions('member', `team:${teamId}:tasks`).allow(['update', 'delete'], ['own']).save(),
    definePermissions('member', `team:${teamId}:files`).allow(['view', 'upload', 'download']).save(),
    definePermissions('member', `team:${teamId}:discussions`).allow(['view', 'create', 'comment']).save()
  );
  
  // Team manager permissions
  const managerPermissions = combinePermissions(
    definePermissions('manager', `team:${teamId}`).allow(['access', 'manage']).save(),
    definePermissions('manager', `team:${teamId}:tasks`).allow(['view', 'create', 'assign', 'update', 'delete']).save(),
    definePermissions('manager', `team:${teamId}:files`).allow(['view', 'upload', 'download', 'delete']).save(),
    definePermissions('manager', `team:${teamId}:discussions`).allow(['view', 'create', 'comment', 'moderate']).save(),
    definePermissions('manager', `team:${teamId}:members`).allow(['view', 'invite']).save()
  );
  
  // Team admin permissions
  const adminPermissions = combinePermissions(
    definePermissions('admin', `team:${teamId}`).allow(['access', 'manage', 'delete']).save(),
    definePermissions('admin', `team:${teamId}:tasks`).allow(['view', 'create', 'assign', 'update', 'delete']).save(),
    definePermissions('admin', `team:${teamId}:files`).allow(['view', 'upload', 'download', 'delete']).save(),
    definePermissions('admin', `team:${teamId}:discussions`).allow(['view', 'create', 'comment', 'moderate', 'delete']).save(),
    definePermissions('admin', `team:${teamId}:members`).allow(['view', 'invite', 'remove', 'change_role']).save(),
    definePermissions('admin', `team:${teamId}:settings`).allow('manage').save()
  );
  
  return combinePermissions(memberPermissions, managerPermissions, adminPermissions);
}

// Function to get user's role in a specific team
function getUserRoleInTeam(user, teamId) {
  const teamMembership = user.teams.find(t => t.teamId === teamId);
  return teamMembership ? teamMembership.role : null;
}

// Check permissions for a specific team
function checkTeamPermission(user, teamId, subject, action, attribute) {
  const role = getUserRoleInTeam(user, teamId);
  if (!role) return { granted: false };
  
  const teamPermissions = createTeamPermissions(teamId);
  return hasPermission(teamPermissions, role, subject, action, attribute);
}
```

### Using Team Permissions in an Application

```typescript
// Render team dashboard
function renderTeamDashboard(user, teamId) {
  const dashboardEl = document.getElementById('team-dashboard');
  dashboardEl.innerHTML = '';
  
  // Check if user has access to this team
  const canAccess = checkTeamPermission(user, teamId, `team:${teamId}`, 'access');
  if (!canAccess.granted) {
    dashboardEl.innerHTML = '<p>You do not have access to this team</p>';
    return;
  }
  
  // Render team header
  const teamHeader = document.createElement('header');
  teamHeader.className = 'team-header';
  
  // Team settings button (admin only)
  const canManageSettings = checkTeamPermission(user, teamId, `team:${teamId}:settings`, 'manage');
  if (canManageSettings.granted) {
    const settingsBtn = document.createElement('button');
    settingsBtn.className = 'settings-btn';
    settingsBtn.textContent = 'Team Settings';
    settingsBtn.onclick = () => openTeamSettings(teamId);
    teamHeader.appendChild(settingsBtn);
  }
  
  dashboardEl.appendChild(teamHeader);
  
  // Render task section
  const taskSection = document.createElement('section');
  taskSection.className = 'task-section';
  taskSection.innerHTML = '<h2>Tasks</h2>';
  
  // Task creation button
  const canCreateTasks = checkTeamPermission(user, teamId, `team:${teamId}:tasks`, 'create');
  if (canCreateTasks.granted) {
    const createTaskBtn = document.createElement('button');
    createTaskBtn.textContent = 'Create Task';
    createTaskBtn.onclick = () => openCreateTaskModal(teamId);
    taskSection.appendChild(createTaskBtn);
  }
  
  // Task assignment button (managers and admins)
  const canAssignTasks = checkTeamPermission(user, teamId, `team:${teamId}:tasks`, 'assign');
  if (canAssignTasks.granted) {
    const assignTaskBtn = document.createElement('button');
    assignTaskBtn.textContent = 'Assign Tasks';
    assignTaskBtn.onclick = () => openAssignTaskModal(teamId);
    taskSection.appendChild(assignTaskBtn);
  }
  
  dashboardEl.appendChild(taskSection);
  
  // Render file section
  const fileSection = document.createElement('section');
  fileSection.className = 'file-section';
  fileSection.innerHTML = '<h2>Files</h2>';
  
  // File upload button
  const canUploadFiles = checkTeamPermission(user, teamId, `team:${teamId}:files`, 'upload');
  if (canUploadFiles.granted) {
    const uploadBtn = document.createElement('button');
    uploadBtn.textContent = 'Upload Files';
    uploadBtn.onclick = () => openFileUploadModal(teamId);
    fileSection.appendChild(uploadBtn);
  }
  
  dashboardEl.appendChild(fileSection);
  
  // Render member section (visible to managers and admins)
  const canViewMembers = checkTeamPermission(user, teamId, `team:${teamId}:members`, 'view');
  if (canViewMembers.granted) {
    const memberSection = document.createElement('section');
    memberSection.className = 'member-section';
    memberSection.innerHTML = '<h2>Team Members</h2>';
    
    // Invite button
    const canInvite = checkTeamPermission(user, teamId, `team:${teamId}:members`, 'invite');
    if (canInvite.granted) {
      const inviteBtn = document.createElement('button');
      inviteBtn.textContent = 'Invite Members';
      inviteBtn.onclick = () => openInviteModal(teamId);
      memberSection.appendChild(inviteBtn);
    }
    
    dashboardEl.appendChild(memberSection);
  }
}
```

These examples demonstrate how to implement permission-based access control for different types of applications. You can adapt these patterns to fit your specific needs and extend them with additional functionality. 