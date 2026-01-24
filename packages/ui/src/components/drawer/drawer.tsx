import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils/cn";
import type { TDrawer } from "./drawer.types.js";

export function Drawer<T extends TBaseTagMap = "div">(
	{ tag, className, asChild = false, position = "left", children, ...props }: TDrawer<T> = { tag: "div" as T },
): HTMLElementTagNameMap[T] {
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

	const Tag = (tag ?? "div") as any;
	const drawer = (
		<Tag {...(props as any)} className={drawerClassName}>
			{children}
		</Tag>
	) as unknown as HTMLElementTagNameMap[T];

	const drawerId = drawer.id;

	if (drawerId && document.querySelector(`#${drawerId}`)) {
		return document.querySelector(`#${drawerId}`) as HTMLElementTagNameMap[T];
	}

	return drawer;
}
