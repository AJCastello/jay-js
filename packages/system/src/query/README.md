# Query & Mutation System - @jay-js/system

A powerful, type-safe data fetching and mutation system for JavaScript and TypeScript applications with built-in caching, automatic revalidation, and retry support.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Query](#query)
  - [Basic Usage](#basic-usage)
  - [Query Options](#query-options)
  - [Reactive Keys](#reactive-keys)
  - [Query States](#query-states)
  - [Control Methods](#control-methods)
- [Mutation](#mutation)
  - [Basic Usage](#mutation-basic-usage)
  - [Mutation Options](#mutation-options)
  - [Optimistic Updates](#optimistic-updates)
  - [Cache Invalidation](#cache-invalidation)
- [Cache Management](#cache-management)
  - [Query Cache API](#query-cache-api)
  - [Cache Invalidation Patterns](#cache-invalidation-patterns)
- [Prefetching](#prefetching)
- [API Reference](#api-reference)
  - [query()](#query-1)
  - [mutation()](#mutation-1)
  - [prefetchQuery()](#prefetchquery)
  - [queryCache](#querycache)
- [JSX Integration](#jsx-integration)
- [TypeScript Integration](#typescript-integration)

## Features

- Reactive data fetching with automatic state management
- Built-in caching with configurable stale time and garbage collection
- Automatic retry with exponential backoff
- Request deduplication for concurrent requests
- Refetch on window focus and network reconnect
- Mutation support with optimistic updates
- Cache invalidation by key, pattern, or predicate
- AbortController support for request cancellation
- Type-safe API with full TypeScript support

## Installation

```bash
npm install @jay-js/system
```

## Query

### Basic Usage

Create a reactive query to fetch data with automatic caching and state management.

```typescript
import { query } from "@jay-js/system";

interface User {
  id: number;
  name: string;
  email: string;
}

const usersQuery = query<User[]>("users", async (signal) => {
  const res = await fetch("/api/users", { signal });
  return res.json();
});

// Access reactive states
if (usersQuery.isLoading) {
  console.log("Loading...");
}

if (usersQuery.isSuccess) {
  console.log("Users:", usersQuery.data);
}

if (usersQuery.isError) {
  console.log("Error:", usersQuery.error);
}
```

### Query Options

Configure query behavior with options:

```typescript
import { query } from "@jay-js/system";

const todosQuery = query("todos", fetchTodos, {
  // Run query automatically (default: true)
  enabled: true,

  // Time in ms before data is considered stale (default: 0)
  staleTime: 5000,

  // Time in ms before inactive queries are garbage collected (default: 300000)
  cacheTime: 300000,

  // Refetch when window regains focus (default: false)
  refetchOnFocus: true,

  // Refetch when network reconnects (default: false)
  refetchOnReconnect: true,

  // Interval in ms to automatically refetch, or false to disable (default: false)
  refetchInterval: 30000,

  // Number of retry attempts or false to disable (default: 3)
  retry: 3,

  // Delay between retries - exponential backoff by default
  retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30000),

  // Initial data before first fetch
  initialData: [],

  // Callbacks
  onSuccess: (data) => console.log("Fetched:", data),
  onError: (error) => console.error("Failed:", error)
});
```

### Reactive Keys

Use a function to create reactive query keys that automatically refetch when dependencies change:

```typescript
import { query } from "@jay-js/system";
import { state, effect } from "@jay-js/system";

const userId = state(1);

const userQuery = query(
  // Reactive key - query refetches when userId changes
  () => `user-${userId.value}`,
  async (signal) => {
    const res = await fetch(`/api/users/${userId.value}`, { signal });
    return res.json();
  }
);

// Later: change userId triggers new fetch
userId.value = 2;
```

### Query States

Access query states to handle different loading scenarios:

```typescript
const usersQuery = query("users", fetchUsers);

// Reactive state properties
usersQuery.data;        // TData | null - Query data
usersQuery.error;       // Error | null - Query error
usersQuery.isLoading;   // boolean - First load (no cached data)
usersQuery.isFetching;  // boolean - Any fetch (including background refetches)
usersQuery.isError;     // boolean - Error state
usersQuery.isSuccess;   // boolean - Success state
usersQuery.status;      // "idle" | "loading" | "success" | "error"
```

### Control Methods

Control query execution programmatically:

```typescript
const usersQuery = query("users", fetchUsers);

// Manually trigger a refetch
await usersQuery.refetch();

// Invalidate cache and refetch
usersQuery.invalidate();

// Reset query to initial state
usersQuery.reset();

// Cancel ongoing request
usersQuery.cancel();

// Cleanup and dispose query
usersQuery.dispose();
```

## Mutation

### Mutation Basic Usage

Create mutations for write operations (POST, PUT, DELETE):

```typescript
import { mutation } from "@jay-js/system";

interface CreateUserInput {
  name: string;
  email: string;
}

interface User {
  id: number;
  name: string;
  email: string;
}

const createUser = mutation<User, Error, CreateUserInput>(
  async (input, signal) => {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(input),
      signal
    });
    return res.json();
  }
);

// Execute mutation
try {
  const newUser = await createUser.mutate({
    name: "John",
    email: "john@example.com"
  });
  console.log("Created:", newUser);
} catch (error) {
  console.error("Failed:", error);
}

// Or use mutateAsync (doesn't throw)
const result = await createUser.mutateAsync(input);
if (result) {
  console.log("Created:", result);
}
```

### Mutation Options

Configure mutation behavior with callbacks and invalidation:

```typescript
import { mutation } from "@jay-js/system";

const updateUser = mutation(
  async (user, signal) => {
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      signal
    });
    return res.json();
  },
  {
    // Number of retry attempts (default: false)
    retry: 2,

    // Callbacks
    onMutate: (variables) => {
      // Called before mutation executes
      console.log("Updating:", variables);
      return { previousData: "snapshot" }; // Context for rollback
    },

    onSuccess: (data, variables, context) => {
      console.log("Updated:", data);
    },

    onError: (error, variables, context) => {
      console.error("Failed:", error);
      // Use context for rollback
    },

    onSettled: (data, error, variables, context) => {
      // Called on success or error
      console.log("Mutation completed");
    },

    // Cache invalidation on success
    invalidateQueries: ["users", "user-list"],
    invalidatePattern: "user-*",
    invalidateIf: (key, entry) => {
      const age = Date.now() - entry.timestamp;
      return age > 60000;
    }
  }
);
```

### Optimistic Updates

Implement optimistic updates with automatic rollback on error:

```typescript
import { mutation, queryCache } from "@jay-js/system";

const updateUser = mutation(
  async (user, signal) => {
    const res = await fetch(`/api/users/${user.id}`, {
      method: "PUT",
      body: JSON.stringify(user),
      signal
    });
    return res.json();
  },
  {
    onMutate: async (newUser) => {
      // Snapshot current state for rollback
      const previousUser = queryCache.get(`user-${newUser.id}`);

      // Optimistically update cache
      if (previousUser) {
        queryCache.set(`user-${newUser.id}`, newUser, 300000);
      }

      return { previousUser };
    },

    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousUser) {
        queryCache.set(
          `user-${variables.id}`,
          context.previousUser.data,
          300000
        );
      }
    },

    onSuccess: () => {
      // Invalidate related queries
      queryCache.delete("users");
    }
  }
);
```

### Cache Invalidation

Multiple ways to invalidate cache after mutations:

```typescript
import { mutation } from "@jay-js/system";

const createPost = mutation(createPostFn, {
  // Invalidate specific keys
  invalidateQueries: ["posts", "user-posts"],

  // Invalidate by pattern (supports * and ?)
  invalidatePattern: "post-*",

  // Invalidate by predicate
  invalidateIf: (key, entry) => key.startsWith("post-")
});
```

## Cache Management

### Query Cache API

Access and manipulate the global query cache:

```typescript
import { queryCache } from "@jay-js/system";

// Get cached data
const cached = queryCache.get<User[]>("users");
if (cached) {
  console.log("Cached data:", cached.data);
  console.log("Cached at:", cached.timestamp);
}

// Set cache data
queryCache.set("users", userData, 300000); // 5 minute cache time

// Check if data is stale
const isStale = queryCache.isStale("users", 5000); // 5 second stale time

// Delete cache entry
queryCache.delete("users");

// Clear all cache
queryCache.clear();

// Get all cache keys
const keys = queryCache.getKeys();

// Get cache size
const size = queryCache.size;
```

### Cache Invalidation Patterns

Invalidate cache using patterns or predicates:

```typescript
import { queryCache } from "@jay-js/system";

// Invalidate by glob pattern
queryCache.invalidatePattern("user-*");   // Matches user-1, user-123, etc.
queryCache.invalidatePattern("user-?");   // Matches user-1, user-2, etc.

// Invalidate by RegExp
queryCache.invalidatePattern(/^user-\d+$/);

// Invalidate by predicate
queryCache.invalidateQueries((key, entry) => {
  const age = Date.now() - entry.timestamp;
  return age > 60000; // Invalidate queries older than 1 minute
});

// Listen for cache changes
const unsubscribe = queryCache.onChange("users", (data) => {
  console.log("Users cache updated:", data);
});

// Cleanup listener
unsubscribe();
```

## Prefetching

Prefetch data before it's needed for instant availability:

```typescript
import { prefetchQuery, query } from "@jay-js/system";

// Prefetch on route change
router.beforeEach(async (to) => {
  if (to.path === "/users") {
    await prefetchQuery("users", fetchUsers);
  }
});

// Later, component mounts instantly
const usersQuery = query("users", fetchUsers);
// -> isLoading = false (cache hit!)
// -> data = [prefetched users]
```

Prefetch options:

```typescript
await prefetchQuery("users", fetchUsers, {
  // Time in ms before data is considered stale (default: 0)
  staleTime: 5000,

  // Cache time (default: 300000)
  cacheTime: 300000,

  // Force refetch even if cached (default: false)
  force: true
});
```

## API Reference

### query()

```typescript
function query<TData = unknown, TError = Error>(
  key: TQueryKey,
  fetcher: TQueryFetcher<TData>,
  options?: TQueryOptions<TData>
): TQueryStore<TData, TError>
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | `string \| (() => string)` | Unique query identifier, can be reactive |
| `fetcher` | `(signal: AbortSignal) => Promise<TData>` | Async function to fetch data |
| `options` | `TQueryOptions<TData>` | Query configuration options |

**Returns:** `TQueryStore<TData, TError>` with states and methods.

### mutation()

```typescript
function mutation<TData, TError, TVariables, TContext>(
  fetcher: TMutationFetcher<TData, TVariables>,
  options?: TMutationOptions<TData, TError, TVariables, TContext>
): TMutationStore<TData, TError, TVariables, TContext>
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `fetcher` | `(variables: TVariables, signal: AbortSignal) => Promise<TData>` | Async function to perform mutation |
| `options` | `TMutationOptions` | Mutation configuration options |

**Returns:** `TMutationStore` with states and methods.

### prefetchQuery()

```typescript
function prefetchQuery<TData>(
  key: TQueryKey,
  fetcher: TQueryFetcher<TData>,
  options?: TPrefetchOptions
): Promise<void>
```

**Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `key` | `TQueryKey` | Query key to prefetch |
| `fetcher` | `TQueryFetcher<TData>` | Async function to fetch data |
| `options` | `TPrefetchOptions` | Prefetch configuration options |

### queryCache

Global cache singleton with methods:

| Method | Description |
|--------|-------------|
| `get<T>(key)` | Get cached entry |
| `set<T>(key, data, cacheTime)` | Set cache entry |
| `delete(key)` | Delete cache entry |
| `clear()` | Clear all cache |
| `isStale(key, staleTime)` | Check if data is stale |
| `invalidatePattern(pattern)` | Invalidate by glob/regex |
| `invalidateQueries(predicate)` | Invalidate by predicate |
| `onChange(key, callback)` | Listen for cache changes |
| `getKeys()` | Get all cache keys |
| `size` | Get cache size |

## JSX Integration

```tsx
import { query, mutation } from "@jay-js/system";
import { effect } from "@jay-js/system";

// Fetch users
const usersQuery = query<User[]>("users", async (signal) => {
  const res = await fetch("/api/users", { signal });
  return res.json();
});

// Create user mutation
const createUser = mutation(
  async (user, signal) => {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      signal
    });
    return res.json();
  },
  {
    onSuccess: () => usersQuery.invalidate()
  }
);

const UserList = () => {
  const container = <div class="user-list"></div>;

  effect(() => {
    if (usersQuery.isLoading) {
      container.innerHTML = "<p>Loading...</p>";
      return;
    }

    if (usersQuery.isError) {
      container.innerHTML = `<p>Error: ${usersQuery.error?.message}</p>`;
      return;
    }

    container.innerHTML = "";
    usersQuery.data?.forEach(user => {
      container.appendChild(<div class="user">{user.name}</div>);
    });
  });

  return container;
};

const CreateUserForm = () => {
  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    await createUser.mutate({
      name: formData.get("name") as string,
      email: formData.get("email") as string
    });

    form.reset();
  };

  return (
    <form onsubmit={handleSubmit}>
      <input name="name" placeholder="Name" required />
      <input name="email" type="email" placeholder="Email" required />
      <button type="submit" disabled={createUser.isLoading}>
        {createUser.isLoading ? "Creating..." : "Create User"}
      </button>
    </form>
  );
};
```

## TypeScript Integration

Full type safety with generics:

```typescript
import { query, mutation } from "@jay-js/system";
import type { TQueryStore, TMutationStore } from "@jay-js/system";

// Define types
interface User {
  id: number;
  name: string;
  email: string;
}

interface CreateUserInput {
  name: string;
  email: string;
}

// Type-safe query
const usersQuery: TQueryStore<User[]> = query<User[]>(
  "users",
  async (signal) => {
    const res = await fetch("/api/users", { signal });
    return res.json();
  }
);

// Type-safe mutation
const createUser: TMutationStore<User, Error, CreateUserInput> = mutation<
  User,
  Error,
  CreateUserInput
>(
  async (input, signal) => {
    const res = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify(input),
      signal
    });
    return res.json();
  }
);

// Type-safe access
const users: User[] | null = usersQuery.data;
const newUser: User = await createUser.mutate({ name: "John", email: "john@example.com" });
```

### Type Definitions

```typescript
type TQueryKey = string | (() => string);

type TQueryFetcher<TData> = (signal: AbortSignal) => Promise<TData>;

type TQueryOptions<TData> = {
  enabled?: boolean;
  staleTime?: number;
  cacheTime?: number;
  refetchOnFocus?: boolean;
  refetchOnReconnect?: boolean;
  refetchInterval?: number | false;
  retry?: number | boolean;
  retryDelay?: number | ((attempt: number) => number);
  onSuccess?: (data: TData) => void;
  onError?: (error: Error) => void;
  initialData?: TData;
};

type TQueryStatus = "idle" | "loading" | "success" | "error";

type TQueryStore<TData, TError = Error> = {
  data: TData | null;
  error: TError | null;
  isLoading: boolean;
  isFetching: boolean;
  isError: boolean;
  isSuccess: boolean;
  status: TQueryStatus;
  refetch: () => Promise<void>;
  invalidate: () => void;
  reset: () => void;
  cancel: () => void;
  dispose: () => void;
};

type TMutationFetcher<TData, TVariables> = (
  variables: TVariables,
  signal: AbortSignal
) => Promise<TData>;

type TMutationOptions<TData, TError, TVariables, TContext> = {
  onMutate?: (variables: TVariables) => TContext | Promise<TContext>;
  onSuccess?: (data: TData, variables: TVariables, context: TContext | undefined) => void | Promise<void>;
  onError?: (error: TError, variables: TVariables, context: TContext | undefined) => void | Promise<void>;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables, context: TContext | undefined) => void | Promise<void>;
  retry?: number | boolean;
  retryDelay?: number | ((attempt: number) => number);
  invalidateQueries?: string[];
  invalidatePattern?: string | RegExp;
  invalidateIf?: (key: string, entry: TCacheEntry<any>) => boolean;
};

type TMutationStatus = "idle" | "loading" | "success" | "error";

type TMutationStore<TData, TError, TVariables, TContext> = {
  data: TData | null;
  error: TError | null;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  isIdle: boolean;
  status: TMutationStatus;
  mutate: (variables: TVariables) => Promise<TData>;
  mutateAsync: (variables: TVariables) => Promise<TData | undefined>;
  reset: () => void;
  cancel: () => void;
};

type TPrefetchOptions = {
  staleTime?: number;
  cacheTime?: number;
  force?: boolean;
};

type TCacheEntry<TData> = {
  data: TData;
  timestamp: number;
  subscribers: number;
};
```
