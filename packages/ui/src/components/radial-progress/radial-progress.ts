import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TRadialProgress } from "./radial-progress.types";

export function RadialProgress<T extends TBaseTagMap = "div">(
	{ value = 0, size, thickness, ...props }: TRadialProgress<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("radial-progress", props.className);

	const element = Base({
		...props,
		className,
		role: "progressbar",
	}) as HTMLDivElement;

	if (value) {
		const currentStyle = element.getAttribute("style") ?? "";
		element.setAttribute("style", `${currentStyle} --value: ${value};`);
	}

	if (size) {
		const currentStyle = element.getAttribute("style") ?? "";
		element.setAttribute("style", `${currentStyle} --size: ${size};`);
	}

	if (thickness) {
		const currentStyle = element.getAttribute("style") ?? "";
		element.setAttribute("style", `${currentStyle} --thickness: ${thickness};`);
	}

	return element as HTMLElementTagNameMap[T];
}
