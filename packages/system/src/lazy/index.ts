// Exporta API principal
export { LazyComponent } from "./core/lazy-component.js";
export { loadModule, prefetchModule } from "./core/module-loader.js";
export { 
  setLazyOptions,
  startGarbageCollector,
  clearModuleCache
} from "./core/configuration.js";

// Exporta utilitários
export {
  createLazyModule,
  createDefaultLoader,
  createErrorElement,
  prefetchModules,
  createRetryableModule
} from "./utils/helpers.js";

// Exporta tipos
export * from "./types.js";

// Inicia o garbage collector automaticamente
startGarbageCollector();