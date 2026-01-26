import { cn } from "../../utils";
import type { TToast } from "../toast/toast.types";

export function ToastContainer({
	className,
	horizontal = "toast-end",
	vertical = "toast-top",
	duration = 5000,
	asChild = false,
	dataset,
	children,
	...props
}: TToast = {}) {
	const containerClassName = cn("toast-container", className);
	const extraDataset = typeof dataset === "function" ? dataset() : dataset;
	const mergedDataset = {
		horizontal: horizontal || "",
		vertical: vertical || "",
		duration: duration.toString() || "",
		asChild: asChild ? "true" : "false",
		...(extraDataset ?? {}),
	};

	return (
		<div {...(props as any)} className={containerClassName} dataset={mergedDataset}>
			{children}
		</div>
	);
}
