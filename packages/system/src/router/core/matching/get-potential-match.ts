import { IPotentialMatch } from "../../types.js";
import { resolvedRoutes } from "../configuration.js";

/**
 * Encontra a melhor correspondência de rota para o caminho fornecido
 * @param path Caminho a ser comparado com as rotas registradas
 */
export function getPotentialMatch(path: string): IPotentialMatch | null {
  let bestMatch: IPotentialMatch | null = null;
  let maxSegments = -1;

  // Remove barras duplicadas e trailing slashes
  const normalizedPath = path.replace(/\/+/g, "/").replace(/\/$/, "");

  // Verifica cada rota registrada
  for (const [_, route] of resolvedRoutes) {
    // Converte o padrão da rota em uma expressão regular
    const pattern = route.path
      .replace(/\//g, "\\/")     // Escapa barras
      .replace(/:\w+/g, "([^/]+)")  // Converte :param em grupo de captura
      .replace(/\*/g, ".*");        // Converte * em wildcard
    
    const regex = new RegExp(`^${pattern}$`);
    const result = normalizedPath.match(regex);

    if (result) {
      // Conta segmentos não-wildcard para determinar a melhor correspondência
      const segments = (route.path.match(/\/[^*]*/g) || []).length;
      
      if (segments > maxSegments) {
        maxSegments = segments;
        bestMatch = { route, result };
      }
    }
  }

  return bestMatch;
}