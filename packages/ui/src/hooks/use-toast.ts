import { Toast, type TToast } from "../components";

/**
 * Configuration options for the useToast hook
 */
type TUseToast = {
	/**
	 * Optional ID of the toast container element
	 * If provided, toast will be rendered in the element with this ID
	 */
	toastId?: string;
	/**
	 * @deprecated Use toastId instead
	 */
	for?: string;
};

/**
 * A hook to create and manage toast notifications
 *
 * @param props - Configuration options for the toast
 * @returns A function that creates and displays a toast notification
 * @throws Error if no toast container element is found
 */
export function useToast({ ...props }: TUseToast = {}) {
	const toastContainerId = props.toastId || props.for;
	const selector = toastContainerId ? `#${toastContainerId}` : ".toast-container";
	const toastContainer = document.querySelector(selector);

	if (!toastContainer) {
		throw new Error(`useToast: No element found for selector: ${selector}`);
	}

	return ({ duration, vertical, horizontal, children, ...props }: TToast<"div">): void => {
		const toastSettings = (toastContainer as HTMLDivElement).dataset;

		if (!vertical) {
			vertical = (toastSettings.vertical as TToast<"div">["vertical"]) || "toast-top";
		}
		if (!horizontal) {
			horizontal = (toastSettings.horizontal as TToast<"div">["horizontal"]) || "toast-end";
		}
		if (!duration) {
			duration = Number(toastSettings.duration) || 5000;
		}

		const toastList = toastContainer.querySelectorAll(".toast");
		let existingToast: Element | null = null;

		if (toastList.length > 0) {
			const toastListArray = Array.from(toastList);
			existingToast =
				toastListArray.find((toastItem) => {
					return toastItem.classList.contains(vertical as string) && toastItem.classList.contains(horizontal as string);
				}) || null;
		}

		if (existingToast) {
			const currentToast = existingToast as HTMLDivElement;
			if (children) {
				const currentNode = children as HTMLElement;
				currentToast.prepend(currentNode);
				setTimeout(() => {
					currentNode.remove();
				}, duration);
				return;
			}
		}

		const newToast = Toast({
			...props,
			duration,
			vertical,
			horizontal,
			children,
		});

		if (children) {
			const currentNode = children as HTMLElement;
			setTimeout(() => {
				currentNode.remove();
			}, duration);
		}

		toastContainer.appendChild(newToast);
	};
}
