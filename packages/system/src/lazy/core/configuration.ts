import { State } from "../../state/index.js";
import { IImportedModule, ILazyOptions, IModuleLoadingState } from "../types.js";

/**
 * Configuração padrão do sistema lazy
 */
export const lazyOptions: ILazyOptions = {
  gcThreshold: 5 * 60 * 1000, // 5 minutos
  gcInterval: 60 * 1000,      // 1 minuto
  enablePrefetch: true
};

/**
 * Cache de módulos importados
 */
export const moduleCache = new Map<string, IImportedModule>();

/**
 * Estado de carregamento dos módulos
 */
export const loadingState = State<Record<string, IModuleLoadingState>>({});

/**
 * Define opções do sistema lazy
 */
export function setLazyOptions(options: Partial<ILazyOptions>): void {
  Object.assign(lazyOptions, options);
}

/**
 * Atualiza o estado de carregamento de um módulo
 */
export function updateLoadingState(
  moduleId: string,
  state: Partial<IModuleLoadingState>
): void {
  loadingState.set((current) => ({
    ...current,
    [moduleId]: {
      ...current[moduleId],
      ...state
    }
  }));
}

/**
 * Obtém o estado de carregamento de um módulo
 */
export function getLoadingState(moduleId: string): IModuleLoadingState {
  return loadingState.get()[moduleId] || { loading: false };
}

/**
 * Limpa o cache de um módulo específico
 */
export function clearModuleCache(moduleId: string): void {
  moduleCache.delete(moduleId);
  loadingState.set((current) => {
    const { [moduleId]: _, ...rest } = current;
    return rest;
  });
}

/**
 * Inicia o garbage collector de módulos
 */
export function startGarbageCollector(): void {
  if (!lazyOptions.gcInterval) return;

  setInterval(() => {
    const now = Date.now();
    for (const [id, module] of moduleCache.entries()) {
      if (
        module.collect &&
        now - module.lastUsed > (lazyOptions.gcThreshold || 0)
      ) {
        clearModuleCache(id);
      }
    }
  }, lazyOptions.gcInterval);
}