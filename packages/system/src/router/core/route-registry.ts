import { IRoute, IRouteInstance } from "../types.js";

/**
 * Processa uma lista de rotas e gera instâncias de rota com IDs únicos
 * @param routes Lista de rotas a serem processadas
 * @param defaultTarget Elemento padrão para renderização
 * @param parentLayoutId ID do layout pai (usado internamente para rotas aninhadas)
 */
export function* Routes(
  routes: Array<IRoute>,
  defaultTarget?: HTMLElement,
  parentLayoutId?: string
): Generator<IRouteInstance> {
  for (const route of routes) {
    // Gera um ID único para a rota
    const id = Math.random().toString(36).substring(2);
    
    // Cria a instância da rota
    const routeInstance: IRouteInstance = {
      ...route,
      id,
      parentLayoutId,
      target: route.target || defaultTarget
    };

    // Se for um layout e tiver filhos, processa as rotas filhas
    if (route.layout && route.children) {
      yield routeInstance;
      yield* Routes(route.children, routeInstance.target, routeInstance.id);
    } else {
      yield routeInstance;
    }
  }
}