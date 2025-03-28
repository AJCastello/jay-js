import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TCardBody } from "./CardBody.types.js";

export function CardBody<T extends TBaseTagMap = "div">(
	{ ...props }: TCardBody<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["card-body", props.className]);

	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
