import { resolvedRoutes, routerOptions } from "../configuration.js";
import { getPotentialMatch } from "../matching/get-potential-match.js";
import { renderRoute } from "../rendering/render-route.js";

/**
 * Obtém e renderiza a rota correspondente à URL atual
 */
export async function getRoute(): Promise<void> {
  try {
    // Obtém o caminho da URL atual
    const path = window.location.pathname;
    
    // Encontra a melhor correspondência para a rota atual
    const match = getPotentialMatch(path);
    
    if (!match) {
      throw new Error(`No matching route found for path: ${path}`, { cause: "no-match" });
    }

    // Executa o hook beforeResolve se existir
    if (routerOptions.beforeResolve) {
      const shouldProceed = await routerOptions.beforeResolve(match.route);
      if (!shouldProceed) {
        return;
      }
    }

    // Renderiza a rota
    await renderRoute(match);

    // Executa o callback onNavigate se existir
    if (routerOptions.onNavigate) {
      routerOptions.onNavigate(match.route);
    }
  } catch (error: any) {
    // Trata erros usando o handler configurado ou lança o erro
    if (routerOptions.onError) {
      routerOptions.onError(error);
      return;
    }
    throw error;
  }
}