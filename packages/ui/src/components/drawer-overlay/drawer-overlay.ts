import { Base, type TBaseTagMap } from "@jay-js/elements";
import { useDrawer } from "../../hooks/use-drawer.js";
import { cn } from "../../utils/cn";
import type { TDrawerOverlay } from "./drawer-overlay.types.js";

export function DrawerOverlay<T extends TBaseTagMap = "div">(
	{ ...props }: TDrawerOverlay<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const className = cn(
		"transition-opacity",
		"ease-in-out",
		"duration-300",
		"opacity-0",
		"fixed",
		"inset-0",
		"bg-black/30",
		"z-10",
		props.className,
	);

	const handleDrawer = useDrawer({ drawerId: props.id });

	return Base({
		...props,
		className,
		dataset: {
			drawerFor: props.id,
		},
		onclick:
			props.onclick ||
			((e) => {
				e.preventDefault();
				handleDrawer.close();
			}),
	}) as HTMLElementTagNameMap[T];
}
