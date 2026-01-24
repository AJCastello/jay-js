import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils";
import type { TToast } from "../toast/toast.types";

export function ToastContainer<T extends TBaseTagMap = "div">(
	{
		tag,
		className,
		horizontal = "toast-end",
		vertical = "toast-top",
		duration = 5000,
		asChild = false,
		dataset,
		children,
		...props
	}: TToast<T> = { tag: "div" as T },
): HTMLElementTagNameMap[T] {
	const Tag = (tag ?? "div") as any;
	const containerClassName = cn("toast-container", className);

	const container = (
		<Tag {...(props as any)} className={containerClassName}>
			{children}
		</Tag>
	) as unknown as HTMLElementTagNameMap[T];

	const extraDataset = typeof dataset === "function" ? dataset() : dataset;

	container.dataset.horizontal = horizontal || "";
	container.dataset.vertical = vertical || "";
	container.dataset.duration = duration.toString() || "";
	container.dataset.asChild = asChild ? "true" : "false";

	if (extraDataset) {
		Object.assign(container.dataset, extraDataset);
	}

	return container;
}
