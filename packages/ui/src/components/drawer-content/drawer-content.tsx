import { cn } from "../../utils/cn";
import type { TDrawerContent } from "./drawer-content.types";

export function DrawerContent({ className, position = "left", children, ...props }: TDrawerContent = {}) {
	const translateClass = {
		left: "-translate-x-full",
		right: "translate-x-full",
		top: "-translate-y-full",
		bottom: "translate-y-full",
	} as const;

	const contentClassName = cn(
		"drawer-content",
		`drawer-${position}`,
		"transition-transform",
		"duration-300",
		"ease-in-out",
		"relative",
		"flex",
		"z-20",
		translateClass[position],
		className,
	);

	return (
		<div {...(props as any)} className={contentClassName}>
			{children}
		</div>
	);
}
