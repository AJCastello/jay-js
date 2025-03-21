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

export type TRouteInstance = {
	id: string;
	parentLayoutId?: string;
} & TRoute;

export type TRouterOptions = {
	prefix?: string;
	target?: HTMLElement | string;
	onError?: (error: Error) => void;
	onNavigate?: (route: TRouteInstance) => void;
	beforeResolve?: (route: TRouteInstance) => boolean | Promise<boolean>;
};

export type TPotentialMatch = {
	route: TRouteInstance;
	result: RegExpMatchArray | null;
};
