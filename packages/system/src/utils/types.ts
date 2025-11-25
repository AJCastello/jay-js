export type TRenderOptions = {
	insert?: "append" | "prepend";
	replace?: boolean;
};

export type TRenderContentItem = Node | string | HTMLElement | Promise<HTMLElement> | null | undefined;
export type TRenderContent = TRenderContentItem | TRenderContentItem[] | null | undefined;

export type TRenderContentItemSync = Node | string | HTMLElement | null | undefined;
export type TRenderContentSync = TRenderContentItemSync | TRenderContentItemSync[] | null | undefined;

export type TRenderTarget = HTMLElement | string | null;

export type TQueryOptions = {
	onlyVisible?: boolean;
	includeNested?: boolean;
};
