/**
 * Represents the data structure for an element to be rendered
 */
export type TElementData = {
	/** Optional element ID */
	id?: string;
	/** Optional component name */
	name?: string;
	/** Component function that creates the element */
	component: (options: any) => any;
	/** Component props, including optional child elements */
	props?: any & { children?: Array<TElementData> };
};

/**
 * Configuration for rendering a tree of elements
 */
export type TRenderElements = {
	/** Array of element data to render */
	data: Array<TElementData>;
	/** Optional target element to render into */
	targetElement?: HTMLElement;
};

/**
 * Recursively renders a tree of elements into a target element
 *
 * @param options - Configuration options for rendering
 * @returns The target element containing all rendered elements
 */
export function RenderElements({ data, targetElement }: TRenderElements): HTMLElement {
	if (!targetElement) {
		targetElement = document.createElement("div");
	}
	targetElement.innerHTML = "";

	/**
	 * Helper function to recursively render elements
	 *
	 * @param data - Array of element data to render
	 * @param target - Target element to render into
	 */
	function RenderElement(data: Array<TElementData>, target: HTMLElement) {
		if (!Array.isArray(data)) return;
		data.forEach((item) => {
			const element = item.component({ id: item.id, ...item.props });
			if (item.props?.children && item.props?.children.length > 0) {
				if (item.component?.name === "Section" || item.name === "Section") {
					element.innerHTML = "";
				}
				RenderElement(item.props.children, element);
			}
			target.append(element);
		});
	}

	RenderElement(data, targetElement);
	return targetElement;
}
