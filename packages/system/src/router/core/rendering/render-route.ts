import { IPotentialMatch } from "../../types.js";
import { routerOptions } from "../configuration.js";
import { getParams } from "./get-params.js";

/**
 * Renderiza uma rota correspondente
 * @param match Objeto contendo a rota e o resultado da correspondência
 */
export async function renderRoute(match: IPotentialMatch): Promise<void> {
  const { route, result } = match;
  
  try {
    // Obtém o elemento de destino para renderização
    const target = route.target || routerOptions.target || document.body;
    
    // Limpa o conteúdo anterior
    while (target.firstChild) {
      target.removeChild(target.firstChild);
    }

    // Se não houver elemento para renderizar, retorna
    if (!route.element) {
      return;
    }

    // Extrai parâmetros da URL
    const params = getParams(route.path, result);

    // Renderiza o elemento
    let element: HTMLElement | DocumentFragment;
    if (typeof route.element === "function") {
      element = await route.element(params);
    } else {
      element = route.element;
    }

    // Adiciona o elemento renderizado ao destino
    target.appendChild(element);

  } catch (error: any) {
    // Propaga o erro para ser tratado pelo manipulador de erros do router
    throw new Error(`Failed to render route: ${route.path}`, { 
      cause: error.message || "render-failed" 
    });
  }
}