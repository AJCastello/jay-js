export interface ResolveContext {
	conditions: string[];
	parentURL?: string;
}

export interface ResolveResult {
	url: string;
	format?: string;
	shortCircuit?: boolean;
}

export interface Route {
	layout?: boolean;
	path: string;
	parentLayoutId?: string;
	element: ElementFunction & { [key: string]: any };
}

type ElementFunction = (props?: any) => Promise<any>;

export interface IJayJsOptions {
	build: {
		srcDir: string;
		outDir: string;
		transformedDir: string;
		contentDir: string;
		contentTransformedDir: string;
	};
}
