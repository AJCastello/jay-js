import { Base, type TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils";
import type { TToast } from "../toast/toast.types";

export function ToastContainer<T extends TBaseTagMap = "div">(
	{
		horizontal = "toast-end",
		vertical = "toast-top",
		duration = 5000,
		asChild = false,
		dataset,
		...props
	}: TToast<T> = {
		tag: "div",
	},
): HTMLElementTagNameMap[T] {
	const className = cn("toast-container", props.className);

	return Base({
		...props,
		className,
		dataset: {
			horizontal: horizontal || "",
			vertical: vertical || "",
			duration: duration.toString() || "",
			asChild: asChild ? "true" : "false",
			...(typeof dataset === "function" ? dataset() : dataset),
		},
	}) as HTMLElementTagNameMap[T];
}
