import { Base, type TBaseTagMap } from "@jay-js/elements";
import { cn } from "../../utils/cn";
import type { TToast } from "./toast.types";

export function Toast<T extends TBaseTagMap = "div">(
	{ horizontal = "toast-end", vertical = "toast-top", asChild = false, ...props }: TToast<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn("toast", asChild ? "absolute" : "", horizontal, vertical, props.className);

	const toast = Base({
		...props,
		className,
	}) as HTMLElementTagNameMap[T];

	const resizeObserver = new ResizeObserver((_) => {
		if (!toast.firstChild) {
			toast.remove();
		}
	});

	resizeObserver.observe(toast);
	return toast;
}
