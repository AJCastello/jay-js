import type { TBaseTagMap } from "@jay-js/system";
import { cn } from "../../utils/cn";
import type { TDrawerContent } from "./drawer-content.types";

export function DrawerContent<T extends TBaseTagMap = "div">(
	{ tag, className, position = "left", children, ...props }: TDrawerContent<T> = { tag: "div" as T },
): HTMLElementTagNameMap[T] {
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

	const Tag = (tag ?? "div") as any;

	return (
		<Tag {...(props as any)} className={contentClassName}>
			{children}
		</Tag>
	) as unknown as HTMLElementTagNameMap[T];
}
