import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils/cn";
import type { TToast } from "./toast.types";

export function Toast<T extends TBaseTagMap = "div">(
	{
		tag,
		className,
		horizontal = "toast-end",
		vertical = "toast-top",
		asChild = false,
		children,
		...props
	}: TToast<T> = { tag: "div" as T },
): HTMLElementTagNameMap[T] {
	const Tag = (tag ?? "div") as any;
	const toastClassName = cn("toast", asChild ? "absolute" : "", horizontal, vertical, className);

	const toast = (
		<Tag {...(props as any)} className={toastClassName}>
			{children}
		</Tag>
	) as unknown as HTMLElementTagNameMap[T];

	const resizeObserver = new ResizeObserver(() => {
		if (!toast.firstChild) {
			toast.remove();
		}
	});

	resizeObserver.observe(toast);
	return toast;
}
