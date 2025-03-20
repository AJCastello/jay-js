import { ILazyModule } from "../types.js";
import { 
  moduleCache, 
  lazyOptions 
} from "./configuration.js";

export function prefetchModule(config: ILazyModule): void {
  if (!lazyOptions.enablePrefetch) return;
  
  const prefetchLink = document.createElement("link");
  prefetchLink.rel = "prefetch";
  prefetchLink.href = config.module;
  document.head.appendChild(prefetchLink);
}

export function loadFromCache(lazy: ILazyModule): HTMLElement {
  const cached = moduleCache.get(lazy.module);
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
    moduleCache.set(lazy.module, {
      module: moduleImported[lazy.module],
      lastUsed: 0,
      collect: lazy.collect ?? true
    });

    const cached = moduleCache.get(lazy.module);
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