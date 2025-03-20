export type ConfigChangeCallback = (options: TLazyOptions) => void;

export type TImportedModule = {
	module: any;
	lastUsed: number;
	collect: boolean;
};

export type TLazyModule = {
	module?: string;
	import: () => Promise<any>;
	props?: Record<string, any>;
	collect?: boolean;
	loader?: HTMLElement | DocumentFragment;
};

export type TLazyOptions = {
	gcThreshold?: number;
	gcInterval?: number;
	defaultLoader?: HTMLElement | DocumentFragment;
};
