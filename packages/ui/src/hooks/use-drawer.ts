/**
 * Configuration options for the useDrawer hook
 */
type TUseDrawer = {
	/**
	 * ID of the drawer element to control
	 */
	id?: string;
	/**
	 * Optional ID of the drawer element to control
	 * @deprecated Use `id` instead
	 */
	for?: string;
	/**
	 * Callback function triggered when drawer is closed
	 */
	onClose?: () => void;
	/**
	 * Callback function triggered when drawer is opened
	 */
	onOpen?: () => void;
};

/**
 * Interface for drawer control methods
 */
interface DrawerControls {
	/**
	 * Opens the drawer
	 */
	open: () => void;
	/**
	 * Closes the drawer
	 */
	close: () => void;
	/**
	 * Toggles the drawer between open and closed states
	 */
	toggle: () => void;
}

/**
 * A hook to control drawer component functionality
 *
 * @param props - Configuration options for the drawer
 * @returns Object with methods to open, close, or toggle the drawer
 */
export function useDrawer({ ...props }: TUseDrawer): DrawerControls {
	const drawerId = props.id || props.for;

	const getElements = () => {
		const drawer = document.querySelector(`#${drawerId}`);
		if (drawer && drawer instanceof HTMLElement) {
			const drawerOverlay = document.querySelector(`[data-drawer-for="${drawerId}"]`);
			const drawerContent = drawer.querySelector(".drawer-content");
			return { drawer, drawerOverlay, drawerContent };
		}
		return null;
	};

	const open = () => {
		const elements = getElements();
		if (!elements) return;

		const { drawer, drawerOverlay, drawerContent } = elements;

		if (drawer.classList.contains("hidden")) {
			drawer.classList.remove("hidden");
			drawer.classList.add("flex");

			setTimeout(() => {
				if (drawerContent && drawerContent instanceof HTMLElement) {
					if (drawerContent.classList.contains("drawer-left")) {
						drawerContent.classList.remove("-translate-x-full");
						drawerContent.classList.add("translate-x-0");
					}

					if (drawerContent.classList.contains("drawer-right")) {
						drawerContent.classList.remove("translate-x-full");
						drawerContent.classList.add("translate-x-0");
					}

					if (drawerContent.classList.contains("drawer-top")) {
						drawerContent.classList.remove("-translate-y-full");
						drawerContent.classList.add("translate-x-0");
					}

					if (drawerContent.classList.contains("drawer-bottom")) {
						drawerContent.classList.remove("translate-y-full");
						drawerContent.classList.add("translate-x-0");
					}
				}

				if (drawerOverlay && drawerOverlay instanceof HTMLElement) {
					drawerOverlay.classList.remove("opacity-0");
				}

				if (props.onOpen) {
					props.onOpen();
				}
			}, 20);
		}
	};

	const close = () => {
		const elements = getElements();
		if (!elements) return;

		const { drawer, drawerOverlay, drawerContent } = elements;

		if (!drawer.classList.contains("hidden")) {
			if (drawerContent && drawerContent instanceof HTMLElement) {
				if (drawerContent.classList.contains("drawer-left")) {
					drawerContent.classList.remove("translate-x-0");
					drawerContent.classList.add("-translate-x-full");
				}

				if (drawerContent.classList.contains("drawer-right")) {
					drawerContent.classList.remove("translate-x-0");
					drawerContent.classList.add("translate-x-full");
				}

				if (drawerContent.classList.contains("drawer-top")) {
					drawerContent.classList.remove("translate-x-0");
					drawerContent.classList.add("-translate-y-full");
				}

				if (drawerContent.classList.contains("drawer-bottom")) {
					drawerContent.classList.remove("translate-x-0");
					drawerContent.classList.add("translate-y-full");
				}
			}

			if (drawerOverlay && drawerOverlay instanceof HTMLElement) {
				drawerOverlay.classList.add("opacity-0");
			}

			setTimeout(() => {
				drawer.classList.remove("flex");
				drawer.classList.add("hidden");

				if (props.onClose) {
					props.onClose();
				}
			}, 300);
		}
	};

	const toggle = () => {
		const elements = getElements();
		if (!elements) return;

		const { drawer } = elements;

		if (drawer.classList.contains("hidden")) {
			open();
		} else {
			close();
		}
	};

	return {
		open,
		close,
		toggle
	};
}
