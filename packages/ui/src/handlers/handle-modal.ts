/**
 * Configuration options for the handleModal function
 */
type THandleModal = {
	/**
	 * ID of the modal element to control
	 */
	modalId?: string;
	/**
	 * Callback function triggered when modal is closed
	 */
	onClose?: () => void;
	/**
	 * Callback function triggered when modal is opened
	 */
	onOpen?: () => void;
};

/**
 * Interface for modal control methods
 */
export type TModalControls = {
	/**
	 * Opens the modal
	 */
	open: () => void;
	/**
	 * Closes the modal
	 */
	close: () => void;
	/**
	 * Toggles the modal between open and closed states
	 */
	toggle: () => void;
};

/**
 * A function to control modal component functionality
 *
 * @param props - Configuration options for the modal
 * @returns Object with methods to open, close, or toggle the modal
 */
export function handleModal({ ...props }: THandleModal): TModalControls {
	const modalId = props.modalId;

	const getModal = () => {
		const dialogModal = document.querySelector(`#${modalId}`) as HTMLDialogElement;
		if (!dialogModal) {
			console.warn(`handleModal: No element found for selector: #${modalId}`);
			return;
		}
		if (dialogModal && dialogModal instanceof HTMLDialogElement) {
			return dialogModal;
		}
		return null;
	};

	const open = () => {
		const dialogModal = getModal();
		if (dialogModal) {
			dialogModal.showModal();
			props.onOpen?.();
		}
	};

	const close = () => {
		const dialogModal = getModal();
		if (dialogModal) {
			dialogModal.close();
			props.onClose?.();
		}
	};

	const toggle = () => {
		const dialogModal = getModal();
		if (!dialogModal) return;
		if (dialogModal.open) {
			close();
			return;
		}
		open();
	};

	return { open, close, toggle };
}
