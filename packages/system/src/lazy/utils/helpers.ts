import { ILazyModule } from "../types.js";
import { prefetchModule } from "../core/module-loader.js";

/**
 * Cria uma configuração de módulo lazy a partir de um import dinâmico
 */
export function createLazyModule(
  moduleId: string,
  importFn: () => Promise<any>,
  options: Partial<ILazyModule> = {}
): ILazyModule {
  return {
    module: moduleId,
    import: importFn,
    ...options
  };
}

/**
 * Cria um loader de loading padrão
 */
export function createDefaultLoader(text = "Loading..."): HTMLElement {
  const loader = document.createElement("div");
  loader.className = "lazy-loader";
  loader.textContent = text;
  return loader;
}

/**
 * Cria um erro customizado para falha no carregamento
 */
export function createErrorElement(message: string): HTMLElement {
  const error = document.createElement("div");
  error.className = "lazy-error";
  error.textContent = message;
  return error;
}

/**
 * Prefetch de múltiplos módulos em paralelo
 */
export function prefetchModules(configs: ILazyModule[]): void {
  configs.forEach(prefetchModule);
}

/**
 * Cria um módulo lazy com retry automático
 */
export function createRetryableModule(
  moduleId: string,
  importFn: () => Promise<any>,
  maxRetries = 3,
  retryDelay = 1000
): ILazyModule {
  let attempts = 0;

  async function retryImport(): Promise<any> {
    try {
      return await importFn();
    } catch (error) {
      if (attempts < maxRetries) {
        attempts++;
        await new Promise(resolve => setTimeout(resolve, retryDelay));
        return retryImport();
      }
      throw error;
    }
  }

  return createLazyModule(moduleId, retryImport);
}