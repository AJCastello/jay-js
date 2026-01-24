import { cn } from "../../utils/cn";
import type { TDrawer } from "./drawer.types.js";

export function Drawer({ className, asChild = false, position = "left", children, ...props }: TDrawer = {}) {
	const positionClass = {
		left: "justify-start",
		right: "justify-end",
		top: "items-start",
		bottom: "items-end",
	} as const;

	const drawerClassName = cn(
		asChild ? "absolute" : "fixed",
		"inset-0",
		"hidden",
		"z-30",
		positionClass[position],
		className,
	);

	const drawer = (
		<div {...props} className={drawerClassName}>
			{children}
		</div>
	);

	const drawerId = props.id;

	if (drawerId) {
		const existingDrawer = document.querySelector<HTMLDivElement>(`#${drawerId}`);
		if (existingDrawer) {
			return existingDrawer;
		}
	}

	return drawer;
}
