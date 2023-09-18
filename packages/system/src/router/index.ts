import { uniKey } from "../utils/uniKey";

interface IRoute {
  path: string;
  element?: () => (HTMLElement | DocumentFragment) | (() => Promise<HTMLElement | DocumentFragment>) | undefined;
  target?: HTMLElement;
  layout?: boolean;
  children?: Array<IRoute>;
};

interface IRouteBuild extends IRoute {
  id: string;
  parentLayoutId?: string;
}

const contextRoutes: Array<IRouteBuild> = [];

const pathToRegex = (path: string) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

export function getParams(): Record<string, string> {
  let params: Record<string, string> = {};
  const match = getPotentialMatch();

  if (match.result) {
    const values = match.result?.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);
    params = Object.fromEntries(keys.map((key, i) => [key, (values as any)[i]]));
  }

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.forEach((value, key) => (params[key] = value));
  return params;
}

interface IPotentialMatches {
  route: IRouteBuild;
  result: RegExpMatchArray | null;
}

function getPotentialMatches() {
  let pathName = location.pathname;

  if (pathName.substring(pathName.length - 1) === "/") {
    pathName = pathName.substring(0, pathName.length - 1)
  }

  const potentialMatches = contextRoutes.reduce<Array<IPotentialMatches>>((acc, route) => {
    const result = pathName.match(pathToRegex(route.path));
    if (result) {
      acc.push({
        route: route,
        result: result,
      });
    }
    return acc;
  }, []);

  return potentialMatches;
}

function getPotentialMatchIndex() {
  const potentialMatches = getPotentialMatches();
  if (potentialMatches.length === 0) {
    return { route: contextRoutes[0], result: [location.pathname] };
  }

  if (potentialMatches.length === 2) {
    return potentialMatches[1];
  }

  return potentialMatches[0];
}

export function getPotentialMatch() {
  const potentialMatches = getPotentialMatches();

  const resultMatch = potentialMatches.reduce<IPotentialMatches>((acc, curr) => {
    if (curr.result !== null) {
      if (acc.result === null) {
        return curr;
      }
      if (curr.result.length > acc.result.length) {
        return curr;
      }
    }
    return acc;
  }, {
    route: contextRoutes[0],
    result: null
  });

  const match = resultMatch
    ? resultMatch
    : { route: contextRoutes[0], result: [location.pathname] };

  return match;
}

function Routes(inputRoutes: Array<IRoute>, target?: HTMLElement, prefix = ""): Array<IRouteBuild> {
  const outputRoutes: Array<IRouteBuild> = [];

  function buildRoutes(routes: Array<IRoute>, prefix: string, parentLayoutId?: string) {
    for (let route of routes) {
      let newPath = [prefix, route.path].join("/").replace(/\/+$/, "").replace(/\/{2,}/g, "/");
      const routeId = uniKey();

      if (route.element) {
        const routeBuild: IRouteBuild = {
          id: routeId,
          path: newPath,
          element: route.element,
          target: route.target || target || document.body,
        };

        route.layout && (routeBuild.layout = route.layout);
        parentLayoutId && (routeBuild.parentLayoutId = parentLayoutId);
        outputRoutes.push(routeBuild);
      }

      if (route.children) {
        buildRoutes(route.children, newPath, (route.layout ? routeId : parentLayoutId));
      }
    }
  }

  buildRoutes(inputRoutes, prefix);
  return outputRoutes;
}

export function Router(routes: Array<IRoute>, target?: HTMLElement) {
  if (routes.length === 0) {
    throw new Error("No routes provided");
  }
  contextRoutes.length === 0;
  contextRoutes.splice(0, contextRoutes.length);
  contextRoutes.push(...Routes(routes, target));
  getRoute();
}

function getRouteById(id: string) {
  return contextRoutes.find((r) => r.id === id);
}

async function getTarget(route: IRouteBuild) {
  if (route.parentLayoutId) {
    const parentLayout = document.querySelector(`[data-layout-id="${route.parentLayoutId}"]`);

    if (parentLayout) {
      const outlet = parentLayout.querySelector(`[data-router="outlet"]`);
      if (outlet) {
        return outlet;
      }
    }

    if (!parentLayout) {
      const parentLayoutRoute = getRouteById(route.parentLayoutId);
      if (parentLayoutRoute) {
        const parentLayoutRouteRendered = await renderRoute(parentLayoutRoute);
        if (parentLayoutRouteRendered) {
          const outlet = parentLayoutRouteRendered.querySelector(`[data-router="outlet"]`);
          if (outlet) {
            return outlet;
          }
        }
      }
    }
  }

  return route.target;
}

async function getElement(route: IRouteBuild) {
  if (route && route.element) {
    if (route.element instanceof Promise) {
      const element = await route.element() as HTMLElement;
      if (route.layout) {
        element.dataset.layoutId = route.id;
      }
      return element;
    }
    const element = route.element() as HTMLElement;
    if (route.layout) {
      element.dataset.layoutId = route.id;
    }
    return element;
  }
}

async function renderRoute(route: IRouteBuild): Promise<HTMLElement | undefined> {
  if (route.element && route.target) {
    const target = await getTarget(route);
    const element = await getElement(route);

    if (!element || !target) return;

    target.innerHTML = "";
    target.append(element as HTMLElement);
    return target as HTMLElement;
  }
  return;
}

async function getRoute() {
  const match = getPotentialMatch();
  if (!match.result) return;

  if (match.route.layout) {
    const matchLayoutIndex = getPotentialMatchIndex();
    await renderRoute(matchLayoutIndex.route);
    return;
  }

  await renderRoute(match.route);
  return;
}

export function Navigate(path: string) {
  history.pushState(null, "", path);
  getRoute();
}

window.addEventListener("popstate", getRoute);
