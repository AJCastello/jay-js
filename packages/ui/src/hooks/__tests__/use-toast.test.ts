import { useToast } from "../use-toast";

describe("useToast", () => {
	let toastContainer: HTMLElement;

	beforeEach(() => {
		// Setup DOM elements for testing
		toastContainer = document.createElement("div");
		toastContainer.className = "toast-container";
		toastContainer.dataset.vertical = "toast-top";
		toastContainer.dataset.horizontal = "toast-end";
		toastContainer.dataset.duration = "3000";

		document.body.appendChild(toastContainer);

		// Mock setTimeout
		jest.useFakeTimers();
	});

	afterEach(() => {
		// Clean up the DOM
		document.body.removeChild(toastContainer);
		jest.useRealTimers();
	});

	it("should create a toast hook with default container", () => {
		// Arrange & Act
		const toast = useToast();

		// Assert
		expect(typeof toast).toBe("function");
	});

	it("should create a toast hook with custom container by ID", () => {
		// Arrange
		const customContainer = document.createElement("div");
		customContainer.id = "custom-toast";
		document.body.appendChild(customContainer);

		// Act
		const toast = useToast({ for: "custom-toast" });

		// Assert
		expect(typeof toast).toBe("function");

		// Clean up
		document.body.removeChild(customContainer);
	});

	it("should throw an error when container is not found", () => {
		// Arrange & Act & Assert
		expect(() => {
			useToast({ for: "non-existent-container" });
		}).toThrow("useToast: No element found for selector: #non-existent-container");
	});

	it("should add a toast to the container", () => {
		// Arrange
		const toast = useToast();
		const toastContent = document.createElement("div");
		toastContent.textContent = "Test Toast";

		// Act
		toast({ children: toastContent });

		// Assert
		expect(toastContainer.children.length).toBe(1);
		expect(toastContainer.querySelector(".toast")).not.toBeNull();

		// The content should be in the toast
		const addedToast = toastContainer.querySelector(".toast");
		expect(addedToast?.contains(toastContent)).toBe(true);
	});

	it("should remove the toast after the specified duration", () => {
		// Arrange
		const toast = useToast();
		const toastContent = document.createElement("div");
		toastContent.textContent = "Test Toast";
		const duration = 2000;

		// Act
		toast({ children: toastContent, duration });

		// Assert - before timeout
		expect(toastContainer.querySelector(".toast")?.contains(toastContent)).toBe(true);

		// Fast-forward time
		jest.advanceTimersByTime(duration);

		// Assert - after timeout
		expect(toastContent.parentNode).toBeNull();
	});

	it("should use container dataset values as defaults", () => {
		// Arrange
		const toast = useToast();
		const mockAppendChild = jest.spyOn(toastContainer, "appendChild");

		// Act
		toast({});

		// Assert
		expect(mockAppendChild).toHaveBeenCalled();
		const calledWithArg = mockAppendChild.mock.calls[0][0] as HTMLElement;

		// Should use dataset defaults
		expect(calledWithArg.classList.contains("toast-top")).toBe(true);
		expect(calledWithArg.classList.contains("toast-end")).toBe(true);

		// Clean up
		mockAppendChild.mockRestore();
	});

	it("should add toast to existing toast group if one exists", () => {
		// Arrange
		const toast = useToast();

		// Create an existing toast with specific position
		const existingToast = document.createElement("div");
		existingToast.className = "toast toast-top toast-end";
		toastContainer.appendChild(existingToast);

		const newToastContent = document.createElement("div");
		newToastContent.textContent = "New Toast";

		// Act
		toast({
			children: newToastContent,
			vertical: "toast-top",
			horizontal: "toast-end",
		});

		// Assert
		// Content should be added to existing toast
		expect(existingToast.contains(newToastContent)).toBe(true);

		// No new toast element should be created
		expect(toastContainer.querySelectorAll(".toast").length).toBe(1);
	});
});
