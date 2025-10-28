import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TToast } from "../toast/toast.types";

export function ToastContainer<T extends TBaseTagMap = "div">(
	{ horizontal = "toast-end", vertical = "toast-top", duration = 5000, asChild = false, ...props }: TToast<T> = {
		tag: "div",
	},
): HTMLElementTagNameMap[T] {
	const className = cn("toast-container", props.className);

	return Base({
		...props,
		className,
		dataset: {
			horizontal,
			vertical,
			duration: duration.toString(),
			asChild: asChild ? "true" : "false",
		},
	}) as HTMLElementTagNameMap[T];
}
