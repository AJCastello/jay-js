import type { TRenderContent, TRenderContentItem, TRenderOptions, TRenderTarget } from "../types.js";
import { selector } from "./query.js";

/**
 * Renders content into a target element in the DOM
 * @param target - Element or selector to render content into
 * @param content - Content to render (can be Node, string, HTMLElement, or array)
 * @param options - Optional rendering configuration
 *
 * @example
 * ```ts
 * render('#app', 'Hello'); // Replaces content
 * render(element, 'World', { insert: 'append' }); // Appends content
 * render('#app', [el1, el2], { insert: 'prepend' }); // Prepends multiple elements
 * render('#app', [el1, null, undefined, el2]); // Handles null/undefined values in arrays
 * ```
 */
export function render(target: TRenderTarget, content: TRenderContent, options: TRenderOptions = {}): void {
	if (!target || content === null || content === undefined) return;

	const element = typeof target === "string" ? selector(target) : target;
	if (!element) return;

	if (!options.insert) {
		element.innerHTML = "";
	}

	if (Array.isArray(content)) {
		// Filter out null and undefined values
		const validContent = content.filter(
			(item): item is string | Node | HTMLElement => item !== null && item !== undefined,
		);

		if (options.insert === "prepend") {
			element.prepend(...validContent);
		} else {
			element.append(...validContent);
		}
		return;
	}

	if (options.insert === "prepend") {
		element.prepend(content);
	} else {
		element.append(content);
	}
}
