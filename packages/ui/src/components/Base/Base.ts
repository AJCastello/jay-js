import { mergeClasses } from "../../utils/merge-classes.js";
import { uniKey } from "../../utils/uni-key.js";
import type { TBase, TBaseTagMap, TStyle } from "./Base.types.js";

const elementLifecycle = new Map<string, { element: HTMLElement; ondismount?: (element: HTMLElement) => void }>();

const observer = new MutationObserver((mutations) => {
	for (const mutation of mutations) {
		if (mutation.type === "childList" && mutation.removedNodes.length > 0) {
			mutation.removedNodes.forEach((node) => {
				if (node instanceof HTMLElement) {
					processRemovedElement(node);
					const removedElements = node.querySelectorAll("*");
					removedElements.forEach((el) => {
						if (el instanceof HTMLElement) {
							processRemovedElement(el);
						}
					});
				}
			});
		}
	}
});

function startObserver() {
	if (typeof document !== "undefined") {
		observer.observe(document.body, {
			childList: true,
			subtree: true,
		});
	}
}

function processRemovedElement(element: HTMLElement) {
	const id = element.id;
	if (id && elementLifecycle.has(id)) {
		const { ondismount } = elementLifecycle.get(id) || {};
		if (ondismount) {
			try {
				ondismount(element);
				console.log("JayJS: ondismount callback executed for element:", id);
			} catch (error) {
				console.error("JayJS: Error executing ondismount callback:", error);
			}
		}
		elementLifecycle.delete(id);
	}
}

if (typeof document !== "undefined") {
	if (document.readyState === "loading") {
		document.addEventListener("DOMContentLoaded", startObserver);
	} else {
		startObserver();
	}
}

export function Base<T extends TBaseTagMap = "div">(
	{ id, tag, ref, style, children, dataset, className, listeners, onmount, ondismount, ...props }: TBase<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {
	const base = document.createElement(tag || "div");
	ref && (ref.current = base);

	const elementId = id || uniKey();
	base.id = elementId;

	if (className) {
		if (typeof className === "function" && (className as Function).name.includes("_set_value_effect")) {
			(className as Function)(base, "className");
		} else {
			base.className = mergeClasses([className]);
		}
	}

	listeners &&
		Object.entries(listeners).forEach(([key, value]) => {
			base.addEventListener(key, value as EventListener);
		});

	style &&
		Object.entries(style).forEach(([key, value]: [string, any]) => {
			if (key === "parentRule" || key === "length") return;
			base.style[key as keyof TStyle] = value;
		});

	dataset &&
		Object.entries(dataset).forEach(([key, value]) => {
			base.dataset[key] = value as string;
		});

	// TODO: fix
	if (ondismount) {
		elementLifecycle.set(elementId, {
			element: base,
			ondismount
		});
	}

	if (onmount) {
		setTimeout(() => {
			try {
				onmount(base);
			} catch (error) {
				console.error("JayJS: Error executing onmount callback:", error);
			}
		});
	}

	if (children) {
		if (children instanceof Promise) {
			const elementSlot = document.createElement("jayjs-lazy-slot");
			base.appendChild(elementSlot);
			children
				.then((resolvedChild) => {
					if (resolvedChild && typeof resolvedChild !== "boolean") {
						elementSlot.replaceWith(resolvedChild);
					}
				})
				.catch((error) => {
					console.error("Failed to resolve child promise:", error);
				});
		} else {
			if (Array.isArray(children)) {
				children.forEach((child) => {
					if (child) {
						if (typeof child !== "boolean") {
							appendChildToBase(base, child);
						}
					}
				});
			} else {
				if (typeof children !== "boolean") {
					appendChildToBase(base, children);
				}
			}
		}
	}

	props &&
		Object.entries(props).forEach(([key, value]) => {
			try {
				(base as any)[key] = value;
			} catch (error) {
				if (error instanceof TypeError) {
					console.warn(`JayJS: Cannot set property "${key}" of type "${typeof value}" to "${value}".`);
					throw error;
				}
			}
		});
	return base as HTMLElementTagNameMap[T];
}

function appendChildToBase(
	base: HTMLElement,
	child: string | Node | boolean | null | undefined | Promise<string | Node | boolean | null | undefined>,
): void {
	if (child instanceof Promise) {
		const elementSlot = document.createElement("jayjs-lazy-slot");
		base.appendChild(elementSlot);
		child.then((resolvedChild) => {
			if (resolvedChild && typeof resolvedChild !== "boolean") {
				elementSlot.replaceWith(resolvedChild);
			}
		});
		return;
	}
	if (typeof child === "string") {
		base.appendChild(document.createTextNode(child));
		return;
	}
	if (child && typeof child !== "boolean") {
		base.appendChild(child);
	}
}
