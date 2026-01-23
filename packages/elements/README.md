# @jay-js/elements

## DEPRECATED

> **Deprecated since January 14, 2026**

**DO NOT USE THIS PACKAGE**

This package has been deprecated. All components have been reimplemented using native JSX/TSX in the Jay JS framework.

---

## Migration Guide

### What Changed

The headless element functions (Box, Button, Input, Typography, etc.) have been replaced by native JSX components. The framework now uses JSX directly instead of function-based element creation.

| Before | After |
|--------|-------|
| Function-based elements | Native JSX components |
| `@jay-js/elements` | Direct JSX/TSX |

### Step 1: Update Dependencies

```bash
# Remove deprecated package
npm uninstall @jay-js/elements

# Ensure @jay-js/system is up to date
npm install @jay-js/system@latest
```

### Step 2: Migrate Components

**Before (function-based):**
```typescript
import { Box, Button, Input, Typography } from '@jay-js/elements';

const MyComponent = () => {
  return Box({
    className: 'container',
    children: [
      Typography({ variant: 'h1', children: 'Hello' }),
      Input({ placeholder: 'Enter text', type: 'text' }),
      Button({ children: 'Submit', onClick: handleClick })
    ]
  });
};
```

**After (native JSX):**
```tsx
const MyComponent = () => {
  return (
    <div className="container">
      <h1>Hello</h1>
      <input placeholder="Enter text" type="text" />
      <button onClick={handleClick}>Submit</button>
    </div>
  );
};
```

### Element Mapping

| Old Element | JSX Equivalent |
|-------------|----------------|
| `Box()` | `<div>` |
| `Button()` | `<button>` |
| `Input()` | `<input>` |
| `Typography()` | `<h1>`, `<p>`, `<span>` |
| `Link()` | `<a>` |
| `Image()` | `<img>` |
| `Form()` | `<form>` |

---

## Summary

- This package is no longer maintained
- All components are now native JSX/TSX
- New projects should use JSX directly with `@jay-js/system`
- Existing projects should migrate immediately

---

## References

- Replacement: [@jay-js/system](https://www.npmjs.com/package/@jay-js/system)
- Deprecation commit: `22f6455`
