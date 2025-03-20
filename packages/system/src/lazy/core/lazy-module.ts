import { ILazyModule } from "../types.js";

import { moduleCache } from "./configuration.js";
import { loadFromCache, loadModule } from "./module-loader.js";

export function LazyModule(lazy: ILazyModule, loader?: HTMLElement) {
  if (!lazy) {
    throw new Error("Module is undefined");
  }

  let moduleSection: HTMLElement;

  if (moduleCache.has(lazy.module)) {
    return loadFromCache(lazy);
  };

  moduleSection = loader || document.createElement("jayjs-lazy-slot");
  loadModule(lazy, moduleSection)
  return moduleSection;
}
