/**
 * Represents a route configuration in the routing system
 * @typedef {Object} TRoute
 * @property {string} path - The URL path for the route
 * @property {Function|HTMLElement|DocumentFragment|undefined} element - The element or function that returns an element to render for this route
 * @property {HTMLElement|string} [target] - The DOM element or selector where the route content will be rendered
 * @property {boolean} [layout] - Whether this route serves as a layout for child routes
 * @property {Array<TRoute>} [children] - Child routes nested under this route
 */
export type TRoute = {
	path: string;
	element?:
		| (HTMLElement | DocumentFragment)
		| ((props?: any) => HTMLElement | DocumentFragment)
		| ((props?: any) => Promise<HTMLElement | DocumentFragment>)
		| undefined;
	target?: HTMLElement | string;
	layout?: boolean;
	children?: Array<TRoute>;
};

/**
 * Represents an instantiated route within the router
 * @typedef {Object} TRouteInstance
 * @property {string} id - Unique identifier for the route instance
 * @property {string} [parentLayoutId] - ID of the parent layout route, if applicable
 * @extends TRoute
 */
export type TRouteInstance = {
	id: string;
	parentLayoutId?: string;
} & TRoute;

/**
 * Configuration options for the router
 * @typedef {Object} TRouterOptions
 * @property {string} [prefix] - URL prefix to prepend to all routes
 * @property {HTMLElement|string} [target] - Default DOM element or selector where routes will be rendered
 * @property {Function} [onError] - Error handler function
 * @property {Function} [onNavigate] - Function called when navigation occurs
 * @property {Function} [beforeResolve] - Function called before resolving a route, can cancel navigation by returning false
 */
export type TRouterOptions = {
	prefix?: string;
	target?: HTMLElement | string;
	onError?: (error: Error) => void;
	onNavigate?: (route: TRouteInstance) => void;
	beforeResolve?: (route: TRouteInstance) => boolean | Promise<boolean>;
};

/**
 * Represents a potential route match during path resolution
 * @typedef {Object} TPotentialMatch
 * @property {TRouteInstance} route - The matched route instance
 * @property {RegExpMatchArray|null} result - The result of matching the current URL against the route path
 */
export type TPotentialMatch = {
	route: TRouteInstance;
	result: RegExpMatchArray | null;
};
