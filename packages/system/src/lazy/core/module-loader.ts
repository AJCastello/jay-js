import { ILazyModule } from "../types.js";
import { 
  moduleCache, 
  updateLoadingState, 
  lazyOptions 
} from "./configuration.js";

/**
 * Carrega um módulo de forma lazy
 */
export async function loadModule(config: ILazyModule): Promise<any> {
  const { module: moduleId, import: importFn, style, collect = true } = config;

  // Verifica se o módulo já está em cache
  const cached = moduleCache.get(moduleId);
  if (cached) {
    cached.lastUsed = Date.now();
    return cached.module;
  }

  try {
    // Atualiza estado para loading
    updateLoadingState(moduleId, { loading: true });

    // Carrega o módulo e estilos em paralelo se houver
    const [moduleData, styleData] = await Promise.all([
      importFn(),
      loadStyles(style)
    ]);

    // Atualiza cache e estado
    moduleCache.set(moduleId, {
      module: moduleData,
      lastUsed: Date.now(),
      collect
    });

    updateLoadingState(moduleId, {
      loading: false,
      module: moduleData
    });

    return moduleData;
  } catch (error: any) {
    // Atualiza estado com erro
    updateLoadingState(moduleId, {
      loading: false,
      error
    });
    throw error;
  }
}

/**
 * Carrega estilos associados ao módulo
 */
async function loadStyles(style?: string | (() => Promise<any>)): Promise<void> {
  if (!style) return;

  if (typeof style === "string") {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = style;
    document.head.appendChild(link);
    return new Promise((resolve, reject) => {
      link.onload = () => resolve();
      link.onerror = () => reject(new Error(`Failed to load style: ${style}`));
    });
  }

  await style();
}

/**
 * Pré-carrega um módulo em background
 */
export function prefetchModule(config: ILazyModule): void {
  if (!lazyOptions.enablePrefetch) return;
  
  const prefetchLink = document.createElement("link");
  prefetchLink.rel = "prefetch";
  prefetchLink.href = config.module;
  document.head.appendChild(prefetchLink);

  if (typeof config.style === "string") {
    const styleLink = document.createElement("link");
    styleLink.rel = "prefetch";
    styleLink.href = config.style;
    document.head.appendChild(styleLink);
  }
}