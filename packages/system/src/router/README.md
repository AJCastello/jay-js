# @jay-js/system - Router

A lightweight, flexible routing library for client-side single-page applications, providing path-based navigation without page reloads. Powered by path-to-regexp for advanced path matching capabilities.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [Router](#router)
  - [Navigate](#navigate)
  - [beforeNavigate](#beforenavigate)
  - [getParams](#getparams)
  - [routerDefineOptions](#routerdefineoptions)
- [Type Definitions](#type-definitions)
  - [TRoute](#troute)
  - [TRouteInstance](#trouteinstance)
  - [TRouterOptions](#trouteroptions)
- [Advanced Usage](#advanced-usage)
  - [Path Pattern Syntax](#path-pattern-syntax)
  - [LazyModule Integration](#lazy-module-integration)
  - [Route Guards](#route-guards)
  - [Layouts](#layouts)
  - [Nested Routes](#nested-routes)
  - [Route Parameters](#route-parameters)
  - [Navigation Guards](#navigation-guards)
  - [Navigation Hooks](#navigation-hooks)
  - [Route Metadata](#route-metadata)
- [Examples](#examples)

## Installation

```bash
npm install @jay-js/system
```

## Quick Start

```typescript
import { Router, Navigate } from '@jay-js/system';

// Define your routes
Router([
  {
    path: '/',
    element: () => {
      const el = document.createElement('div');
      el.textContent = 'Home Page';
      return el;
    }
  },
  {
    path: '/about',
    element: () => {
      const el = document.createElement('div');
      el.textContent = 'About Page';
      return el;
    }
  },
  {
    path: '/contact',
    element: () => {
      const el = document.createElement('div');
      el.textContent = 'Contact Page';
      return el;
    }
  }
], {
  target: '#app',
  prefix: '/app' // Optional: adds a prefix to all routes
});

// Create navigation links
document.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    Navigate(link.getAttribute('href'));
  });
});
```

## API Reference

### Router

The main function to initialize the routing system.

```typescript
Router(routes: Array<TRoute>, options?: TRouterOptions): void
```

#### Parameters

- `routes`: Array of route configuration objects
- `options`: (Optional) Router configuration options

#### Example

```typescript
Router([
  {
    path: '/',
    element: () => createHomeComponent(),
    target: '#main-content'
  },
  {
    path: '/users/:id',
    element: () => createUserProfileComponent()
  }
], {
  prefix: '/dashboard',
  onError: (err) => showErrorNotification(err.message)
});
```

### Navigate

Programmatically navigate to a different route without page reload.

```typescript
Navigate(path: string): void
```

#### Parameters

- `path`: The target path to navigate to (without the prefix)

#### Example

```typescript
// Navigate to about page
document.getElementById('about-btn').addEventListener('click', () => {
  Navigate('/about');
});

// With a configured prefix of '/app', this navigates to '/app/about'
```

### beforeNavigate

Register a function that runs before the next navigation attempt, allowing you to interrupt navigation when necessary.

```typescript
beforeNavigate(guardFn: () => boolean | Promise<boolean>): () => void
```

#### Parameters

- `guardFn`: Function that returns a boolean or Promise<boolean> indicating whether navigation should proceed
- `options`: (Optional) Additional options for future extensions

#### Returns

- A function that can be called to manually remove the guard if needed

#### Example

```typescript
import { beforeNavigate, Navigate, selector } from '@jay-js/system';

// Detect unsaved form changes and confirm before navigating away
const form = selector('form');

let isDirty = false;

form.addEventListener('input', () => {
  isDirty = true;
});

form.addEventListener('submit', () => {
  isDirty = false; // Reset on submit
});

beforeNavigate(() => {
  if (isDirty) {
    return confirm('You have unsaved changes. Do you want to leave this page?');
  }
  return true; // Allow navigation
});

```

### getParams

Retrieves route parameters and query string parameters from the current URL.

```typescript
getParams(): Record<string, string>
```

#### Returns

- An object containing all URL parameters with parameter names as keys

#### Example

```typescript
// For a route defined as '/users/:id' and URL '/users/123?filter=active'
const { id, filter } = getParams();
// id = '123', filter = 'active'

// For more complex route patterns like '/users/:userId/posts/:postId?'
// URL: '/users/123/posts/456?sort=newest'
const { userId, postId, sort } = getParams();
// userId = '123', postId = '456', sort = 'newest'
```

### routerDefineOptions

Configure router options independently of initialization.

```typescript
routerDefineOptions(options: Partial<TRouterOptions>): void
```

#### Parameters

- `options`: Partial router configuration options

#### Example

```typescript
routerDefineOptions({
  prefix: '/app',
  target: '#content',
  onError: (err) => logError(err)
});
```

## Type Definitions

### TRoute

```typescript
type TRoute = {
  path: string;
  element?: (HTMLElement | DocumentFragment) | 
            ((params?: any) => HTMLElement | DocumentFragment) | 
            ((params?: any) => Promise<HTMLElement | DocumentFragment>) | 
            undefined;
  target?: HTMLElement | string;
  layout?: boolean;
  children?: Array<TRoute>;
  import?: () => Promise<any>;
  module?: string;
  params?: Record<string, any>;
  loader?: HTMLElement;
  guard?: (route: TRouteInstance) => boolean | Promise<boolean>;
  metadata?: any;
};
```

- `path`: The URL pattern to match against
- `element`: Element or function to render for this route
- `target`: DOM element or selector where content will be rendered
- `layout`: Whether this route acts as a layout for child routes
- `children`: Nested routes under this route
- `import`: Dynamic import function for lazy loading the module
- `module`: Name of the exported module (optional for default exports)
- `params`: Additional parameters to pass to the module
- `loader`: Custom loading component to display while route is loading
- `guard`: Function that controls access to the route, returning true to allow access
- `metadata`: Custom data to associate with the route for application needs

### TRouteInstance

```typescript
type TRouteInstance = {
  id: string;
  parentLayoutId?: string;
  pattern?: RegExp;
  keys?: Key[];
} & TRoute;
```

### TRouterOptions

```typescript
type TRouterOptions = {
  prefix?: string;
  target?: HTMLElement | string;
  onError?: (error: Error) => void;
  beforeResolve?: (route: TRouteInstance) => boolean | Promise<boolean>;
};
```

## Advanced Usage

### Path Pattern Syntax

The router uses [path-to-regexp](https://github.com/pillarjs/path-to-regexp) for matching URL paths to routes. This allows for powerful path pattern matching features:

#### Named Parameters

Match dynamic segments with named parameters:

```typescript
// Matches /users/123, /users/abc, etc.
{
  path: '/users/:id',
  element: () => createUserComponent()
}
```

#### Optional Parameters

Make parts of the route optional using braces:

```typescript
// Matches /files and /files/document.pdf
{
  path: '/files{/:filename}',
  element: () => createFileViewer()
}
```

#### Wildcard Parameters

Match multiple segments with wildcards:

```typescript
// Matches /docs/getting-started, /docs/getting-started/installation, etc.
{
  path: '/docs/*splat',
  element: () => createDocViewer()
}
```

#### Parameter Modifiers

Parameters can have custom matching patterns:

```typescript
// Only matches numeric IDs
{
  path: '/users/:id(\\d+)',
  element: () => createUserComponent()
}

// Only matches specific file extensions
{
  path: '/files/:name.:ext(jpg|png|gif)',
  element: () => createImageViewer()
}
```

#### Accessing Parameters

Parameters from the URL can be accessed using the `getParams` function:

```typescript
import { getParams } from '@jay-js/system';

function UserProfile() {
  const { id } = getParams();
  // Use id to fetch user data
  return createProfileElement(id);
}
```

For routes with wildcard parameters (`*splat`), the parameter value will be an array of path segments.

### LazyModule Integration

The router supports integration with the LazyModule system for efficient lazy loading of components and modules. Instead of providing an `element` property, you can use the following properties:

```typescript
{
  path: '/dashboard',
  import: () => import('./pages/Dashboard.js'),
  module: 'DashboardComponent', // Optional for named exports
  params: {                     // Optional parameters to pass to the module
    theme: 'dark',
    showSidebar: true
  },
  loader: Box({
    className: "skeleton-loader animate-pulse"
  })
}
```

This approach offers several benefits:
- **Code splitting**: Components are only loaded when needed
- **Automatic garbage collection**: Unused modules can be cleaned up by the LazyModule collector
- **Custom loading indicators**: Works with LazyModule's loader system
- **Memory optimization**: Reduces initial bundle size and memory usage

#### Example with LazyModule

```typescript
import { Router } from '@jay-js/system';

// Create a reusable loading component
function createSkeletonLoader() {
  return Box({
    className: "skeleton-loader",
    children: Array.from({ length: 4 }).map(Box({
      className: "skeleton-item"
    }))
  });
}

Router([
  {
    path: '/',
    element: () => {
      const el = document.createElement('div');
      el.textContent = 'Home Page';
      return el;
    }
  },
  {
    path: '/dashboard',
    import: () => import('./pages/Dashboard.js'),
    module: 'DashboardComponent',
    params: { initialTab: 'overview' },
    loader: createSkeletonLoader()
  },
  {
    path: '/profile',
    import: () => import('./pages/Profile.js'),
    loader: createSkeletonLoader()
    // No module name needed for default exports
  }
], {
  target: '#app'
});
```

### Route Guards

Route guards provide a way to control access to routes based on certain conditions. Guards are functions that return a boolean value - `true` to allow navigation or `false` to prevent it. If a guard throws an error, the router will trigger the `onError` callback.

```typescript
import { Router, Navigate } from '@jay-js/system';

// Authentication service example
const authService = {
  isAuthenticated: false,
  currentUser: null,
  
  login(username, password) {
    // Simulate authentication
    this.isAuthenticated = true;
    this.currentUser = { username, role: 'user' };
    return this.currentUser;
  },
  
  logout() {
    this.isAuthenticated = false;
    this.currentUser = null;
  },
  
  hasRole(role) {
    return this.isAuthenticated && this.currentUser?.role === role;
  }
};

// Create route guards
function authGuard(route) {
  if (!authService.isAuthenticated) {
    // Could redirect here
    Navigate('/login');
    return false;
  }
  return true;
}

function adminGuard(route) {
  if (!authService.hasRole('admin')) {
    throw new Error('Access denied: Admin privileges required');
  }
  return true;
}

// Router with protected routes
Router([
  {
    path: '/',
    element: () => createHomePage()
  },
  {
    path: '/login',
    element: () => createLoginPage()
  },
  {
    path: '/dashboard',
    element: () => createDashboardPage(),
    guard: authGuard
  },
  {
    path: '/admin',
    element: () => createAdminPage(),
    guard: adminGuard
  }
], {
  onError: (error) => {
    // Handle errors from guards
    displayErrorMessage(error.message);
    console.error('Route error:', error);
  }
});
```

### Layouts

Layouts allow you to create a persistent UI structure across multiple routes.

```typescript
Router([
  {
    path: '/admin',
    element: () => createAdminLayout(),
    layout: true,
    children: [
      {
        path: '/dashboard',
        element: () => createDashboardContent()
      },
      {
        path: '/users',
        element: () => createUsersContent()
      }
    ]
  }
]);
```

### Nested Routes

Nested routes allow you to organize your routes hierarchically.

```typescript
Router([
  {
    path: '/products',
    element: () => createProductsPage(),
    children: [
      {
        path: '/:id',
        element: () => createProductDetailPage()
      },
      {
        path: '/:id/reviews',
        element: () => createProductReviewsPage()
      }
    ]
  }
]);
```

### Route Parameters

Define dynamic parts of a route path using various parameter syntax options.

```typescript
Router([
  // Basic parameter
  {
    path: '/users/:id',
    element: () => {
      const { id } = getParams();
      const content = document.createElement('div');
      content.textContent = `User ID: ${id}`;
      return content;
    }
  },
  // Optional parameter
  {
    path: '/products/:category?',
    element: () => {
      const { category } = getParams();
      return createProductList(category);
    }
  },
  // Multiple parameters with constraints
  {
    path: '/articles/:year(\\d{4})/:month(\\d{2})/:slug',
    element: () => {
      const { year, month, slug } = getParams();
      return createArticleView(year, month, slug);
    }
  }
]);
```

### Navigation Guards

Use `beforeNavigate` to protect navigation with custom logic:

```typescript
import { beforeNavigate, Navigate } from '@jay-js/system';

// Form with unsaved changes
function setupFormProtection(formElement) {
  let hasChanges = false;
  
  formElement.addEventListener('input', () => {
    hasChanges = true;
  });

  // Guard is only applied for the next navigation attempt
  beforeNavigate(() => {
    if (hasChanges) {
      const wantsToProceed = confirm('Discard unsaved changes?');
      if (wantsToProceed) {
        hasChanges = false;
        return true;
      }
      return false;
    }
    return true;
  });
  
  formElement.addEventListener('submit', () => {
    hasChanges = false;
  });
}

```

### Navigation Hooks

Configure hooks to run before navigation.

```typescript
Router([
  // Routes definition
], {
  beforeResolve: (route) => {
    // Run before a route is resolved
    if (route.path.includes('/admin') && !isUserLoggedIn()) {
      Navigate('/login'); // Redirect to login
      return false; // Prevent original navigation
    }
    return true; // Allow navigation to proceed
  }
});
```

### Route Metadata

Routes can include custom metadata that can be used for various purposes in your application. Metadata is preserved during route processing and can be accessed when working with routes.

```typescript
Router([
  {
    path: '/dashboard',
    element: () => createDashboardComponent(),
    metadata: {
      title: 'Dashboard',
      icon: 'dashboard-icon',
      permissions: ['view:dashboard'],
      showInMenu: true
    }
  },
  {
    path: '/users',
    element: () => createUsersComponent(),
    metadata: {
      title: 'Users Management',
      icon: 'users-icon', 
      permissions: ['view:users', 'manage:users'],
      showInMenu: true
    }
  },
  {
    path: '/settings',
    element: () => createSettingsComponent(),
    metadata: {
      title: 'Settings',
      icon: 'settings-icon',
      permissions: ['admin'],
      showInMenu: false
    }
  }
]);
```

Metadata can be used for various purposes:

- **Setting document title**: Update the page title based on the current route
  ```typescript
  import { getPotentialMatch } from '@jay-js/system';
  
  function updatePageTitle() {
    const match = getPotentialMatch();
    if (match.route?.metadata?.title) {
      document.title = match.route.metadata.title;
    }
  }
  
  // Call this after navigation events
  window.addEventListener('popstate', updatePageTitle);
  ```

- **Building navigation menus**: Filter and display navigation items
  ```typescript
  import { resolvedRoutes } from '@jay-js/system';
  
  function buildNavMenu() {
    const menuItems = [];
    
    for (const route of resolvedRoutes.values()) {
      if (route.metadata?.showInMenu) {
        menuItems.push({
          path: route.path,
          title: route.metadata.title,
          icon: route.metadata.icon
        });
      }
    }
    
    return createMenu(menuItems);
  }
  ```

- **Access control**: Check permissions before showing UI elements
  ```typescript
  function hasAccess(route) {
    const userPermissions = getUserPermissions(); // Your permission function
    const requiredPermissions = route.metadata?.permissions || [];
    
    return requiredPermissions.some(perm => userPermissions.includes(perm));
  }
  ```

## Examples

### Basic SPA with Advanced Routing

```typescript
import { Router, Navigate, getParams } from '@jay-js/system';

// Helper function to create page elements
function createPage(title, content) {
  const page = document.createElement('div');
  const heading = document.createElement('h1');
  heading.textContent = title;
  
  const text = document.createElement('p');
  text.textContent = content;
  
  page.appendChild(heading);
  page.appendChild(text);
  
  return page;
}

// Define routes with advanced patterns
Router([
  {
    path: '/',
    element: () => createPage('Home', 'Welcome to our website!'),
    target: '#app'
  },
  {
    path: '/about',
    element: () => createPage('About', 'Learn about our company history.'),
    target: '#app'
  },
  {
    path: '/products/:category?',
    element: () => {
      const { category } = getParams();
      return createPage('Products', 
        category ? `Browsing ${category} products` : 'Browse all product categories');
    },
    target: '#app'
  },
  {
    path: '/products/:category/:id(\\d+)',
    element: () => {
      const { category, id } = getParams();
      return createPage('Product Details', 
        `You are viewing ${category} product #${id}`);
    },
    target: '#app'
  },
  {
    path: '/blog/:year(\\d{4})/:month(\\d{2})/:slug',
    element: () => {
      const { year, month, slug } = getParams();
      return createPage('Blog Post', 
        `Reading article "${slug}" from ${month}/${year}`);
    },
    target: '#app'
  },
  {
    path: '*',
    element: () => createPage('Not Found', 'Page not found'),
    target: '#app'
  }
], {
  onError: (err) => {
    console.error('Router error:', err);
  }
});

// Set up navigation
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.createElement('nav');
  
  const links = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'About' },
    { href: '/products', text: 'All Products' },
    { href: '/products/electronics', text: 'Electronics' },
    { href: '/products/electronics/123', text: 'Product #123' },
    { href: '/blog/2025/03/new-features', text: 'Blog Post' }
  ];
  
  links.forEach(link => {
    const a = document.createElement('a');
    a.href = link.href;
    a.textContent = link.text;
    a.addEventListener('click', (e) => {
      e.preventDefault();
      Navigate(link.href);
    });
    nav.appendChild(a);
    nav.appendChild(document.createTextNode(' | '));
  });
  
  document.body.insertBefore(nav, document.getElementById('app'));
});
```
