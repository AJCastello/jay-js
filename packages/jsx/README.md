# @jay-js/jsx

## DEPRECATED

> **Deprecated since January 14, 2026**

**DO NOT USE THIS PACKAGE**

This package has been deprecated. The JSX runtime is now integrated directly into `@jay-js/system`.

---

## Migration Guide

### What Changed

The JSX runtime (`jsx-runtime` and `jsx-dev-runtime`) has been moved from this standalone package into `@jay-js/system`. This eliminates the need for a separate JSX package.

| Before | After |
|--------|-------|
| `@jay-js/jsx` | `@jay-js/system` |
| Separate package | Native integration |

### Step 1: Update Dependencies

```bash
# Remove deprecated package
npm uninstall @jay-js/jsx

# Ensure @jay-js/system is up to date
npm install @jay-js/system@latest
```

### Step 2: Update vite.config.js

**Before:**
```javascript
export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "@jay-js/jsx",
  },
});
```

**After:**
```javascript
export default defineConfig({
  esbuild: {
    jsx: "automatic",
    jsxImportSource: "@jay-js/system",
  },
});
```

### Step 3: Update tsconfig.json

**Before:**
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@jay-js/jsx"
  }
}
```

**After:**
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@jay-js/system"
  }
}
```

---

## Summary

- This package is no longer maintained
- All functionality is now in `@jay-js/system`
- New projects should use `@jay-js/system` directly
- Existing projects should migrate immediately

---

## References

- Replacement: [@jay-js/system](https://www.npmjs.com/package/@jay-js/system)
- Deprecation commit: `22f6455`
