import type { TBaseTagMap } from "@jay-js/system";
import { useDrawer } from "../../hooks/use-drawer.js";
import { cn } from "../../utils/cn";
import type { TDrawerOverlay } from "./drawer-overlay.types.js";

export function DrawerOverlay<T extends TBaseTagMap = "div">(
	{ tag, className, onclick, children, ...props }: TDrawerOverlay<T> = { tag: "div" as T },
): HTMLElementTagNameMap[T] {
	const overlayClassName = cn(
		"transition-opacity",
		"ease-in-out",
		"duration-300",
		"opacity-0",
		"fixed",
		"inset-0",
		"bg-black/30",
		"z-10",
		className,
	);

	const handleDrawer = useDrawer({ drawerId: props.id });
	const Tag = (tag ?? "div") as any;

	const overlay = (
		<Tag
			{...(props as any)}
			className={overlayClassName}
			onclick={
				onclick ||
				((e: Event) => {
					e.preventDefault();
					handleDrawer.close();
				})
			}
		>
			{children}
		</Tag>
	) as unknown as HTMLElementTagNameMap[T];

	overlay.dataset.drawerFor = props.id || "";
	return overlay;
}
