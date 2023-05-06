export interface IElementData {
  id?: string;
  name?: string;
  component: (options: any) => any;
  props?: any & { content?: Array<IElementData> };
}

export interface IRenderElements {
  data: Array<IElementData>;
  targetElement?: HTMLElement;
}

export function RenderElements({
  data,
  targetElement,
}: IRenderElements): HTMLElement {
  if (!targetElement) {
    targetElement = document.createElement("div");
  }

  targetElement.innerHTML = "";

  function RenderElement(data: Array<IElementData>, target: HTMLElement) {
    if (!Array.isArray(data)) return;

    data.forEach((item) => {
      let element = item.component({ id: item.id, ...item.props });

      if (item.props?.content && item.props?.content.length > 0) {
        if (item.component?.name === "Section" || item.name === "Section") {
          element.innerHTML = "";
        }
        RenderElement(item.props.content, element);
      }
      target.append(element);
    });
  }

  RenderElement(data, targetElement);
  
  return targetElement;
}
