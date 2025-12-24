import type { TRefObject } from "../../utils/dom/use-ref.js";
import type { TBaseTagMap } from "./base.types";

export function createJayJsElementClass<T extends TBaseTagMap>(tagName: T): new () => HTMLElement {
	if (!/^[a-z][a-z0-9-]*$/.test(tagName)) {
		throw new Error(`Nome de elemento inválido: ${tagName}`);
	}

	const baseElement = document.createElement(tagName);
	const BaseClass = baseElement.constructor as { new (): HTMLElement };

	class JayJsElement extends BaseClass {
		onmount?: (element: HTMLElement) => void | (() => void) | Promise<void | (() => void)>;
		onunmount?: (element: HTMLElement) => void | Promise<void>;
		_ref?: TRefObject<HTMLElement>;
		private _cleanupFromMount?: () => void;

		connectedCallback() {
			if (typeof this.onmount === "function") {
				const result = this.onmount(this);

				if (result instanceof Promise) {
					result
						.then((cleanup) => {
							if (typeof cleanup === "function") {
								this._cleanupFromMount = cleanup;
							}
						})
						.catch((error) => {
							console.error("JayJS: Error in async onmount:", error);
						});
				} else if (typeof result === "function") {
					this._cleanupFromMount = result;
				}
			}
		}

		disconnectedCallback() {
			if (this._ref) {
				this._ref.current = null;
				this._ref = undefined;
			}

			if (typeof this._cleanupFromMount === "function") {
				try {
					this._cleanupFromMount();
				} catch (error) {
					console.error("JayJS: Error in onmount cleanup:", error);
				}
				this._cleanupFromMount = undefined;
			}

			if (typeof this.onunmount === "function") {
				try {
					const result = this.onunmount(this);

					if (result instanceof Promise) {
						result.catch((error) => {
							console.error("JayJS: Error in async onunmount:", error);
						});
					}
				} catch (error) {
					console.error("JayJS: Error in onunmount:", error);
				}
			}
		}
	}

	return JayJsElement;
}

export function registerJayJsElement<T extends TBaseTagMap>(tagName: T): void {
	if (!customElements.get(`jayjs-${tagName}`)) {
		const ElementClass = createJayJsElementClass(tagName);
		customElements.define(`jayjs-${tagName}`, ElementClass, { extends: tagName });
	}
}
