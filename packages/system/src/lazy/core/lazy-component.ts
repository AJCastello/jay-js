import { ILazyModule } from "../types.js";
import { loadModule } from "./module-loader.js";
import { getLoadingState, lazyOptions } from "./configuration.js";
import { Effect } from "../../state/index.js";

/**
 * Cria um componente com carregamento lazy
 */
export function LazyComponent(config: ILazyModule): HTMLElement {
  const container = document.createElement("div");
  const loader = config.loader || lazyOptions.defaultLoader;
  let mounted = false;

  async function render() {
    try {
      // Mostra loader se existir
      if (loader && !mounted) {
        container.innerHTML = "";
        container.appendChild(loader instanceof HTMLElement ? loader.cloneNode(true) : loader);
      }

      // Carrega o módulo
      const module = await loadModule(config);
      
      // Se o componente foi desmontado durante o carregamento, não renderiza
      if (!mounted) return;

      // Limpa o container
      container.innerHTML = "";

      // Renderiza o componente
      const element = typeof module === "function" 
        ? module(config.props)
        : module;

      container.appendChild(element);

    } catch (error: any) {
      console.error("Failed to load lazy component:", error);
      container.innerHTML = `<div class="error">Failed to load component: ${error.message}</div>`;
    }
  }

  // Observa mudanças no estado de carregamento
  Effect(() => {
    const state = getLoadingState(config.module);
    if (state.error) {
      container.innerHTML = `<div class="error">Failed to load component: ${state.error.message}</div>`;
    }
  });

  // Gerencia ciclo de vida do componente
  mounted = true;
  render();

  const originalRemove = container.remove.bind(container);
  container.remove = () => {
    mounted = false;
    originalRemove();
  };

  return container;
}