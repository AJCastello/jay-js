import { uniKey } from "../../utils/index.js";
import { ILazyModule } from "../types.js";

import { moduleCache } from "./configuration.js";
import { loadFromCache, loadModule } from "./module-loader.js";

export function LazyModule(lazy: ILazyModule, loader?: HTMLElement) {
  if (!lazy) {
    throw new Error("Module is undefined");
  }

  if (!lazy.module) {
    const moduleId = `default_${uniKey(20)}`;
    lazy = { ...lazy, module: moduleId };
  }

  let moduleSection: HTMLElement;

  if (lazy.module && moduleCache.has(lazy.module)) {
    return loadFromCache(lazy);
  };

  moduleSection = loader || document.createElement("jayjs-lazy-slot");
  loadModule(lazy, moduleSection)
  return moduleSection;
}
