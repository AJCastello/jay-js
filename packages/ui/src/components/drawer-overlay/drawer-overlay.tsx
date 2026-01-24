import { useDrawer } from "../../handlers/use-drawer.js";
import { cn } from "../../utils/cn";
import type { TDrawerOverlay } from "./drawer-overlay.types.js";

export function DrawerOverlay({ className, onclick, dataset, children, ...props }: TDrawerOverlay = {}) {
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
	const extraDataset = typeof dataset === "function" ? dataset() : dataset;
	const overlayDataset = {
		...(extraDataset ?? {}),
		drawerFor: props.id || "",
	};

	return (
		<div
			{...(props as any)}
			className={overlayClassName}
			dataset={overlayDataset}
			onclick={
				onclick ||
				((e: Event) => {
					e.preventDefault();
					handleDrawer.close();
				})
			}
		>
			{children}
		</div>
	);
}
