import { uniKey } from "../utils/uni-key.js";
import { TBaseTagMap, TBase, TLifecycleElement, TStyle } from "./base.types.js";
import { registerJayJsElement } from "./jay-js-element.js";

export function Base<T extends TBaseTagMap = "div">(
	{ id, tag, ref, style, children, dataset, className, listeners, onmount, onunmount, ...props }: TBase<T> = { tag: "div" },
): HTMLElementTagNameMap[T] {

	const hasLifecycle = Boolean(onmount || onunmount);

	if (hasLifecycle) {
		registerJayJsElement(tag || "div");
	}

	let elementOptions = hasLifecycle ? { is: `jayjs-${tag || "div"}` } : undefined;

	const base = document.createElement(tag || "div", elementOptions);

	if (hasLifecycle) {
		const lyfercycleElement = base as unknown as TLifecycleElement
		if (onmount) lyfercycleElement.onmount = onmount;
		if (onunmount) lyfercycleElement.onunmount = onunmount;
	}

	ref && (ref.current = base);

	const elementId = id || uniKey();
	base.id = elementId;

	if (className) {
		if (typeof className === "function" && (className as Function).name.includes("_set_value_effect")) {
			(className as Function)(base, "className");
		} else {
			base.className = className;
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
