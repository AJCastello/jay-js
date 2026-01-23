# @jay-js/system - Router

A lightweight, flexible routing library for client-side single-page applications, providing path-based navigation without page reloads. Powered by path-to-regexp for advanced path matching capabilities.

## Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [API Reference](#api-reference)
  - [createRouter](#createrouter)
  - [navigate](#navigate)
  - [beforeNavigate](#beforenavigate)
  - [getParams](#getparams)
  - [Outlet](#outlet)
  - [routerDefineOptions](#routerdefineoptions)
- [Type Definitions](#type-definitions)
  - [TRoute](#troute)
  - [TRouteInstance](#trouteinstance)
  - [TRouterOptions](#trouteroptions)
- [Advanced Usage](#advanced-usage)
  - [Path Pattern Syntax](#path-pattern-syntax)
  - [LazyModule Integration](#lazymodule-integration)
  - [Route Guards](#route-guards)
  - [Layouts with Outlet](#layouts-with-outlet)
  - [Nested Routes](#nested-routes)
  - [Route Parameters](#route-parameters)
  - [Navigation Guards](#navigation-guards)
  - [Navigation Hooks](#navigation-hooks)
  - [Route Metadata](#route-metadata)
- [Examples](#examples)
- [Migration from Previous Version](#migration-from-previous-version)

## Installation

```bash
npm install @jay-js/system
```

## Quick Start

```typescript
import { createRouter, navigate } from "@jay-js/system";

// Define your routes
createRouter(
  [
    {
      path: "/",
      element: () => {
        const el = document.createElement("div");
        el.textContent = "Home Page";
        return el;
      },
    },
    {
      path: "/about",
      element: () => {
        const el = document.createElement("div");
        el.textContent = "About Page";
        return el;
      },
    },
    {
      path: "/contact",
      element: () => {
        const el = document.createElement("div");
        el.textContent = "Contact Page";
        return el;
      },
    },
  ],
  {
    target: "#app",
    prefix: "/app", // Optional: adds a prefix to all routes
  }
);

// Create navigation links
document.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    navigate(link.getAttribute("href"));
  });
});
```

## API Reference

### createRouter

The main function to initialize the routing system.

```typescript
createRouter(routes: Array<TRoute>, options?: TRouterOptions): void
```

#### Parameters

- `routes`: Array of route configuration objects
- `options`: (Optional) Router configuration options

#### Example

```typescript
createRouter(
  [
    {
      path: "/",
      element: () => createHomeComponent(),
    },
    {
      path: "/users/:id",
      element: () => createUserProfileComponent(),
    },
  ],
  {
    target: "#main-content",
    prefix: "/dashboard",
    onError: (err) => showErrorNotification(err.message),
  }
);
```

### navigate

Programmatically navigate to a different route without page reload.

```typescript
navigate(path: string): Promise<void>
```

#### Parameters

- `path`: The target path to navigate to (without the prefix)

#### Example

```typescript
// Navigate to about page
document.getElementById("about-btn").addEventListener("click", () => {
  navigate("/about");
});

// With a configured prefix of '/app', this navigates to '/app/about'
```

### beforeNavigate

Register a function that runs before the next navigation attempt, allowing you to interrupt navigation when necessary. The guard function is automatically removed after being executed once.

```typescript
beforeNavigate(guardFn: () => boolean | Promise<boolean>): () => void
```

#### Parameters

- `guardFn`: Function that returns a boolean or Promise<boolean> indicating whether navigation should proceed

#### Returns

- A function that can be called to manually remove the guard if needed

#### Example

```typescript
import { beforeNavigate, navigate } from "@jay-js/system";

// Detect unsaved form changes and confirm before navigating away
const form = document.querySelector("form");

let isDirty = false;

form.addEventListener("input", () => {
  isDirty = true;
});

form.addEventListener("submit", () => {
  isDirty = false; // Reset on submit
});

beforeNavigate(() => {
  if (isDirty) {
    return confirm("You have unsaved changes. Do you want to leave this page?");
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

### Outlet

Creates a placeholder element for rendering child routes in layouts. Used with nested routes to specify where child content should be rendered.

```typescript
Outlet(): HTMLDivElement
```

#### Returns

- A div element with `display: contents` and `data-router="outlet"` attribute

#### Example

```typescript
import { createRouter, Outlet } from "@jay-js/system";

// Layout component with outlet
function AdminLayout() {
  const layout = document.createElement("div");
  layout.className = "admin-layout";

  const nav = document.createElement("nav");
  nav.textContent = "Admin Navigation";

  const main = document.createElement("main");
  main.appendChild(Outlet());

  layout.appendChild(nav);
  layout.appendChild(main);

  return layout;
}

createRouter([
  {
    path: "/admin",
    element: AdminLayout,
    layout: true,
    children: [
      { path: "/dashboard", element: () => createDashboard() },
      { path: "/users", element: () => createUsersList() }
    ]
  }
], { target: "#app" });
```

With JSX:

```tsx
import { createRouter, Outlet } from "@jay-js/system";

const AdminLayout = () => (
  <div class="admin-layout">
    <nav>Admin Navigation</nav>
    <main>
      <Outlet />
    </main>
  </div>
);

createRouter([
  {
    path: "/admin",
    element: () => <AdminLayout />,
    layout: true,
    children: [
      { path: "/dashboard", element: () => <Dashboard /> },
      { path: "/users", element: () => <UsersList /> }
    ]
  }
], { target: "#app" });
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
  prefix: "/app",
  target: "#content",
  onError: (err) => logError(err),
});
```

## Type Definitions

### TRoute

```typescript
type TRoute = {
  path: string;
  element?:
    | (HTMLElement | DocumentFragment)
    | ((params?: any) => HTMLElement | DocumentFragment)
    | ((params?: any) => Promise<HTMLElement | DocumentFragment>)
    | undefined;
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
} & TRoute;
```

### TRouterOptions

```typescript
type TRouterOptions = {
  prefix?: string;
  target?: HTMLElement | string;
  onError?: (error: Error) => void;
  beforeResolve?: (route: TRouteInstance) => boolean | Promise<boolean>;
  setPathname?: () => string;
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
import { getParams } from "@jay-js/system";

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
  loader: createSkeletonLoader()
}
```

This approach offers several benefits:

- **Code splitting**: Components are only loaded when needed
- **Automatic garbage collection**: Unused modules can be cleaned up by the LazyModule collector
- **Custom loading indicators**: Works with LazyModule's loader system
- **Memory optimization**: Reduces initial bundle size and memory usage

#### Example with LazyModule

```typescript
import { createRouter } from "@jay-js/system";

// Create a reusable loading component
function createSkeletonLoader() {
  const loader = document.createElement("div");
  loader.className = "skeleton-loader";
  loader.innerHTML = `
    <div class="skeleton-item"></div>
    <div class="skeleton-item"></div>
    <div class="skeleton-item"></div>
  `;
  return loader;
}

createRouter(
  [
    {
      path: "/",
      element: () => {
        const el = document.createElement("div");
        el.textContent = "Home Page";
        return el;
      },
    },
    {
      path: "/dashboard",
      import: () => import("./pages/Dashboard.js"),
      module: "DashboardComponent",
      params: { initialTab: "overview" },
      loader: createSkeletonLoader(),
    },
    {
      path: "/profile",
      import: () => import("./pages/Profile.js"),
      loader: createSkeletonLoader(),
      // No module name needed for default exports
    },
  ],
  {
    target: "#app",
  }
);
```

### Route Guards

Route guards provide a way to control access to routes based on certain conditions. Guards are functions that return a boolean value - `true` to allow navigation or `false` to prevent it. If a guard throws an error, the router will trigger the `onError` callback.

```typescript
import { createRouter, navigate } from "@jay-js/system";

// Authentication service example
const authService = {
  isAuthenticated: false,
  currentUser: null,

  login(username, password) {
    // Simulate authentication
    this.isAuthenticated = true;
    this.currentUser = { username, role: "user" };
    return this.currentUser;
  },

  logout() {
    this.isAuthenticated = false;
    this.currentUser = null;
  },

  hasRole(role) {
    return this.isAuthenticated && this.currentUser?.role === role;
  },
};

// Create route guards
function authGuard(route) {
  if (!authService.isAuthenticated) {
    // Could redirect here
    navigate("/login");
    return false;
  }
  return true;
}

function adminGuard(route) {
  if (!authService.hasRole("admin")) {
    throw new Error("Access denied: Admin privileges required");
  }
  return true;
}

// Router with protected routes
createRouter(
  [
    {
      path: "/",
      element: () => createHomePage(),
    },
    {
      path: "/login",
      element: () => createLoginPage(),
    },
    {
      path: "/dashboard",
      element: () => createDashboardPage(),
      guard: authGuard,
    },
    {
      path: "/admin",
      element: () => createAdminPage(),
      guard: adminGuard,
    },
  ],
  {
    target: "#app",
    onError: (error) => {
      // Handle errors from guards
      displayErrorMessage(error.message);
      console.error("Route error:", error);
    },
  }
);
```

### Layouts with Outlet

Layouts allow you to create a persistent UI structure across multiple routes. Use the `Outlet` component to specify where child content should be rendered.

```typescript
import { createRouter, Outlet } from "@jay-js/system";

function AdminLayout() {
  const layout = document.createElement("div");
  layout.className = "admin-layout";

  const nav = document.createElement("nav");
  nav.innerHTML = `
    <a href="/admin/dashboard">Dashboard</a>
    <a href="/admin/users">Users</a>
  `;

  const main = document.createElement("main");
  main.appendChild(Outlet());

  layout.appendChild(nav);
  layout.appendChild(main);

  return layout;
}

createRouter([
  {
    path: "/admin",
    element: AdminLayout,
    layout: true,
    children: [
      {
        path: "/dashboard",
        element: () => createDashboardContent(),
      },
      {
        path: "/users",
        element: () => createUsersContent(),
      },
    ],
  },
], { target: "#app" });
```

With JSX:

```tsx
import { createRouter, navigate, Outlet } from "@jay-js/system";

const AdminLayout = () => (
  <div class="admin-layout">
    <nav>
      <a href="/admin/dashboard" onclick={(e) => { e.preventDefault(); navigate("/admin/dashboard"); }}>
        Dashboard
      </a>
      <a href="/admin/users" onclick={(e) => { e.preventDefault(); navigate("/admin/users"); }}>
        Users
      </a>
    </nav>
    <main>
      <Outlet />
    </main>
  </div>
);

createRouter([
  {
    path: "/admin",
    element: () => <AdminLayout />,
    layout: true,
    children: [
      { path: "/dashboard", element: () => <Dashboard /> },
      { path: "/users", element: () => <Users /> }
    ]
  }
], { target: "#app" });
```

### Nested Routes

Nested routes allow you to organize your routes hierarchically.

```typescript
createRouter([
  {
    path: "/products",
    element: () => createProductsPage(),
    children: [
      {
        path: "/:id",
        element: () => createProductDetailPage(),
      },
      {
        path: "/:id/reviews",
        element: () => createProductReviewsPage(),
      },
    ],
  },
]);
```

### Route Parameters

Define dynamic parts of a route path using various parameter syntax options.

```typescript
import { createRouter, getParams } from "@jay-js/system";

createRouter([
  // Basic parameter
  {
    path: "/users/:id",
    element: () => {
      const { id } = getParams();
      const content = document.createElement("div");
      content.textContent = `User ID: ${id}`;
      return content;
    },
  },
  // Optional parameter
  {
    path: "/products/:category?",
    element: () => {
      const { category } = getParams();
      return createProductList(category);
    },
  },
  // Multiple parameters with constraints
  {
    path: "/articles/:year(\\d{4})/:month(\\d{2})/:slug",
    element: () => {
      const { year, month, slug } = getParams();
      return createArticleView(year, month, slug);
    },
  },
]);
```

### Navigation Guards

Use `beforeNavigate` to protect navigation with custom logic:

```typescript
import { beforeNavigate, navigate } from "@jay-js/system";

// Form with unsaved changes
function setupFormProtection(formElement) {
  let hasChanges = false;

  formElement.addEventListener("input", () => {
    hasChanges = true;
  });

  // Guard is only applied for the next navigation attempt
  // and is automatically removed after execution
  beforeNavigate(() => {
    if (hasChanges) {
      const wantsToProceed = confirm("Discard unsaved changes?");
      if (wantsToProceed) {
        hasChanges = false;
        return true;
      }
      return false;
    }
    return true;
  });

  formElement.addEventListener("submit", () => {
    hasChanges = false;
  });
}
```

### Navigation Hooks

Configure hooks to run before navigation.

```typescript
createRouter(
  [
    // Routes definition
  ],
  {
    beforeResolve: (route) => {
      // Run before a route is resolved
      if (route.path.includes("/admin") && !isUserLoggedIn()) {
        navigate("/login"); // Redirect to login
        return false; // Prevent original navigation
      }
      return true; // Allow navigation to proceed
    },
  }
);
```

### Route Metadata

Routes can include custom metadata that can be used for various purposes in your application. Metadata is preserved during route processing and can be accessed when working with routes.

```typescript
createRouter([
  {
    path: "/dashboard",
    element: () => createDashboardComponent(),
    metadata: {
      title: "Dashboard",
      icon: "dashboard-icon",
      permissions: ["view:dashboard"],
      showInMenu: true,
    },
  },
  {
    path: "/users",
    element: () => createUsersComponent(),
    metadata: {
      title: "Users Management",
      icon: "users-icon",
      permissions: ["view:users", "manage:users"],
      showInMenu: true,
    },
  },
  {
    path: "/settings",
    element: () => createSettingsComponent(),
    metadata: {
      title: "Settings",
      icon: "settings-icon",
      permissions: ["admin"],
      showInMenu: false,
    },
  },
]);
```

Metadata can be used for various purposes:

- **Setting document title**: Update the page title based on the current route

  ```typescript
  import { resolvedRoutes } from "@jay-js/system";

  function updatePageTitle() {
    for (const route of resolvedRoutes.values()) {
      if (route.metadata?.title) {
        document.title = route.metadata.title;
        break;
      }
    }
  }

  // Call this after navigation events
  window.addEventListener("popstate", updatePageTitle);
  ```

- **Building navigation menus**: Filter and display navigation items

  ```typescript
  import { resolvedRoutes } from "@jay-js/system";

  function buildNavMenu() {
    const menuItems = [];

    for (const route of resolvedRoutes.values()) {
      if (route.metadata?.showInMenu) {
        menuItems.push({
          path: route.path,
          title: route.metadata.title,
          icon: route.metadata.icon,
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

    return requiredPermissions.some((perm) => userPermissions.includes(perm));
  }
  ```

## Examples

### Basic SPA with Advanced Routing

```typescript
import { createRouter, navigate, getParams } from "@jay-js/system";

// Helper function to create page elements
function createPage(title, content) {
  const page = document.createElement("div");
  const heading = document.createElement("h1");
  heading.textContent = title;

  const text = document.createElement("p");
  text.textContent = content;

  page.appendChild(heading);
  page.appendChild(text);

  return page;
}

// Define routes with advanced patterns
createRouter(
  [
    {
      path: "/",
      element: () => createPage("Home", "Welcome to our website!"),
    },
    {
      path: "/about",
      element: () => createPage("About", "Learn about our company history."),
    },
    {
      path: "/products/:category?",
      element: () => {
        const { category } = getParams();
        return createPage(
          "Products",
          category
            ? `Browsing ${category} products`
            : "Browse all product categories"
        );
      },
    },
    {
      path: "/products/:category/:id(\\d+)",
      element: () => {
        const { category, id } = getParams();
        return createPage(
          "Product Details",
          `You are viewing ${category} product #${id}`
        );
      },
    },
    {
      path: "/blog/:year(\\d{4})/:month(\\d{2})/:slug",
      element: () => {
        const { year, month, slug } = getParams();
        return createPage(
          "Blog Post",
          `Reading article "${slug}" from ${month}/${year}`
        );
      },
    },
    {
      path: "*",
      element: () => createPage("Not Found", "Page not found"),
    },
  ],
  {
    target: "#app",
    onError: (err) => {
      console.error("Router error:", err);
    },
  }
);

// Set up navigation
document.addEventListener("DOMContentLoaded", () => {
  const nav = document.createElement("nav");

  const links = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
    { href: "/products", text: "All Products" },
    { href: "/products/electronics", text: "Electronics" },
    { href: "/products/electronics/123", text: "Product #123" },
    { href: "/blog/2025/03/new-features", text: "Blog Post" },
  ];

  links.forEach((link) => {
    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.text;
    a.addEventListener("click", (e) => {
      e.preventDefault();
      navigate(link.href);
    });
    nav.appendChild(a);
    nav.appendChild(document.createTextNode(" | "));
  });

  document.body.insertBefore(nav, document.getElementById("app"));
});
```

### JSX Integration

```tsx
import { createRouter, navigate, getParams, Outlet } from "@jay-js/system";

// Components
const Home = () => <div><h1>Home</h1><p>Welcome!</p></div>;
const About = () => <div><h1>About</h1><p>About us</p></div>;

const UserProfile = () => {
  const { id } = getParams();
  return <div><h1>User Profile</h1><p>User ID: {id}</p></div>;
};

const AdminLayout = () => (
  <div class="admin">
    <nav>
      <a href="/admin/dashboard" onclick={(e) => { e.preventDefault(); navigate("/admin/dashboard"); }}>
        Dashboard
      </a>
      <a href="/admin/users" onclick={(e) => { e.preventDefault(); navigate("/admin/users"); }}>
        Users
      </a>
    </nav>
    <main><Outlet /></main>
  </div>
);

const Dashboard = () => <div><h2>Dashboard</h2></div>;
const UsersList = () => <div><h2>Users List</h2></div>;

// Router setup
createRouter([
  { path: "/", element: () => <Home /> },
  { path: "/about", element: () => <About /> },
  { path: "/user/:id", element: () => <UserProfile /> },
  {
    path: "/admin",
    element: () => <AdminLayout />,
    layout: true,
    children: [
      { path: "/dashboard", element: () => <Dashboard /> },
      { path: "/users", element: () => <UsersList /> }
    ]
  }
], { target: "#app" });
```

## Migration from Previous Version

If you're upgrading from a previous version of the router, here are the key changes:

### Function Names

| Old API | New API |
|---------|---------|
| `Router(routes, options)` | `createRouter(routes, options)` |
| `Navigate(path)` | `navigate(path)` |

### New Features

- **`Outlet`**: New component for specifying where child routes should render in layouts
- **Async Navigation Guards**: `beforeNavigate` guards are now automatically removed after execution
- **`navigate` is async**: Returns a Promise that resolves after navigation completes

### Example Migration

**Before:**

```typescript
import { Router, Navigate } from "@jay-js/system";

Router([
  { path: "/", element: () => <Home /> },
  { path: "/about", element: () => <About /> }
], { target: "#app" });

Navigate("/about");
```

**After:**

```typescript
import { createRouter, navigate } from "@jay-js/system";

createRouter([
  { path: "/", element: () => <Home /> },
  { path: "/about", element: () => <About /> }
], { target: "#app" });

navigate("/about");
```
