import { routerOptions } from "../configuration.js";
import { getRoute } from "./get-route.js";

/**
 * Navega para o caminho especificado
 * @param path Caminho para o qual navegar
 */
export function Navigate(path: string): void {
  const prefixOptions = routerOptions.prefix || "";
  
  // Adiciona o prefixo ao caminho, se configurado
  if(prefixOptions){
    path = [prefixOptions, path]
      .join("/")
      .replace(/\/+$/, "")    // Remove barras finais extras
      .replace(/\/{2,}/g, "/"); // Remove barras duplas
  }
  
  // Atualiza o histórico do navegador e aciona a navegação
  history.pushState(null, "", path);
  getRoute();
}