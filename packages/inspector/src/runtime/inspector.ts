import type { ComponentMetadata, JayJsInspectorOptions } from "../plugin/types.js";

/**
 * Debug function that gets injected into instrumented components
 * This function is called at runtime for each Jay JS component
 */
export function __jayjs_debug__(element: HTMLElement, metadata: ComponentMetadata): HTMLElement {
	if (typeof window === "undefined" || !window.__JAYJS_INSPECTOR__) {
		return element;
	}

	// Register element with inspector
	window.__JAYJS_INSPECTOR__.registerElement(element, metadata);

	return element;
}

/**
 * Runtime inspector that handles element detection and overlay
 */
export class JayJsInspectorRuntime {
	private overlay: HTMLElement | null = null;
	private elementMap = new WeakMap<HTMLElement, ComponentMetadata>();

	constructor(private config: Required<JayJsInspectorOptions>) {
		this.init();
	}

	private init() {
		// Add inspector to global scope
		(window as any).__JAYJS_INSPECTOR__ = this;

		// Create overlay element
		this.createOverlay();

		// Bind event listeners
		this.bindEvents();

		console.log("[Jay JS Inspector] Runtime initialized");
	}

	/**
	 * Register an element with its component metadata
	 */
	registerElement(element: HTMLElement, metadata: ComponentMetadata) {
		this.elementMap.set(element, metadata);

		// Add data attributes for debugging
		element.dataset.jayjsComponent = metadata.component;
		element.dataset.jayjsFile = metadata.file;
		element.dataset.jayjsLine = metadata.line.toString();
	}

	/**
	 * Create the visual overlay element
	 */
	private createOverlay() {
		this.overlay = document.createElement("div");
		this.overlay.id = "jayjs-inspector-overlay";

		// Apply styles
		Object.assign(this.overlay.style, {
			position: "absolute",
			pointerEvents: "none",
			zIndex: "999999",
			display: "none",
			backgroundColor: this.config.overlayStyles.backgroundColor,
			border: `${this.config.overlayStyles.borderWidth} ${this.config.overlayStyles.borderStyle} ${this.config.overlayStyles.borderColor}`,
			opacity: this.config.overlayStyles.opacity?.toString(),
			borderRadius: "4px",
			transition: "all 0.1s ease",
		});

		// Add tooltip
		const tooltip = document.createElement("div");
		tooltip.style.cssText = `
      position: absolute;
      top: -30px;
      left: 0;
      background: #333;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-family: monospace;
      white-space: nowrap;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    `;

		this.overlay.appendChild(tooltip);
		document.body.appendChild(this.overlay);
	}

	/**
	 * Bind event listeners for inspector functionality
	 */
	private bindEvents() {
		let isInspecting = false;

		// Toggle inspector with keyboard shortcut
		document.addEventListener("keydown", (e) => {
			if (e.key === "i" && e.shiftKey && e.metaKey) {
				e.preventDefault();
				isInspecting = !isInspecting;
				this.setInspecting(isInspecting);
			}
		});

		// Handle mouse events
		document.addEventListener("mouseover", (e) => {
			if (!isInspecting) return;

			const target = e.target as HTMLElement;
			const metadata = this.findComponentMetadata(target);

			if (metadata) {
				this.showOverlay(target, metadata);
			}
		});

		document.addEventListener("mouseout", (_e) => {
			if (!isInspecting) return;
			this.hideOverlay();
		});

		document.addEventListener("click", (e) => {
			if (!isInspecting) return;

			// Check activation key
			if (this.config.activationKey === "shift+click" && !e.shiftKey) return;
			if (this.config.activationKey === "ctrl+click" && !e.ctrlKey) return;
			if (this.config.activationKey === "alt+click" && !e.altKey) return;

			e.preventDefault();
			e.stopPropagation();

			const target = e.target as HTMLElement;
			const metadata = this.findComponentMetadata(target);

			if (metadata) {
				this.openInEditor(metadata);
			}
		});
	}

	/**
	 * Find component metadata for an element or its parents
	 */
	private findComponentMetadata(element: HTMLElement): ComponentMetadata | null {
		let current: HTMLElement | null = element;

		while (current) {
			const metadata = this.elementMap.get(current);
			if (metadata) {
				return metadata;
			}
			current = current.parentElement;
		}

		return null;
	}

	/**
	 * Show overlay on the target element
	 */
	private showOverlay(element: HTMLElement, metadata: ComponentMetadata) {
		if (!this.overlay) return;

		const rect = element.getBoundingClientRect();
		const tooltip = this.overlay.firstElementChild as HTMLElement;

		// Position overlay
		this.overlay.style.display = "block";
		this.overlay.style.left = `${rect.left + window.scrollX}px`;
		this.overlay.style.top = `${rect.top + window.scrollY}px`;
		this.overlay.style.width = `${rect.width}px`;
		this.overlay.style.height = `${rect.height}px`;

		// Update tooltip
		const fileName = metadata.file.split("/").pop() || metadata.file;
		tooltip.textContent = `<${metadata.component}> ${fileName}:${metadata.line}`;
	}

	/**
	 * Hide the overlay
	 */
	private hideOverlay() {
		if (this.overlay) {
			this.overlay.style.display = "none";
		}
	}

	/**
	 * Toggle inspector mode
	 */
	private setInspecting(enabled: boolean) {
		this.isEnabled = enabled;

		if (enabled) {
			document.body.style.cursor = "crosshair";
			console.log("[Jay JS Inspector] Inspector mode enabled. Click on components to open in editor.");
		} else {
			document.body.style.cursor = "";
			this.hideOverlay();
			console.log("[Jay JS Inspector] Inspector mode disabled.");
		}
	}

	/**
	 * Send request to open file in editor
	 */
	private async openInEditor(metadata: ComponentMetadata) {
		try {
			const response = await fetch("/__jayjs-inspector/open-in-editor", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					file: metadata.file,
					line: metadata.line,
					column: metadata.column,
				}),
			});

			if (response.ok) {
				console.log(`[Jay JS Inspector] Opening ${metadata.file}:${metadata.line}`);
			} else {
				console.error("[Jay JS Inspector] Failed to open file in editor");
			}
		} catch (error) {
			console.error("[Jay JS Inspector] Error opening file:", error);
		}
	}
}

// Global type declarations
declare global {
	interface Window {
		__JAYJS_INSPECTOR__?: JayJsInspectorRuntime;
		__JAYJS_INSPECTOR_CONFIG__?: Required<JayJsInspectorOptions>;
	}
}
