type Route = {
  path: string;
  element: () => (HTMLElement | DocumentFragment) | (() => Promise<HTMLElement | DocumentFragment>) | undefined;
  target: HTMLElement;
};

const contextRoutes: Route[] = [];

const pathToRegex = (path: string) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

export function getParams(): Record<string, string> {
  const match = getPotentialMatch();
  const values = match.result?.slice(1);
  const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);
  const params = Object.fromEntries(keys.map((key, i) => [key, (values as any)[i]]));

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.forEach((value, key) => (params[key] = value));

  return params;
}

export function getPotentialMatch() {
  let pathName = location.pathname;

  if (pathName.substring(pathName.length - 1) === "/") {
    pathName = pathName.substring(0, pathName.length - 1)
  }

  const potentialMatches = contextRoutes.map((route) => {
    return {
      route: route,
      result: pathName.match(pathToRegex(route.path)),
    };
  });

  const resultMatch = potentialMatches.reduce((acc, curr) => {
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

export async function Router(routes: Route[] = contextRoutes) {
  if (routes.length === 0) {
    throw new Error("No routes provided");
  }

  if (contextRoutes.length === 0) {
    contextRoutes.splice(0, contextRoutes.length);
    contextRoutes.push(...routes);
  }

  const match = getPotentialMatch();

  if (match.route.element) {
    match.route.target.innerHTML = "";

    if (match.route.element instanceof Promise) {
      const element = await (match.route as any).element();
      match.route.target.append(element);
      return;
    }

    match.route.target.append((match.route as any).element());
  }
  return;
}

export function Navigate(path: string) {
  history.pushState(null, "", path);
  Router();
}

window.addEventListener("popstate", () => {
  Router();
});
