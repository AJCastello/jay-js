import { effect, REACTIVE_MARKER, values } from "../../state";
import { Childs, SETCHILD_MARKER } from "../../state/utils/helpers";
import { TRefObject } from "../../utils/dom/use-ref";
import type { TBase, TBaseTagMap, TChildren, TLifecycleElement, TStyle } from "./base.types.js";
import { registerJayJsElement } from "./jay-js-element.js";

type ReactiveEffect = (target: any, prop: string) => void;

/**
 * Represents a range in the DOM delimited by comment node markers
 * Used to track DocumentFragment insertions for reactive updates
 */
type FragmentRange = {
	start: Comment;
	end: Comment;
	type: "fragment-range";
};

/**
 * Type for node references that can be either a single Node or a FragmentRange
 */
type TNodeRef = Node | FragmentRange;

/**
 * Checks if a node reference is a FragmentRange
 */
function isFragmentRange(node: TNodeRef): node is FragmentRange {
	return typeof node === "object" && node !== null && "type" in node && node.type === "fragment-range";
}

/**
 * Removes all nodes between two marker nodes (exclusive)
 */
function removeNodesBetween(start: Node, end: Node): void {
	let current = start.nextSibling;
	while (current && current !== end) {
		const next = current.nextSibling;
		current.remove();
		current = next;
	}
}

/**
 * Inserts an array of nodes after a given node
 */
function insertNodesAfter(afterNode: Node, nodes: Node[]): void {
	let current = afterNode as ChildNode;
	for (const node of nodes) {
		current.after(node);
		current = node as ChildNode;
	}
}

function isReactiveValue(value: any): boolean {
	return typeof value === "function" && (value as any)[REACTIVE_MARKER] === true;
}

function autoWrapReactiveValues<T>(value: T | (() => T)): T | ReactiveEffect {
	if (typeof value === "function") {
		if ((value as any)[REACTIVE_MARKER] === true) {
			return value as unknown as ReactiveEffect;
		}
		return values(value as () => T) as unknown as ReactiveEffect;
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

export function Base<T extends TBaseTagMap = "div">(
	{ id, tag, ref, style, children, dataset, className, listeners, onmount, onunmount, ...props }: TBase<T> = {
		tag: "div",
	},
): HTMLElementTagNameMap[T] {
	const hasLifecycle = Boolean(onmount || onunmount || ref);

	if (hasLifecycle) {
		registerJayJsElement(tag || "div");
	}

	const elementOptions = hasLifecycle ? { is: `jayjs-${tag || "div"}` } : undefined;

	const base = document.createElement(tag || "div", elementOptions);

	if (hasLifecycle) {
		const lyfercycleElement = base as unknown as TLifecycleElement;
		if (onmount) lyfercycleElement.onmount = onmount;
		if (onunmount) lyfercycleElement.onunmount = onunmount;
		if (ref) {
			lyfercycleElement._ref = ref;
			ref.current = base;
		}
	}

	if (id) {
		const wrappedId = autoWrapReactiveValues(id);
		if (isReactiveValue(wrappedId)) {
			(wrappedId as unknown as ReactiveEffect)(base, "id");
		} else {
			base.id = wrappedId as string;
		}
	}

	if (className) {
		const wrappedClassName = autoWrapReactiveValues(className);
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
				const wrappedValue = autoWrapReactiveValues(value);
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
				const wrappedValue = autoWrapReactiveValues(value);
				if (isReactiveValue(wrappedValue)) {
					(wrappedValue as unknown as ReactiveEffect)(base.dataset, key);
				} else {
					base.dataset[key] = wrappedValue as string;
				}
			});
		}
	}

	if (children !== null && children !== undefined && typeof children !== "boolean") {
		if (typeof children === "function") {
			appendChildToBase(base, children);
		} else if (children instanceof Promise) {
			const elementSlot = document.createElement("jayjs-lazy-slot");
			base.appendChild(elementSlot);
			children
				.then((resolvedChild) => {
					if (resolvedChild !== null && resolvedChild !== undefined && typeof resolvedChild !== "boolean") {
						if (typeof resolvedChild === "string" || typeof resolvedChild === "number") {
							elementSlot.replaceWith(document.createTextNode(String(resolvedChild)));
						} else {
							elementSlot.replaceWith(resolvedChild);
						}
					}
				})
				.catch((error) => {
					console.error("Failed to resolve child promise:", error);
				});
		} else {
			if (Array.isArray(children)) {
				children.forEach((child) => {
					if (child !== null && child !== undefined && typeof child !== "boolean") {
						appendChildToBase(base, child);
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

			const wrappedValue = autoWrapReactiveValues(value);
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

function updateChildNode(
	currentNode: TNodeRef,
	newValue: string | number | Node | boolean | null | undefined,
): TNodeRef {
	// Handle DocumentFragment
	if (newValue instanceof DocumentFragment) {
		const children = Array.from(newValue.childNodes);

		if (children.length === 0) {
			// Empty fragment - treat as null
			return updateChildNode(currentNode, null);
		}

		if (isFragmentRange(currentNode)) {
			// Already have a range - remove old content and insert new
			removeNodesBetween(currentNode.start, currentNode.end);
			insertNodesAfter(currentNode.start, children);
			return currentNode; // Reuse the same markers
		}

		// First time - create markers
		const startMarker = document.createComment("jayjs-fragment-start");
		const endMarker = document.createComment("jayjs-fragment-end");

		(currentNode as ChildNode).replaceWith(startMarker, ...children, endMarker);

		return {
			start: startMarker,
			end: endMarker,
			type: "fragment-range",
		};
	}

	// If currentNode is a range but newValue is not a fragment, collapse the range
	if (isFragmentRange(currentNode)) {
		removeNodesBetween(currentNode.start, currentNode.end);
		const placeholder = document.createTextNode("");
		currentNode.start.replaceWith(placeholder);
		currentNode.end.remove();
		// Continue with normal logic using the placeholder
		currentNode = placeholder;
	}

	if (typeof newValue === "string" || typeof newValue === "number") {
		if (currentNode instanceof Text) {
			currentNode.textContent = String(newValue);
			return currentNode;
		}
		const newTextNode = document.createTextNode(String(newValue));
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
	child: TChildren
): void {
	if (Array.isArray(child)) {
		for (const nestedChild of child) {
			appendChildToBase(base, nestedChild);
		}
		return;
	}

	if (typeof child === "function") {

		const nodeRefId = crypto.getRandomValues(new Uint32Array(1))[0].toString(16);

		const nodeRef: TRefObject<TNodeRef> = {
			current: document.createTextNode("") as TNodeRef,
			id: nodeRefId
		};

		base.appendChild(nodeRef.current as Node);

		const setChild = () => {
			const result = child()
			if (result instanceof Promise) {
				result
					.then((resolved) => {
						nodeRef.current = updateChildNode(nodeRef.current as TNodeRef, resolved);
					})
					.catch((error) => {
						console.error("JayJS: Error resolving child Promise:", error);
						nodeRef.current = updateChildNode(nodeRef.current as TNodeRef, null);
					});
				return;
			}
		if (Array.isArray(result)) {
			const fragment = document.createDocumentFragment();
			result.forEach(item => {
				if (item instanceof Node) {
					fragment.appendChild(item);
				}
			});
			nodeRef.current = updateChildNode(nodeRef.current as TNodeRef, fragment);
			return;
		}
			nodeRef.current = updateChildNode(nodeRef.current as TNodeRef, result);
		}

		Childs(child, nodeRefId, setChild);

		return;
	}

	if (child instanceof Promise) {
		const elementSlot = document.createElement("jayjs-lazy-slot");
		base.appendChild(elementSlot);
		child
			.then((resolvedChild) => {
				if (resolvedChild !== null && resolvedChild !== undefined && typeof resolvedChild !== "boolean") {
					if (typeof resolvedChild === "string" || typeof resolvedChild === "number") {
						elementSlot.replaceWith(document.createTextNode(String(resolvedChild)));
					} else {
						elementSlot.replaceWith(resolvedChild);
					}
				}
			})
			.catch((error) => {
				console.error("JayJS: Error resolving child Promise:", error);
				elementSlot.remove();
			});
		return;
	}

	if (typeof child === "string" || typeof child === "number") {
		base.appendChild(document.createTextNode(String(child)));
		return;
	}

	if (child !== null && child !== undefined && typeof child !== "boolean") {
		base.appendChild(child);
	}
}
