# @jay-js/system - Router

A lightweight, flexible routing library for client-side single-page applications, providing path-based navigation without page reloads.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [Router](#router)
  - [Navigate](#navigate)
  - [getParams](#getparams)
  - [routerDefineOptions](#routerdefineoptions)
- [Type Definitions](#type-definitions)
  - [TRoute](#troute)
  - [TRouteInstance](#trouteinstance)
  - [TRouterOptions](#trouteroptions)
- [Advanced Usage](#advanced-usage)
  - [Layouts](#layouts)
  - [Nested Routes](#nested-routes)
  - [Route Parameters](#route-parameters)
  - [Navigation Hooks](#navigation-hooks)
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
  element?: 
    | (HTMLElement | DocumentFragment)
    | ((props?: any) => HTMLElement | DocumentFragment)
    | ((props?: any) => Promise<HTMLElement | DocumentFragment>)
    | undefined;
  target?: HTMLElement | string;
  layout?: boolean;
  children?: Array<TRoute>;
};
```

### TRouteInstance

```typescript
type TRouteInstance = {
  id: string;
  parentLayoutId?: string;
} & TRoute;
```

### TRouterOptions

```typescript
type TRouterOptions = {
  prefix?: string;
  target?: HTMLElement | string;
  onError?: (error: Error) => void;
  onNavigate?: (route: TRouteInstance) => void;
  beforeResolve?: (route: TRouteInstance) => boolean | Promise<boolean>;
};
```

## Advanced Usage

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

Define dynamic parts of a route path using the `:paramName` syntax.

```typescript
Router([
  {
    path: '/users/:id',
    element: () => {
      const { id } = getParams();
      const content = document.createElement('div');
      content.textContent = `User ID: ${id}`;
      return content;
    }
  }
]);
```

### Navigation Hooks

Configure hooks to run before or after navigation.

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
  },
  onNavigate: (route) => {
    // Run after successful navigation
    analyticsTracker.trackPageView(route.path);
  }
});
```

## Examples

### Basic SPA with Multiple Pages

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

// Define routes
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
    path: '/products/:id',
    element: () => {
      const { id } = getParams();
      return createPage('Product Details', `You are viewing product ${id}`);
    },
    target: '#app'
  }
], {
  onError: (err) => {
    console.error('Router error:', err);
    const errorElement = createPage('Error', 'Page not found');
    document.getElementById('app').appendChild(errorElement);
  }
});

// Set up navigation
document.addEventListener('DOMContentLoaded', () => {
  const nav = document.createElement('nav');
  
  const links = [
    { href: '/', text: 'Home' },
    { href: '/about', text: 'About' },
    { href: '/products/1', text: 'Product 1' },
    { href: '/products/2', text: 'Product 2' }
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
