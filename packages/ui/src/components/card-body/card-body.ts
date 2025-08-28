import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TCardBody } from "./card-body.types";

export function CardBody<T extends TBaseTagMap = "div">(
	{ ...props }: TCardBody<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("card-body", props.className);
	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
