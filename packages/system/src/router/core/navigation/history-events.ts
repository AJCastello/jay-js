import { getRoute } from "./get-route.js";

/**
 * Configura os eventos de navegação do navegador
 */
export function setupHistoryEvents(): void {
  // Manipula eventos de popstate (botões voltar/avançar do navegador)
  window.addEventListener("popstate", () => {
    getRoute();
  });

  // Captura cliques em links para usar navegação do router
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const anchor = target.closest("a");
    
    if (!anchor) return;
    
    // Ignora links externos ou com target especificado
    if (
      anchor.target ||
      anchor.hasAttribute("download") ||
      anchor.hasAttribute("rel") ||
      anchor.protocol !== window.location.protocol ||
      anchor.hostname !== window.location.hostname
    ) {
      return;
    }

    // Previne o comportamento padrão e usa o router
    e.preventDefault();
    history.pushState(null, "", anchor.href);
    getRoute();
  });
}