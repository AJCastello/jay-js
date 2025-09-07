import { Base, type TBaseTagMap } from "@jay-js/elements";
import type { TCardBody } from "./card-body.types";
import { cn } from "../../../utils/cn";

export function CardBody<T extends TBaseTagMap = "div">(
	{ ...props }: TCardBody<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("card-body", props.className);
	return Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];
}
