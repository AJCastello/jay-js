import { RenderElements, type TElementData } from "../render-elements";

describe("RenderElements", () => {
	// Helper functions for testing
	const createDummyComponent = (name: string) => {
		return (props: any) => {
			const element = document.createElement("div");
			element.classList.add(`component-${name}`);
			element.setAttribute("data-id", props.id || "");

			if (props.text) {
				element.textContent = props.text;
			}

			return element;
		};
	};

	it("should create a container element when no targetElement is provided", () => {
		// Arrange
		const TestComponent = createDummyComponent("test");
		const data: TElementData[] = [
			{
				component: TestComponent,
				props: { text: "Test Content" },
			},
		];

		// Act
		const result = RenderElements({ data });

		// Assert
		expect(result instanceof HTMLElement).toBe(true);
		expect(result.tagName).toBe("DIV");
		expect(result.children.length).toBe(1);
		expect(result.firstChild?.textContent).toBe("Test Content");
	});

	it("should render elements into the provided targetElement", () => {
		// Arrange
		const TestComponent = createDummyComponent("test");
		const data: TElementData[] = [
			{
				component: TestComponent,
				props: { text: "Test Content" },
			},
		];

		const targetElement = document.createElement("section");

		// Act
		const result = RenderElements({ data, targetElement });

		// Assert
		expect(result).toBe(targetElement);
		expect(result.tagName).toBe("SECTION");
		expect(result.children.length).toBe(1);
		expect(result.firstChild?.textContent).toBe("Test Content");
	});

	it("should clear the targetElement before rendering", () => {
		// Arrange
		const TestComponent = createDummyComponent("test");
		const data: TElementData[] = [
			{
				component: TestComponent,
				props: { text: "New Content" },
			},
		];

		const targetElement = document.createElement("div");
		targetElement.innerHTML = "<span>Old Content</span>";

		// Act
		const result = RenderElements({ data, targetElement });

		// Assert
		expect(result.children.length).toBe(1);
		expect(result.firstChild?.textContent).toBe("New Content");
		expect(result.innerHTML).not.toContain("Old Content");
	});

	it("should recursively render child elements", () => {
		// Arrange
		const ParentComponent = createDummyComponent("parent");
		const ChildComponent = createDummyComponent("child");
		const GrandchildComponent = createDummyComponent("grandchild");

		const data: TElementData[] = [
			{
				component: ParentComponent,
				props: {
					text: "Parent",
					children: [
						{
							component: ChildComponent,
							props: {
								text: "Child",
								children: [
									{
										component: GrandchildComponent,
										props: { text: "Grandchild" },
									},
								],
							},
						},
					],
				},
			},
		];

		// Act
		const result = RenderElements({ data });

		// Assert
		const parentElement = result.querySelector(".component-parent");
		expect(parentElement).not.toBeNull();

		const childElement = parentElement?.querySelector(".component-child");
		expect(childElement).not.toBeNull();

		const grandchildElement = childElement?.querySelector(".component-grandchild");
		expect(grandchildElement).not.toBeNull();
		expect(grandchildElement?.textContent).toBe("Grandchild");
	});

	it("should handle multiple elements at the same level", () => {
		// Arrange
		const Component = createDummyComponent("test");
		const data: TElementData[] = [
			{
				component: Component,
				props: { text: "First" },
			},
			{
				component: Component,
				props: { text: "Second" },
			},
			{
				component: Component,
				props: { text: "Third" },
			},
		];

		// Act
		const result = RenderElements({ data });

		// Assert
		expect(result.children.length).toBe(3);
		expect(result.children[0].textContent).toBe("First");
		expect(result.children[1].textContent).toBe("Second");
		expect(result.children[2].textContent).toBe("Third");
	});

	it("should support element IDs", () => {
		// Arrange
		const TestComponent = createDummyComponent("test");
		const data: TElementData[] = [
			{
				id: "test-id",
				component: TestComponent,
				props: { text: "Test Content" },
			},
		];

		// Act
		const result = RenderElements({ data });

		// Assert
		const element = result.firstChild as HTMLElement;
		expect(element.getAttribute("data-id")).toBe("test-id");
	});

	it("should handle Section components specially by clearing their innerHTML", () => {
		// Arrange
		const SectionComponent = (props: any) => {
			const element = document.createElement("div");
			element.innerHTML = "<span>Default content</span>";
			// Add a property to mimic the Section component
			Object.defineProperty(SectionComponent, "name", { value: "Section" });
			return element;
		};

		const ChildComponent = createDummyComponent("child");

		const data: TElementData[] = [
			{
				component: SectionComponent,
				name: "Section", // This should trigger the special handling
				props: {
					children: [
						{
							component: ChildComponent,
							props: { text: "Child Content" },
						},
					],
				},
			},
		];

		// Act
		const result = RenderElements({ data });

		// Assert
		const section = result.firstChild as HTMLElement;
		expect(section.innerHTML).not.toContain("Default content");
		expect(section.querySelector(".component-child")).not.toBeNull();
		expect(section.textContent).toBe("Child Content");
	});

	it("should handle components with empty or no children", () => {
		// Arrange
		const TestComponent = createDummyComponent("test");
		const data: TElementData[] = [
			{
				component: TestComponent,
				props: {
					text: "No Children",
				},
			},
			{
				component: TestComponent,
				props: {
					text: "Empty Children Array",
					children: [],
				},
			},
		];

		// Act
		const result = RenderElements({ data });

		// Assert
		expect(result.children.length).toBe(2);
		expect(result.children[0].textContent).toBe("No Children");
		expect(result.children[1].textContent).toBe("Empty Children Array");
	});

	it("should handle non-array data gracefully", () => {
		// Mock console.error to test warning when data is not an array
		const originalConsoleError = console.error;
		console.error = jest.fn();

		// Define the function to safely call RenderElement with non-array data
		const callWithNonArray = () => {
			// @ts-ignore - Intentionally passing invalid data for testing
			const nonArrayData = "not an array";
			const result = RenderElements({ data: nonArrayData });
			return result;
		};

		// Act
		const result = callWithNonArray();

		// Assert
		expect(result instanceof HTMLElement).toBe(true);
		expect(result.children.length).toBe(0);

		// Restore console.error
		console.error = originalConsoleError;
	});
});
