import { ILazyModule } from "../types.js";
import { 
  moduleCache, 
  lazyOptions 
} from "./configuration.js";

export function prefetchModule(config: ILazyModule): void {
  if (!lazyOptions.enablePrefetch) return;
  
  const prefetchLink = document.createElement("link");
  prefetchLink.rel = "prefetch";
  prefetchLink.href = config.module || '';
  document.head.appendChild(prefetchLink);
}

export function loadFromCache(lazy: ILazyModule): HTMLElement {
  const cached = moduleCache.get(lazy.module!);
  if (!cached) {
    throw new Error(`Module ${lazy.module} not found in cache`);
  }
  const moduleSection = cached.module({ ...lazy.props });
  cached.lastUsed = 0;
  return moduleSection;
}

export async function loadModule(lazy: ILazyModule, moduleSection: HTMLElement) {
  try {
    const moduleImported = await lazy.import();
    
    // Check if we should use default export or named export
    const moduleToUse = isDefaultExportModule(lazy) 
      ? moduleImported.default
      : moduleImported[lazy.module!];
    
    if (!moduleToUse) {
      // If not found, try default export as fallback
      if (moduleImported.default && !isDefaultExportModule(lazy)) {
        console.warn(`Named export '${lazy.module}' not found, using default export instead.`);
        moduleCache.set(lazy.module!, {
          module: moduleImported.default,
          lastUsed: 0,
          collect: lazy.collect ?? true
        });
      } else {
        throw new Error(`Module ${lazy.module} not found in the imported file.`);
      }
    } else {
      moduleCache.set(lazy.module!, {
        module: moduleToUse,
        lastUsed: 0,
        collect: lazy.collect ?? true
      });
    }

    const cached = moduleCache.get(lazy.module!);
    if (!cached) {
      throw new Error(`Module ${lazy.module} not found in cache`);
    }
    const loadedModule = cached.module(lazy.props || {});
    moduleSection.replaceWith(loadedModule);
    return loadedModule;
  } catch (error) {
    console.error(`Error importing module ${lazy.module}:`, error);
  }
}

// Helper function to determine if we're dealing with a default export module
function isDefaultExportModule(lazy: ILazyModule): boolean {
  return lazy.module?.startsWith('default_') || false;
}