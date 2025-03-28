import { mergeClasses } from "../../utils/merge-classes.js";
import { Base } from "../Base/Base.js";
import type { TBaseTagMap } from "../Base/Base.types.js";
import type { TToast } from "./Toast.types.js";

export function Toast<T extends TBaseTagMap = "div">(
	{ horizontal = "toast-end", vertical = "toast-top", asChild = false, ...props }: TToast<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = mergeClasses(["toast", asChild ? "absolute" : "", horizontal, vertical, props.className]);

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
