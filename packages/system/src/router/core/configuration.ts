import { IRouteInstance, IRouterOptions } from "../types.js";

/**
 * Armazena as opções de configuração do roteador
 */
export const routerOptions: IRouterOptions = {
  prefix: "",
  target: document.body,
  onError: console.error,
  onNavigate: () => {},
  beforeResolve: () => true,
};

/**
 * Mapa de todas as rotas registradas
 */
export const resolvedRoutes = new Map<string, IRouteInstance>();

/**
 * Define ou atualiza as opções do roteador
 * @param options Opções de configuração do roteador
 */
export function routerDefineOptions(options: IRouterOptions): void {
  Object.assign(routerOptions, options);
}

/**
 * Registra um callback para ser executado antes da resolução da rota
 * @param callback Função a ser executada antes da resolução da rota
 */
export function beforeResolve(
  callback: (route: IRouteInstance) => boolean | Promise<boolean>
): void {
  routerOptions.beforeResolve = callback;
}

/**
 * Registra um callback para tratamento de erros do roteador
 * @param callback Função a ser executada quando ocorrer um erro
 */
export function onError(callback: (error: Error) => void): void {
  routerOptions.onError = callback;
}