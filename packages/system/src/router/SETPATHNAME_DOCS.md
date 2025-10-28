## setPathname Option

The `setPathname` option allows you to customize how the router determines the current path for routing. This is useful for special routing scenarios where you need to override the default behavior of using `window.location.pathname`.

### TRouterOptions Definition

```typescript
type TRouterOptions = {
  prefix?: string;
  target?: HTMLElement | string;
  onError?: (error: Error) => void;
  beforeResolve?: (route: TRouteInstance) => boolean | Promise<boolean>;
  setPathname?: () => string;
};
```

### Usage

The `setPathname` option should be a function that returns a string representing the pathname to use for route matching.

#### Example

```typescript
Router(
  [
    // Your routes definition
  ],
  {
    // Custom path determination logic
    setPathname: () => {
      // Example: Get path from a custom location in your application state
      return myAppState.currentPath;

      // Or add special handling for different scenarios
      // const path = window.location.pathname;
      // return path.startsWith('/special') ? '/dashboard' : path;
    },
  }
);
```

### Use Cases

1. **Custom routing mechanisms**: Implement hash-based routing or other non-standard URL patterns
2. **Testing**: Override paths for unit or integration testing
3. **Embedded applications**: Handle routing when your app is embedded in another application
4. **Special redirects**: Implement path rewriting logic before route matching
5. **Server-side rendering compatibility**: Provide paths from server context

### Integration with Other Options

The `setPathname` function works in conjunction with the `prefix` option. If both are specified, the prefix is applied to the path returned by `setPathname`.

```typescript
Router(
  [
    // Routes
  ],
  {
    prefix: "/app",
    setPathname: () => "/dashboard", // Will effectively use '/app/dashboard'
  }
);
```
