import { ILazyModule } from "../types.js";
import {
  moduleCache,
  lazyOptions
} from "./configuration.js";

/**
 * Loads a module from the cache and resets its usage counter.
 * 
 * @param {ILazyModule} lazy - Configuration object for the lazy module
 * @returns {HTMLElement} The instantiated module element
 * @throws {Error} When the module is not found in cache
 */
export function loadFromCache(lazy: ILazyModule): HTMLElement {
  const cached = moduleCache.get(lazy.module!);
  if (!cached) {
    throw new Error(`Module ${lazy.module} not found in cache`);
  }
  const moduleSection = cached.module({ ...lazy.props });
  cached.lastUsed = 0;
  return moduleSection;
}

/**
 * Loads a module by dynamically importing it and caching the result.
 * Handles both named exports and default exports automatically.
 * 
 * @param {ILazyModule} lazy - Configuration object for the lazy module
 * @param {HTMLElement} moduleSection - Element to replace with the loaded module
 * @returns {Promise<HTMLElement|undefined>} The loaded module element or undefined if loading fails
 */
export async function loadModule(lazy: ILazyModule, moduleSection: HTMLElement) {
  try {
    const moduleImported = await lazy.import();

    const moduleToUse = isDefaultExportModule(lazy)
      ? moduleImported.default
      : moduleImported[lazy.module!];

    if (!moduleToUse) {
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

/**
 * Checks if the module uses default export based on its name.
 * 
 * @param {ILazyModule} lazy - Configuration object for the lazy module
 * @returns {boolean} True if the module uses default export
 * @private
 */
function isDefaultExportModule(lazy: ILazyModule): boolean {
  return lazy.module?.startsWith('default_') || false;
}