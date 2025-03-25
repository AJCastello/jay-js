import { useDrawer } from "../use-drawer";

describe("useDrawer", () => {
	let drawerElement: HTMLElement;
	let drawerContent: HTMLElement;
	let drawerOverlay: HTMLElement;
	const drawerID = "test-drawer";

	beforeEach(() => {
		// Setup DOM elements for testing
		drawerElement = document.createElement("div");
		drawerElement.id = drawerID;
		drawerElement.classList.add("hidden");

		drawerContent = document.createElement("div");
		drawerContent.classList.add("drawer-content", "drawer-left");
		drawerElement.appendChild(drawerContent);

		drawerOverlay = document.createElement("div");
		drawerOverlay.setAttribute("data-drawer-for", drawerID);

		document.body.appendChild(drawerElement);
		document.body.appendChild(drawerOverlay);

		// Mock setTimeout to execute immediately
		jest.useFakeTimers();
	});

	afterEach(() => {
		// Clean up the DOM
		document.body.removeChild(drawerElement);
		document.body.removeChild(drawerOverlay);
		jest.useRealTimers();
	});

	it("should return a function", () => {
		// Arrange & Act
		const toggleDrawer = useDrawer({ for: drawerID });

		// Assert
		expect(typeof toggleDrawer).toBe("function");
	});

	it("should toggle drawer visibility when called", () => {
		// Arrange
		const toggleDrawer = useDrawer({ for: drawerID });

		// Act - open drawer
		toggleDrawer();
		jest.runAllTimers();

		// Assert - drawer should be visible
		expect(drawerElement.classList.contains("hidden")).toBe(false);
		expect(drawerElement.classList.contains("flex")).toBe(true);

		// Act - close drawer
		toggleDrawer();
		jest.runAllTimers();

		// Assert - drawer should be hidden
		expect(drawerElement.classList.contains("hidden")).toBe(true);
		expect(drawerElement.classList.contains("flex")).toBe(false);
	});

	it("should call onOpen callback when drawer is opened", () => {
		// Arrange
		const onOpenMock = jest.fn();
		const toggleDrawer = useDrawer({
			for: drawerID,
			onOpen: onOpenMock,
		});

		// Act
		toggleDrawer();
		jest.runAllTimers();

		// Assert
		expect(onOpenMock).toHaveBeenCalledTimes(1);
	});

	it("should call onClose callback when drawer is closed", () => {
		// Arrange
		const onCloseMock = jest.fn();
		const toggleDrawer = useDrawer({
			for: drawerID,
			onClose: onCloseMock,
		});

		// Act - first open the drawer
		toggleDrawer();
		jest.runAllTimers();

		// Then close it
		toggleDrawer();
		jest.runAllTimers();

		// Assert
		expect(onCloseMock).toHaveBeenCalledTimes(1);
	});

	it("should handle different drawer positions correctly", () => {
		const positions = ["drawer-left", "drawer-right", "drawer-top", "drawer-bottom"];

		positions.forEach((position) => {
			// Setup for this test case
			drawerContent.className = "drawer-content";
			drawerContent.classList.add(position);

			// Arrange
			const toggleDrawer = useDrawer({ for: drawerID });

			// Act
			toggleDrawer();
			jest.runAllTimers();

			// Assert
			// Different assertions for different positions
			if (position === "drawer-left") {
				expect(drawerContent.classList.contains("-translate-x-full")).toBe(true);
			} else if (position === "drawer-right") {
				expect(drawerContent.classList.contains("translate-x-full")).toBe(true);
			} else if (position === "drawer-top") {
				expect(drawerContent.classList.contains("-translate-y-full")).toBe(true);
			} else if (position === "drawer-bottom") {
				expect(drawerContent.classList.contains("translate-y-full")).toBe(true);
			}

			expect(drawerContent.classList.contains("translate-x-0")).toBe(true);
			expect(drawerOverlay.classList.contains("opacity-0")).toBe(true);
		});
	});
});
