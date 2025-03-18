import { IRoute } from "../types.js";
import { Navigate } from "../core/navigation/navigate.js";

/**
 * Helper para criar links que funcionam com o router
 */
export function Link(href: string, text: string, className?: string): HTMLAnchorElement {
  const link = document.createElement("a");
  link.href = href;
  link.textContent = text;
  if (className) {
    link.className = className;
  }
  return link;
}

/**
 * Helper para criar uma navegação programática com confirmação
 */
export function NavigateWithConfirm(path: string, message: string): void {
  if (window.confirm(message)) {
    Navigate(path);
  }
}

/**
 * Helper para criar uma rota de redirecionamento
 */
export function RedirectRoute(to: string): IRoute {
  return {
    path: "*",
    element: () => {
      Navigate(to);
      return document.createDocumentFragment();
    }
  };
}

/**
 * Helper para criar uma rota protegida que requer uma condição
 */
export function ProtectedRoute(
  route: IRoute,
  guard: () => boolean | Promise<boolean>,
  redirectTo: string = "/"
): IRoute {
  const originalElement = route.element;
  
  return {
    ...route,
    element: async (props?: any) => {
      const isAllowed = await guard();
      
      if (!isAllowed) {
        Navigate(redirectTo);
        return document.createDocumentFragment();
      }
      
      if (typeof originalElement === "function") {
        return originalElement(props);
      }
      
      return originalElement || document.createDocumentFragment();
    }
  };
}