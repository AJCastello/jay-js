export interface IRoute {
  path: string;
  element?: (HTMLElement | DocumentFragment) | ((props?: any) => (HTMLElement | DocumentFragment)) | ((props?: any) => Promise<HTMLElement | DocumentFragment>) | undefined;
  target?: HTMLElement;
  layout?: boolean;
  children?: Array<IRoute>;
}

export interface IRouteInstance extends IRoute {
  id: string;
  parentLayoutId?: string;
}

export interface IRouterOptions {
  prefix?: string;
  target?: HTMLElement;
  onError?: (error: Error) => void;
  onNavigate?: (route: IRouteInstance) => void;
  beforeResolve?: (route: IRouteInstance) => boolean | Promise<boolean>;
}

export interface IPotentialMatch {
  route: IRouteInstance;
  result: RegExpMatchArray | null;
}