import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TToast } from "../toast/toast.types";

export function ToastContainer<T extends TBaseTagMap = "div">(
	{ horizontal = "toast-end", vertical = "toast-top", duration = 5000, asChild = false, ...props }: TToast<T> = {
		tag: "div",
	},
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("toast-container", props.className);

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
