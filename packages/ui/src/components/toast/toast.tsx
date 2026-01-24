import { cn } from "../../utils/cn";
import type { TToast } from "./toast.types";

function ensureHTMLDivElement(value: unknown): HTMLDivElement {
	if (value instanceof HTMLDivElement) {
		return value;
	}

	if (value instanceof HTMLElement && value.tagName === "DIV") {
		return value as HTMLDivElement;
	}

	throw new Error("Toast: expected a synchronous <div> element");
}

export function Toast({
	className,
	horizontal = "toast-end",
	vertical = "toast-top",
	asChild = false,
	children,
	...props
}: TToast = {}) {
	const toastClassName = cn("toast", asChild ? "absolute" : "", horizontal, vertical, className);
	const toast = ensureHTMLDivElement(
		<div {...(props as any)} className={toastClassName}>
			{children}
		</div>,
	);

	const resizeObserver = new ResizeObserver(() => {
		if (!toast.firstChild) {
			toast.remove();
		}
	});

	resizeObserver.observe(toast);
	return toast;
}
