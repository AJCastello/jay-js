/**
 * Represents a route configuration in the routing system
 * @typedef {Object} TRoute
 * @property {string} path - The URL path for the route
 * @property {Function|HTMLElement|DocumentFragment|undefined} element - The element or function that returns an element to render for this route
 * @property {HTMLElement|string} [target] - The DOM element or selector where the route content will be rendered
 * @property {boolean} [layout] - Whether this route serves as a layout for child routes
 * @property {Array<TRoute>} [children] - Child routes nested under this route
 * @property {() => Promise<any>} [import] - Dynamic import function for lazy loading the module
 * @property {string} [module] - Name of the exported module (optional for default exports)
 * @property {Record<string, any>} [params] - Additional parameters to pass to the module
 * @property {HTMLElement} [loader] - Custom loader element to show while the route is loading
 * @property {(route: TRouteInstance) => boolean | Promise<boolean>} [guard] - Function that controls access to the route, returning true to allow access
 * @property {Record<string, any>} [metadata] - Additional metadata to associate with the route, can be used for navigation, titles, permissions, etc.
 */
export type TRoute = {
	path: string;
	element?:
	| (HTMLElement | DocumentFragment)
	| ((params?: any) => HTMLElement | DocumentFragment)
	| ((params?: any) => Promise<HTMLElement | DocumentFragment>)
	| undefined;
	target?: HTMLElement | string;
	layout?: boolean;
	children?: Array<TRoute>;
	import?: () => Promise<any>;
	module?: string;
	params?: Record<string, any>;
	loader?: HTMLElement;
	guard?: (route: TRouteInstance) => boolean | Promise<boolean>;
	metadata?: Record<string, any>;
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
 * @property {Function} [beforeResolve] - Function called before resolving a route, can cancel navigation by returning false
 */
export type TRouterOptions = {
	prefix?: string;
	target?: HTMLElement | string;
	onError?: (error: Error) => void;
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
