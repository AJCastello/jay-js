import type { TRenderContent, TRenderContentSync, TRenderOptions, TRenderTarget } from "../types.js";
import { selector } from "./query.js";

/**
 * Checks if content contains any Promises
 */
function hasPromise(content: TRenderContent): boolean {
	if (content instanceof Promise) return true;
	if (Array.isArray(content)) {
		return content.some((item) => item instanceof Promise);
	}
	return false;
}

/**
 * Resolves all Promises in content
 */
async function resolveContent(content: TRenderContent): Promise<TRenderContentSync> {
	if (content instanceof Promise) {
		return await content;
	}
	if (Array.isArray(content)) {
		return await Promise.all(content.map((item) => (item instanceof Promise ? item : item)));
	}
	return content as TRenderContentSync;
}

/**
 * Renders content into a target element in the DOM
 * @param target - Element or selector to render content into
 * @param content - Content to render (can be Node, string, HTMLElement, Promise<HTMLElement>, or array)
 * @param options - Optional rendering configuration
 *
 * @example
 * ```ts
 * render('#app', 'Hello'); // Replaces content
 * render(element, 'World', { insert: 'append' }); // Appends content
 * render('#app', [el1, el2], { insert: 'prepend' }); // Prepends multiple elements
 * render('#app', [el1, null, undefined, el2]); // Handles null/undefined values in arrays
 * render('#old-element', newElement, { replace: true }); // Replaces the target element itself
 * await render('#app', asyncElement); // Handles Promise<HTMLElement>
 * ```
 */
export function render(
	target: TRenderTarget,
	content: TRenderContent,
	options: TRenderOptions = {},
): void | Promise<void> {
	if (hasPromise(content)) {
		return renderAsync(target, content, options);
	}

	return renderSync(target, content as TRenderContentSync, options);
}

/**
 * Async version of render for Promise content
 */
async function renderAsync(
	target: TRenderTarget,
	content: TRenderContent,
	options: TRenderOptions = {},
): Promise<void> {
	if (!target || content === null || content === undefined) return;

	const element = typeof target === "string" ? selector(target) : target;
	if (!element) return;

	const resolvedContent = await resolveContent(content);

	renderSync(target, resolvedContent, options);
}

/**
 * Sync version of render for non-Promise content
 */
function renderSync(target: TRenderTarget, content: TRenderContentSync, options: TRenderOptions = {}): void {
	if (!target || content === null || content === undefined) return;

	const element = typeof target === "string" ? selector(target) : target;
	if (!element) return;

	if (options.replace) {
		if (Array.isArray(content)) {
			const validContent = content.filter(
				(item): item is string | Node | HTMLElement => item !== null && item !== undefined,
			);

			const fragment = document.createDocumentFragment();
			fragment.append(...validContent);
			element.replaceWith(fragment);
		} else {
			element.replaceWith(content);
		}
		return;
	}

	if (!options.insert) {
		element.innerHTML = "";
	}

	if (Array.isArray(content)) {
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
