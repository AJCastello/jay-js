import type { TBaseTagMap } from "./base.types";

export function createJayJsElementClass<T extends TBaseTagMap>(tagName: T): new () => HTMLElement {
	if (!/^[a-z][a-z0-9-]*$/.test(tagName)) {
		throw new Error(`Nome de elemento inválido: ${tagName}`);
	}

	const baseElement = document.createElement(tagName);
	const BaseClass = baseElement.constructor as { new (): HTMLElement };

	class JayJsElement extends BaseClass {
		onmount?: (element: HTMLElement) => void | (() => void);
		onunmount?: (element: HTMLElement) => void;
		private _cleanupFromMount?: () => void;

		connectedCallback() {
			if (typeof this.onmount === "function") {
				const cleanup = this.onmount(this);

				if (typeof cleanup === "function") {
					this._cleanupFromMount = cleanup;
				}
			}
		}

		disconnectedCallback() {
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
					this.onunmount(this);
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
