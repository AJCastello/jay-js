---
category: Controle de Acesso
categoryId: 5
articleId: 5
slug: guard-examples
title: Exemplos do Sistema Guard
description: Exemplos práticos de implementação de controle de acesso com o sistema Guard para casos de uso comuns.
---

# Exemplos do Sistema Guard

## Referência da API

Os exemplos deste artigo utilizam as seguintes funções do sistema Guard:

```typescript
// Define permissões
const permissions = definePermissions(role, subject)
  .allow(actions)
  .forbid(actions)
  .save();

// Verifica permissões
const result = hasPermission(permissions, role, subject, action);

// Combina permissões
const allPermissions = combinePermissions(...permissionSets);

// Cria permissões individuais
const permission = createPermission(role, subject, action, granted, attributes);
```

## Visão Geral

Este artigo fornece exemplos práticos de implementação de controle de acesso para casos de uso comuns usando o sistema Guard. Esses exemplos demonstram como utilizar a funcionalidade do Guard em cenários reais e podem servir como modelos para suas próprias aplicações.

## Exemplo: Plataforma de Blog

Vamos implementar um sistema de permissões para uma plataforma de blog com diferentes papéis de usuário:

### Definindo Permissões por Papel

```typescript
import { definePermissions, combinePermissions, hasPermission } from '@jay-js/system/guard';

// Permissões de visitante (guest)
const guestPermissions = definePermissions('guest', 'articles')
  .allow('read')
  .forbid(['create', 'edit', 'delete', 'publish'])
  .save();

// Permissões de autor
const authorPermissions = definePermissions('author', 'articles')
  .allow('read')
  .allow(['create', 'edit', 'delete'], ['own'])  // Autores só podem gerenciar seus próprios artigos
  .forbid('publish')                             // Autores não podem publicar diretamente
  .save();

// Permissões de editor
const editorPermissions = definePermissions('editor', 'articles')
  .allow(['read', 'edit', 'publish'])            // Editores podem ler, editar e publicar qualquer artigo
  .forbid(['create', 'delete'])                  // Editores não podem criar nem deletar artigos
  .save();

// Permissões de administrador
const adminPermissions = definePermissions('admin', 'articles')
  .allow(['read', 'create', 'edit', 'delete', 'publish'])  // Admins têm acesso completo
  .save();

// Combina todas as permissões
const blogPermissions = combinePermissions(
  guestPermissions,
  authorPermissions,
  editorPermissions,
  adminPermissions
);
```

### Usando Permissões em Componentes de UI

```typescript
// Componente de ações de artigo
function ArticleActions({ article, userRole }) {
  const actions = document.createElement('div');
  actions.className = 'article-actions';

  // Botão de visualizar - sempre mostrado para artigos publicados
  if (article.status === 'published' ||
      hasPermission(blogPermissions, userRole, 'articles', 'read').granted) {
    const viewButton = document.createElement('button');
    viewButton.textContent = 'View';
    viewButton.onclick = () => viewArticle(article.id);
    actions.appendChild(viewButton);
  }

  // Botão de edição - baseado no papel e na propriedade
  const canEdit = hasPermission(blogPermissions, userRole, 'articles', 'edit');
  const isOwner = article.authorId === currentUser.id;

  if (canEdit.granted && (isOwner || !canEdit.attributes || !canEdit.attributes.includes('own'))) {
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.onclick = () => editArticle(article.id);
    actions.appendChild(editButton);
  }

  // Botão de deletar
  const canDelete = hasPermission(blogPermissions, userRole, 'articles', 'delete');
  if (canDelete.granted && (isOwner || !canDelete.attributes || !canDelete.attributes.includes('own'))) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = () => deleteArticle(article.id);
    actions.appendChild(deleteButton);
  }

  // Botão de publicar
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

### Roteamento Baseado em Permissões

```typescript
// Define rotas com permissões requeridas
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

// Função de roteador que verifica permissões
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

## Exemplo: Plataforma de E-commerce

Vamos implementar permissões para uma plataforma de e-commerce:

### Definindo Permissões por Papel

```typescript
import { definePermissions, combinePermissions } from '@jay-js/system/guard';

// Permissões de cliente
const customerPermissions = combinePermissions(
  definePermissions('customer', 'products').allow('view').save(),
  definePermissions('customer', 'cart').allow(['view', 'update']).save(),
  definePermissions('customer', 'orders').allow(['view', 'create']).save(),
  definePermissions('customer', 'profile').allow(['view', 'update']).save()
);

// Permissões de gerente de loja
const managerPermissions = combinePermissions(
  definePermissions('manager', 'products').allow(['view', 'create', 'update']).save(),
  definePermissions('manager', 'inventory').allow(['view', 'update']).save(),
  definePermissions('manager', 'orders').allow(['view', 'update', 'process']).save(),
  definePermissions('manager', 'customers').allow('view').save()
);

// Permissões de administrador
const adminPermissions = combinePermissions(
  definePermissions('admin', 'products').allow(['view', 'create', 'update', 'delete']).save(),
  definePermissions('admin', 'inventory').allow(['view', 'update']).save(),
  definePermissions('admin', 'orders').allow(['view', 'update', 'process', 'cancel']).save(),
  definePermissions('admin', 'customers').allow(['view', 'update', 'delete']).save(),
  definePermissions('admin', 'staff').allow(['view', 'create', 'update', 'delete']).save(),
  definePermissions('admin', 'settings').allow(['view', 'update']).save()
);

// Combina todas as permissões
const shopPermissions = combinePermissions(
  customerPermissions,
  managerPermissions,
  adminPermissions
);
```

### Menu de Navegação Baseado em Permissões

```typescript
function renderNavigation(userRole) {
  const navItems = [
    // Itens disponíveis para todos os usuários
    { label: 'Home', url: '/', permission: null },
    { label: 'Products', url: '/products', permission: { subject: 'products', action: 'view' } },

    // Itens específicos de clientes
    { label: 'My Cart', url: '/cart', permission: { subject: 'cart', action: 'view' } },
    { label: 'My Orders', url: '/orders', permission: { subject: 'orders', action: 'view' } },
    { label: 'My Profile', url: '/profile', permission: { subject: 'profile', action: 'view' } },

    // Itens da equipe
    { label: 'Inventory', url: '/inventory', permission: { subject: 'inventory', action: 'view' } },
    { label: 'Order Management', url: '/manage/orders', permission: { subject: 'orders', action: 'process' } },
    { label: 'Customer List', url: '/customers', permission: { subject: 'customers', action: 'view' } },

    // Itens de admin
    { label: 'Staff Management', url: '/staff', permission: { subject: 'staff', action: 'view' } },
    { label: 'Store Settings', url: '/settings', permission: { subject: 'settings', action: 'view' } }
  ];

  const navElement = document.getElementById('main-nav');
  navElement.innerHTML = '';

  navItems.forEach(item => {
    // Pula itens cuja permissão o usuário não possui
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

## Exemplo: Aplicação SaaS

Vamos implementar permissões para uma aplicação SaaS com diferentes níveis de assinatura:

### Definindo Permissões Baseadas em Plano

```typescript
import { definePermissions, combinePermissions, createPermission } from '@jay-js/system/guard';

// Permissões base para todos os usuários
const basePermissions = definePermissions('user', 'account')
  .allow(['view', 'edit'])
  .save();

// Permissões do plano Free
const freePermissions = combinePermissions(
  definePermissions('free', 'projects').allow('create', ['max:2']).save(),
  definePermissions('free', 'storage').allow('use', ['max:100MB']).save(),
  definePermissions('free', 'export').allow(['pdf']).forbid(['excel', 'csv']).save()
);

// Permissões do plano Pro
const proPermissions = combinePermissions(
  definePermissions('pro', 'projects').allow('create', ['max:10']).save(),
  definePermissions('pro', 'storage').allow('use', ['max:5GB']).save(),
  definePermissions('pro', 'export').allow(['pdf', 'excel', 'csv']).save(),
  definePermissions('pro', 'api').allow('access').save(),
  definePermissions('pro', 'support').allow('priority').save()
);

// Permissões do plano Enterprise
const enterprisePermissions = combinePermissions(
  definePermissions('enterprise', 'projects').allow('create', ['unlimited']).save(),
  definePermissions('enterprise', 'storage').allow('use', ['max:50GB']).save(),
  definePermissions('enterprise', 'export').allow(['pdf', 'excel', 'csv', 'custom']).save(),
  definePermissions('enterprise', 'api').allow('access').save(),
  definePermissions('enterprise', 'support').allow(['priority', 'dedicated']).save(),
  definePermissions('enterprise', 'sso').allow('configure').save(),
  definePermissions('enterprise', 'users').allow('manage').save()
);

// Permissões de admin (independentes da assinatura)
const adminPermissions = definePermissions('admin', '*')
  .allow('*')
  .save();

// Função para obter permissões com base na assinatura do usuário
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

  // Adiciona permissões de admin se o usuário for admin
  if (user.isAdmin) {
    permissions = permissions.concat(adminPermissions);
  }

  return permissions;
}
```

### Funcionalidades Condicionais Baseadas em Permissões

```typescript
function renderDashboard(user) {
  const permissions = getUserPermissions(user);
  const dashboard = document.getElementById('dashboard');

  // Verifica limites de criação de projetos
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

  // Atualiza UI de criação de projetos
  const projectsSection = document.createElement('section');
  projectsSection.innerHTML = `
    <h2>Projects (${user.projects.length} / ${maxProjects === Infinity ? 'Unlimited' : maxProjects})</h2>
    <div class="project-list">
      ${user.projects.map(p => `<div class="project-card">${p.name}</div>`).join('')}
    </div>
  `;

  // Mostra botão de criação somente se abaixo do limite
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

  // Opções de export conforme permissões
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

  // Acesso à API conforme permissões
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

  // Configuração de SSO (apenas enterprise)
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

## Exemplo: Colaboração em Equipe

Vamos implementar permissões para uma ferramenta de colaboração em equipe:

### Definindo Permissões Baseadas em Equipe

```typescript
import { definePermissions, combinePermissions, createPermission } from '@jay-js/system/guard';

// Define permissões para diferentes papéis na equipe
function createTeamPermissions(teamId) {
  // Permissões de membro
  const memberPermissions = combinePermissions(
    definePermissions('member', `team:${teamId}`).allow('access').save(),
    definePermissions('member', `team:${teamId}:tasks`).allow(['view', 'create']).save(),
    definePermissions('member', `team:${teamId}:tasks`).allow(['update', 'delete'], ['own']).save(),
    definePermissions('member', `team:${teamId}:files`).allow(['view', 'upload', 'download']).save(),
    definePermissions('member', `team:${teamId}:discussions`).allow(['view', 'create', 'comment']).save()
  );

  // Permissões de gerente
  const managerPermissions = combinePermissions(
    definePermissions('manager', `team:${teamId}`).allow(['access', 'manage']).save(),
    definePermissions('manager', `team:${teamId}:tasks`).allow(['view', 'create', 'assign', 'update', 'delete']).save(),
    definePermissions('manager', `team:${teamId}:files`).allow(['view', 'upload', 'download', 'delete']).save(),
    definePermissions('manager', `team:${teamId}:discussions`).allow(['view', 'create', 'comment', 'moderate']).save(),
    definePermissions('manager', `team:${teamId}:members`).allow(['view', 'invite']).save()
  );

  // Permissões de admin da equipe
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

// Função para obter o papel do usuário em uma equipe específica
function getUserRoleInTeam(user, teamId) {
  const teamMembership = user.teams.find(t => t.teamId === teamId);
  return teamMembership ? teamMembership.role : null;
}

// Verifica permissões para uma equipe específica
function checkTeamPermission(user, teamId, subject, action, attribute) {
  const role = getUserRoleInTeam(user, teamId);
  if (!role) return { granted: false };

  const teamPermissions = createTeamPermissions(teamId);
  return hasPermission(teamPermissions, role, subject, action, attribute);
}
```

### Usando Permissões de Equipe na Aplicação

```typescript
// Renderiza dashboard da equipe
function renderTeamDashboard(user, teamId) {
  const dashboardEl = document.getElementById('team-dashboard');
  dashboardEl.innerHTML = '';

  // Verifica se o usuário tem acesso a esta equipe
  const canAccess = checkTeamPermission(user, teamId, `team:${teamId}`, 'access');
  if (!canAccess.granted) {
    dashboardEl.innerHTML = '<p>You do not have access to this team</p>';
    return;
  }

  // Renderiza cabeçalho da equipe
  const teamHeader = document.createElement('header');
  teamHeader.className = 'team-header';

  // Botão de configurações da equipe (somente admin)
  const canManageSettings = checkTeamPermission(user, teamId, `team:${teamId}:settings`, 'manage');
  if (canManageSettings.granted) {
    const settingsBtn = document.createElement('button');
    settingsBtn.className = 'settings-btn';
    settingsBtn.textContent = 'Team Settings';
    settingsBtn.onclick = () => openTeamSettings(teamId);
    teamHeader.appendChild(settingsBtn);
  }

  dashboardEl.appendChild(teamHeader);

  // Renderiza seção de tarefas
  const taskSection = document.createElement('section');
  taskSection.className = 'task-section';
  taskSection.innerHTML = '<h2>Tasks</h2>';

  // Botão de criação de tarefa
  const canCreateTasks = checkTeamPermission(user, teamId, `team:${teamId}:tasks`, 'create');
  if (canCreateTasks.granted) {
    const createTaskBtn = document.createElement('button');
    createTaskBtn.textContent = 'Create Task';
    createTaskBtn.onclick = () => openCreateTaskModal(teamId);
    taskSection.appendChild(createTaskBtn);
  }

  // Botão de atribuição de tarefa (gerentes e admins)
  const canAssignTasks = checkTeamPermission(user, teamId, `team:${teamId}:tasks`, 'assign');
  if (canAssignTasks.granted) {
    const assignTaskBtn = document.createElement('button');
    assignTaskBtn.textContent = 'Assign Tasks';
    assignTaskBtn.onclick = () => openAssignTaskModal(teamId);
    taskSection.appendChild(assignTaskBtn);
  }

  dashboardEl.appendChild(taskSection);

  // Renderiza seção de arquivos
  const fileSection = document.createElement('section');
  fileSection.className = 'file-section';
  fileSection.innerHTML = '<h2>Files</h2>';

  // Botão de upload de arquivo
  const canUploadFiles = checkTeamPermission(user, teamId, `team:${teamId}:files`, 'upload');
  if (canUploadFiles.granted) {
    const uploadBtn = document.createElement('button');
    uploadBtn.textContent = 'Upload Files';
    uploadBtn.onclick = () => openFileUploadModal(teamId);
    fileSection.appendChild(uploadBtn);
  }

  dashboardEl.appendChild(fileSection);

  // Renderiza seção de membros (visível para gerentes e admins)
  const canViewMembers = checkTeamPermission(user, teamId, `team:${teamId}:members`, 'view');
  if (canViewMembers.granted) {
    const memberSection = document.createElement('section');
    memberSection.className = 'member-section';
    memberSection.innerHTML = '<h2>Team Members</h2>';

    // Botão de convite
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

Esses exemplos demonstram como implementar controle de acesso baseado em permissões para diferentes tipos de aplicações. Você pode adaptar esses padrões às suas necessidades específicas e estendê-los com funcionalidades adicionais.