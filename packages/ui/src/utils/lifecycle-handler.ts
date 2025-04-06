/**
 * Utilitário para gerenciar recursos no ciclo de vida de componentes
 * Permite registrar funções de limpeza que serão chamadas quando
 * o componente for desmontado
 */

type CleanupFunction = () => void;

/**
 * Cria um gerenciador de ciclo de vida para componentes
 * @returns Funções para registrar callbacks e gerenciar recursos
 */
export function createLifecycleHandler() {
  const cleanupFunctions: CleanupFunction[] = [];

  /**
   * Registra um event listener com limpeza automática
   */
  function registerEventListener<K extends keyof HTMLElementEventMap>(
    element: HTMLElement,
    type: K,
    listener: (ev: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void {
    element.addEventListener(type, listener as EventListener, options);

    // Registrar função de limpeza
    cleanupFunctions.push(() => {
      element.removeEventListener(type, listener as EventListener,
        typeof options === 'object' ? options : undefined);
    });
  }

  /**
   * Registra qualquer função que precise ser chamada durante a desmontagem
   */
  function registerCleanup(cleanupFn: CleanupFunction): void {
    cleanupFunctions.push(cleanupFn);
  }

  /**
   * Executa todas as funções de limpeza registradas
   */
  function cleanup(): void {
    while (cleanupFunctions.length > 0) {
      const fn = cleanupFunctions.pop();
      try {
        fn?.();
      } catch (error) {
        console.error("JayJS: Error in cleanup function:", error);
      }
    }
  }

  /**
   * Configurar onmount e ondismount para um componente
   * com gerenciamento automático de limpeza
   */
  function setupLifecycle(element: HTMLElement, onMount?: (element: HTMLElement) => void) {
    return {
      onmount: (el: HTMLElement) => {
        // Executar onMount personalizado se fornecido
        onMount?.(el);
      },
      ondismount: () => {
        // Limpar todos os recursos registrados
        cleanup();
      }
    };
  }

  return {
    registerEventListener,
    registerCleanup,
    cleanup,
    setupLifecycle
  };
}