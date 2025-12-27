/**
 * @vitest-environment jsdom
 */
import { describe, expect, it } from "vitest";
import { state } from "../../../state";
import { Base } from "../base.js";

/**
 * Real-world example tests demonstrating reactive JSX fragments
 * This simulates the user's Drawer scenario where fragment is returned from reactive function
 */
describe("Reactive JSX Fragment - Real World Example", () => {
	// Simulate the user's drawer scenario with task editing
	it("should handle conditional fragment rendering like in DrawerContent", () => {
		interface Task {
			id: number;
			title: string;
			description: string;
		}

		const selectedTask = state<Task | null>(null);

		// Simulate DrawerContent with conditional fragment
		const drawerContent = Base({
			tag: "div",
			className: "drawer-content",
			children: () => {
				if (!selectedTask.value) return null;

				// Return a fragment with multiple elements (like AppDrawerHeader + EditTaskForm)
				const fragment = document.createDocumentFragment();

				const header = Base({
					tag: "div",
					className: "drawer-header",
					children: selectedTask.value.title,
				});

				const form = Base({
					tag: "div",
					className: "drawer-form",
					children: selectedTask.value.description,
				});

				fragment.append(header, form);
				return fragment;
			},
		});

		// Initial state - no task selected
		expect(drawerContent.querySelector(".drawer-header")).toBeNull();
		expect(drawerContent.querySelector(".drawer-form")).toBeNull();

		// Select first task
		selectedTask.set({
			id: 1,
			title: "First Task",
			description: "This is the first task",
		});

		expect(drawerContent.querySelector(".drawer-header")?.textContent).toBe("First Task");
		expect(drawerContent.querySelector(".drawer-form")?.textContent).toBe("This is the first task");

		// Switch to another task (this is where the bug occurred before)
		selectedTask.set({
			id: 2,
			title: "Second Task",
			description: "This is the second task",
		});

		expect(drawerContent.querySelector(".drawer-header")?.textContent).toBe("Second Task");
		expect(drawerContent.querySelector(".drawer-form")?.textContent).toBe("This is the second task");

		// Close drawer (deselect task)
		selectedTask.set(null);

		expect(drawerContent.querySelector(".drawer-header")).toBeNull();
		expect(drawerContent.querySelector(".drawer-form")).toBeNull();

		// Open again with third task
		selectedTask.set({
			id: 3,
			title: "Third Task",
			description: "This is the third task",
		});

		expect(drawerContent.querySelector(".drawer-header")?.textContent).toBe("Third Task");
		expect(drawerContent.querySelector(".drawer-form")?.textContent).toBe("This is the third task");
	});

	it("should handle JSX-like fragments with conditional rendering", () => {
		const isEditing = state(false);
		const title = state("View Mode");

		const component = Base({
			tag: "div",
			className: "component",
			children: () => {
				if (!isEditing.value) {
					// Simple element when not editing
					return Base({ tag: "p", children: title.value });
				}

				// Fragment with multiple elements when editing (simulates <>...</>)
				const fragment = document.createDocumentFragment();

				fragment.append(
					Base({
						tag: "input",
						value: title.value,
						placeholder: "Edit title",
					}),
					Base({
						tag: "button",
						children: "Save",
					}),
					Base({
						tag: "button",
						children: "Cancel",
					}),
				);

				return fragment;
			},
		});

		// View mode
		expect(component.querySelector("p")?.textContent).toBe("View Mode");
		expect(component.querySelector("input")).toBeNull();

		// Switch to edit mode
		isEditing.set(true);
		expect(component.querySelector("p")).toBeNull();
		expect(component.querySelector("input")).toBeDefined();
		expect(component.querySelectorAll("button").length).toBe(2);

		// Switch back to view mode
		isEditing.set(false);
		expect(component.querySelector("p")?.textContent).toBe("View Mode");
		expect(component.querySelector("input")).toBeNull();

		// Edit again
		isEditing.set(true);
		expect(component.querySelectorAll("button").length).toBe(2);
	});

	it("should handle complex nested structure with fragments", () => {
		interface Section {
			id: string;
			content: string[];
		}

		const activeSection = state<Section | null>(null);

		const container = Base({
			tag: "div",
			children: () => {
				if (!activeSection.value) {
					return Base({ tag: "div", children: "No section selected" });
				}

				const fragment = document.createDocumentFragment();

				// Add section header
				fragment.append(
					Base({
						tag: "h2",
						children: `Section: ${activeSection.value.id}`,
					}),
				);

				// Add content items
				activeSection.value.content.forEach((text) => {
					fragment.append(
						Base({
							tag: "p",
							className: "section-item",
							children: text,
						}),
					);
				});

				return fragment;
			},
		});

		// No section
		expect(container.textContent).toBe("No section selected");

		// Load section with 2 items
		activeSection.set({
			id: "section-1",
			content: ["Item 1", "Item 2"],
		});

		expect(container.querySelector("h2")?.textContent).toBe("Section: section-1");
		expect(container.querySelectorAll(".section-item").length).toBe(2);

		// Load section with 3 items
		activeSection.set({
			id: "section-2",
			content: ["Item A", "Item B", "Item C"],
		});

		expect(container.querySelector("h2")?.textContent).toBe("Section: section-2");
		expect(container.querySelectorAll(".section-item").length).toBe(3);

		// Clear section
		activeSection.set(null);
		expect(container.textContent).toBe("No section selected");
	});
});
