export type TRenderOptions = {
	insert?: "append" | "prepend";
	replace?: boolean;
};

export type TRenderContentItem = Node | string | HTMLElement | null | undefined;
export type TRenderContent = TRenderContentItem | TRenderContentItem[] | null | undefined;

export type TRenderTarget = HTMLElement | string | null;

export type TQueryOptions = {
	onlyVisible?: boolean;
	includeNested?: boolean;
};
