import { vi } from "vitest";
import { selector, selectors } from "../query.js";

describe("DOM Query Utilities", () => {
	beforeEach(() => {
		// Setup DOM environment for testing
		document.body.innerHTML = `
      <div id="parent">
        <div class="child visible">Child 1</div>
        <div class="child" style="display: none;">Child 2</div>
        <div class="child visible">
          <div class="nested-child">Nested Child</div>
        </div>
      </div>
    `;
	});

	afterEach(() => {
		document.body.innerHTML = "";
	});

	describe("selector", () => {
		it("should select the first matching element", () => {
			const element = selector(".child");
			expect(element).not.toBeNull();
			expect(element?.textContent).toBe("Child 1");
		});

		it("should return null when no elements match", () => {
			const element = selector(".non-existent");
			expect(element).toBeNull();
		});

		it("should respect the onlyVisible option", () => {
			const visible = selector(".child", document, { onlyVisible: true });
			expect(visible?.textContent).toBe("Child 1");
		});

		it("should use the provided target for searching", () => {
			const parent = document.getElementById("parent");
			expect(parent).not.toBeNull();

			if (parent) {
				const child = selector(".nested-child", parent);
				expect(child?.textContent).toBe("Nested Child");
			}
		});

		it("should throw error for invalid parameters", () => {
			expect(() => selector("", null as any)).toThrow("Invalid parameters");
			expect(() => selector(null as any, document)).toThrow("Invalid parameters");
		});
	});

	describe("selectors", () => {
		it("should select all matching elements", () => {
			const elements = selectors(".child");
			expect(elements.length).toBe(3);
		});

		it("should return empty NodeList when no elements match", () => {
			const elements = selectors(".non-existent");
			expect(elements.length).toBe(0);
		});

		it("should respect the onlyVisible option", () => {
			const visibleElements = selectors(".child", document, { onlyVisible: true });
			expect(visibleElements.length).toBe(2);

			Array.from(visibleElements).forEach((el) => {
				expect(el.classList.contains("visible")).toBe(true);
			});
		});

		it("should respect the includeNested option", () => {
			const allChildElements = selectors(".child, .nested-child");
			expect(allChildElements.length).toBe(4); // 3 children + 1 nested

			const nonNestedOnly = selectors(".child, .nested-child", document, { includeNested: false });
			expect(nonNestedOnly.length).toBe(3); // Only top-level matches
		});

		it("should use the provided target for searching", () => {
			const parent = document.getElementById("parent");
			expect(parent).not.toBeNull();

			if (parent) {
				const visibleChildren = selectors(".child", parent, { onlyVisible: true });
				expect(visibleChildren.length).toBe(2);
			}
		});

		it("should throw error for invalid parameters", () => {
			expect(() => selectors("", null as any)).toThrow("Invalid parameters");
			expect(() => selectors(null as any, document)).toThrow("Invalid parameters");
		});
	});
});
