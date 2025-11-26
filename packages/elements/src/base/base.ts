import { Effect, Values } from "@jay-js/system";
import type { TBase, TBaseTagMap, TLifecycleElement, TStyle } from "./base.types.js";
import { registerJayJsElement } from "./jay-js-element.js";

type ReactiveEffect = (target: any, prop: string) => void;

function isReactiveValue(value: any): boolean {
	return typeof value === "function" && (value as ReactiveEffect).name.includes("_set_value_effect");
}

function autoWrapReactive<T>(value: T | (() => T)): T | ReactiveEffect {
	if (typeof value === "function") {
		const fnName = (value as any).name;
		if (fnName?.includes("_set_value_effect")) {
			return value as unknown as ReactiveEffect;
		}
		return Values(value as () => T) as unknown as ReactiveEffect;
	}
	return value;
}

function isEventHandler(propName: string, value: any): boolean {
	if (typeof value !== "function") {
		return false;
	}

	if (propName.startsWith("on") && propName.length > 2) {
		const thirdChar = propName[2];
		return thirdChar === thirdChar.toLowerCase() && thirdChar !== thirdChar.toUpperCase();
	}

	return false;
}

function isReactiveFunction(fn: (...args: any[]) => any): boolean {
	const name = fn.name;
	return name?.includes("_set_value_effect") || name?.includes("_effect");
}

export function Base<T extends TBaseTagMap = "div">(
	{ id, tag, ref, style, children, dataset, className, listeners, onmount, onunmount, ...props }: TBase<T> = {
		tag: "div",
	},
): HTMLElementTagNameMap[T] {
	const hasLifecycle = Boolean(onmount || onunmount);

	if (hasLifecycle) {
		registerJayJsElement(tag || "div");
	}

	const elementOptions = hasLifecycle ? { is: `jayjs-${tag || "div"}` } : undefined;

	const base = document.createElement(tag || "div", elementOptions);

	if (hasLifecycle) {
		const lyfercycleElement = base as unknown as TLifecycleElement;
		if (onmount) lyfercycleElement.onmount = onmount;
		if (onunmount) lyfercycleElement.onunmount = onunmount;
	}

	if (ref) {
		ref.current = base;
	}

	if (id) {
		const wrappedId = autoWrapReactive(id);
		if (isReactiveValue(wrappedId)) {
			(wrappedId as unknown as ReactiveEffect)(base, "id");
		} else {
			base.id = wrappedId as string;
		}
	}

	if (className) {
		const wrappedClassName = autoWrapReactive(className);
		if (isReactiveValue(wrappedClassName)) {
			(wrappedClassName as unknown as ReactiveEffect)(base, "className");
		} else {
			base.className = wrappedClassName as string;
		}
	}

	listeners &&
		Object.entries(listeners).forEach(([key, value]) => {
			base.addEventListener(key, value as EventListener);
		});

	if (style) {
		if (isReactiveValue(style)) {
			(style as unknown as ReactiveEffect)(base, "style");
		} else {
			Object.entries(style).forEach(([key, value]: [string, any]) => {
				if (key === "parentRule" || key === "length") return;
				const wrappedValue = autoWrapReactive(value);
				if (isReactiveValue(wrappedValue)) {
					(wrappedValue as unknown as ReactiveEffect)(base.style, key);
				} else {
					base.style[key as keyof TStyle] = wrappedValue;
				}
			});
		}
	}

	if (dataset) {
		if (isReactiveValue(dataset)) {
			(dataset as unknown as ReactiveEffect)(base, "dataset");
		} else {
			Object.entries(dataset).forEach(([key, value]) => {
				const wrappedValue = autoWrapReactive(value);
				if (isReactiveValue(wrappedValue)) {
					(wrappedValue as unknown as ReactiveEffect)(base.dataset, key);
				} else {
					base.dataset[key] = wrappedValue as string;
				}
			});
		}
	}

	if (children) {
		if (typeof children === "function") {
			appendChildToBase(base, children);
		} else if (children instanceof Promise) {
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
			if (isEventHandler(key, value)) {
				try {
					(base as any)[key] = value;
				} catch (error) {
					if (error instanceof TypeError) {
						console.warn(`JayJS: Cannot set property "${key}" of type "${typeof value}" to "${value}".`);
					}
					throw error;
				}
				return;
			}

			const wrappedValue = autoWrapReactive(value);
			if (isReactiveValue(wrappedValue)) {
				(wrappedValue as unknown as ReactiveEffect)(base, key);
			} else {
				try {
					(base as any)[key] = wrappedValue;
				} catch (error) {
					if (error instanceof TypeError) {
						console.warn(`JayJS: Cannot set property "${key}" of type "${typeof value}" to "${value}".`);
					}
					throw error;
				}
			}
		});

	return base as HTMLElementTagNameMap[T];
}

function updateChildNode(currentNode: Node, newValue: string | Node | boolean | null | undefined): Node {
	if (typeof newValue === "string") {
		if (currentNode instanceof Text) {
			currentNode.textContent = newValue;
			return currentNode;
		}
		const newTextNode = document.createTextNode(newValue);
		(currentNode as ChildNode).replaceWith(newTextNode);
		return newTextNode;
	}

	if (newValue instanceof Node) {
		(currentNode as ChildNode).replaceWith(newValue);
		return newValue;
	}

	if (newValue === null || newValue === undefined || newValue === false || newValue === true) {
		if (currentNode instanceof Text) {
			currentNode.textContent = "";
			return currentNode;
		}
		const emptyTextNode = document.createTextNode("");
		(currentNode as ChildNode).replaceWith(emptyTextNode);
		return emptyTextNode;
	}

	return currentNode;
}

function appendChildToBase(
	base: HTMLElement,
	child:
		| string
		| Node
		| boolean
		| null
		| undefined
		| Promise<string | Node | boolean | null | undefined>
		| (() => string | Node | boolean | null | undefined | Promise<string | Node | boolean | null | undefined>),
): void {
	if (typeof child === "function") {
		if (isReactiveFunction(child)) {
			const result = child();
			appendChildToBase(base, result);
			return;
		}

		let currentNode: Node = document.createTextNode("");
		base.appendChild(currentNode);

		const effectFn = () => {
			const result = child();

			if (result instanceof Promise) {
				result
					.then((resolved) => {
						currentNode = updateChildNode(currentNode, resolved);
					})
					.catch((error) => {
						console.error("JayJS: Error resolving child Promise:", error);
						currentNode = updateChildNode(currentNode, null);
					});
				return;
			}

			currentNode = updateChildNode(currentNode, result);
		};

		Effect(effectFn);

		return;
	}

	if (child instanceof Promise) {
		const elementSlot = document.createElement("jayjs-lazy-slot");
		base.appendChild(elementSlot);
		child
			.then((resolvedChild) => {
				if (resolvedChild && typeof resolvedChild !== "boolean") {
					elementSlot.replaceWith(resolvedChild);
				}
			})
			.catch((error) => {
				console.error("JayJS: Error resolving child Promise:", error);
				elementSlot.remove();
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
