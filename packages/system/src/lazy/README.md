# Jay JS - Lazy LoadingModule

The `LazyModule` component is a utility for loading and rendering components or modules asynchronously in your web application. It efficiently manages the lifecycle of imported modules by collecting unused modules and unmounting them from memory. This helps optimize the performance of your application by reducing memory consumption and improving load times.

## Features

- Dynamically imports and renders modules.
- Efficient module lifecycle management.
- Graceful error handling for failed imports.
- Memory optimization by unmounting unused modules.
- Idle time reset to manage module lifecycle based on user activity.

## How it works

The `LazyModule` component takes a module object as its parameter. This object contains properties such as the module name, import function, and any additional properties required by the module. When the `LazyModule` component is called, it checks if the module has already been imported. If it has, the module is rendered immediately. If not, the import function is called to load the module dynamically. 

While the module is being imported, a loader component is displayed. Once the import is complete, the loader component is replaced with the imported module's content. If the import fails, an error message is displayed.

The `LazyModule` component also manages the module lifecycle by periodically checking for modules that have not been used recently and unmounting them from memory.

## Usage

To use the `LazyModule` component, first import it into your project:

```typescript
import { LazyModule } from "jay-js/lazy-module";
```

Next, create a module object containing the module's name, import function, and any additional properties required by the module. Here's an example:

```typescript
const module = {
  module: "ForgotPassword",
  import: () => import("../modules/ForgotPassword"),
};
```

Finally, pass the module object to the `LazyModule` component:

```typescript
export function MyComponent() {
  return LazyModule(module);
}
```

The `LazyModule` component will take care of importing and rendering the module as needed, optimizing the performance of your application.

## API

### LazyModule

Function that returns an HTMLElement with the loaded module.

#### Props

- `module`: Required. The module's name.
- `import`: Required. A function that returns a Promise for importing the module.
- `collect`: Optional. A boolean that indicates whether the module should be collected when it's not in use (default: true).

### Example

```typescript
import { LazyModule } from "jay-js/lazy-module";

export function MyComponent() {
  const module = {
    module: "ForgotPassword",
    import: () => import("../modules/ForgotPassword"),
  };
  return LazyModule(module);
}
```

That's it! Now you can use the `LazyModule` component to efficiently manage and render components in your web application.