import { IRoute, IRouterOptions } from "../types.js";
import { resolvedRoutes, routerDefineOptions } from "./configuration.js";
import { Routes } from "./route-registry.js";
import { getRoute } from "./navigation/get-route.js";
import { setupHistoryEvents } from "./navigation/history-events.js";

/**
 * Inicializa o sistema de roteamento com a configuração especificada
 * @param routes Lista de rotas a serem registradas
 * @param options Opções de configuração do roteador
 */
export function Router(routes: Array<IRoute>, options?: IRouterOptions) {
  // Configura as opções do roteador, se fornecidas
  if (options) {
    routerDefineOptions(options);
  }

  // Verifica se há rotas definidas
  if (routes.length === 0) {
    if (options?.onError) {
      options.onError(new Error("No routes provided", { cause: "no-routes" }));
      return;
    }
    throw new Error("No routes provided", { cause: "no-routes" });
  }
  
  // Limpa rotas anteriores
  resolvedRoutes.clear();
  
  // Registra as novas rotas
  for (const route of Routes(routes, options?.target)) {
    resolvedRoutes.set(route.id, route);
  }

  // Configura eventos de navegação do navegador
  setupHistoryEvents();

  // Navega para a rota atual
  getRoute();
}