// Exporta a API principal do router
export { Router } from "./core/router.js";
export { Navigate } from "./core/navigation/navigate.js";

// Exporta funções de configuração
export { 
  routerDefineOptions,
  beforeResolve,
  onError
} from "./core/configuration.js";

// Exporta utilitários
export { getParams } from "./core/rendering/get-params.js";
export {
  Link,
  NavigateWithConfirm,
  RedirectRoute,
  ProtectedRoute
} from "./utils/helpers.js";

// Exporta todos os tipos
export * from "./types.js";
