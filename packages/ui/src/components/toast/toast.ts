import { TBaseTagMap, mergeClasses, Base } from "@jay-js/elements";
import { TToast } from "./toast.types";

export function Toast<T extends TBaseTagMap = "div">(
	{ horizontal = "toast-end", vertical = "toast-top", asChild = false, ...props }: TToast<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses("toast", asChild ? "absolute" : "", horizontal, vertical, props.className);

	const toast = Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];

	const resizeObserver = new ResizeObserver((entries) => {
		if (!toast.firstChild) {
			toast.remove();
		}
	});

	resizeObserver.observe(toast);
	return toast;
}
