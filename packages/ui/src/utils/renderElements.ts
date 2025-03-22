export interface IElementData {
	id?: string;
	name?: string;
	component: (options: any) => any;
	props?: any & { children?: Array<IElementData> };
}

export interface IRenderElements {
	data: Array<IElementData>;
	targetElement?: HTMLElement;
}

export function RenderElements({ data, targetElement }: IRenderElements): HTMLElement {
	if (!targetElement) {
		targetElement = document.createElement("div");
	}

	targetElement.innerHTML = "";

	function RenderElement(data: Array<IElementData>, target: HTMLElement) {
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
