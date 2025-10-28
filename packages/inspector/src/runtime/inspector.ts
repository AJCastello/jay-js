import type { ComponentMetadata, JayJsInspectorOptions } from "../plugin/types.js";

/**
 * Debug function that gets injected into instrumented components
 * This function is called at runtime for each Jay JS component
 * It's attached to the global window object for easy access from transformed code
 */
export function __jayjs_debug__(element: HTMLElement, metadata: ComponentMetadata): HTMLElement {
	if (typeof window === "undefined" || !window.__JAYJS_INSPECTOR__) {
		return element;
	}

	try {
		// Register element with inspector
		window.__JAYJS_INSPECTOR__.registerElement(element, metadata);
	} catch (_error) {
		// Silent fail - no logging needed
	}

	return element;
}

// Ensure the debug function is available globally
if (typeof window !== "undefined") {
	window.__jayjs_debug__ = __jayjs_debug__;
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

		// Runtime initialized - ready for use
	} /**
	 * Register an element with its component metadata
	 */
	registerElement(element: HTMLElement, metadata: ComponentMetadata) {
		try {
			this.elementMap.set(element, metadata);

			// Add data attributes for debugging
			element.dataset.jayjsComponent = metadata.component;
			element.dataset.jayjsFile = metadata.file;
			element.dataset.jayjsLine = metadata.line.toString();

			// Element registered successfully
		} catch (error) {
			console.error(`[Jay JS Inspector] Failed to register element:`, error);
		}
	} /**
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
			// Use Shift + Alt + J to avoid conflicts with browser shortcuts
			if (e.key.toLowerCase() === "j" && e.shiftKey && e.altKey) {
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

			const target = e.target as HTMLElement;
			const metadata = this.findComponentMetadata(target);

			if (!metadata) return;

			e.preventDefault();
			e.stopPropagation();

			// Ctrl+Click or Alt+Click: Copy file path to clipboard
			if (e.ctrlKey || e.altKey) {
				this.copyFilePath(metadata);
			}
			// Shift+Click: Open in editor
			else if (e.shiftKey) {
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
		if (enabled) {
			document.body.style.cursor = "crosshair";
		} else {
			document.body.style.cursor = "";
			this.hideOverlay();
		}
	}

	/**
	 * Copy file path to clipboard
	 */
	private async copyFilePath(metadata: ComponentMetadata) {
		try {
			const filePath = `${metadata.file}:${metadata.line}:${metadata.column}`;
			await navigator.clipboard.writeText(filePath);

			// Show feedback
			const notification = document.createElement("div");
			notification.textContent = `Copied: ${filePath}`;
			Object.assign(notification.style, {
				position: "fixed",
				top: "20px",
				left: "50%",
				transform: "translateX(-50%)",
				backgroundColor: "#333",
				color: "white",
				padding: "12px 24px",
				borderRadius: "4px",
				zIndex: "1000000",
				fontFamily: "monospace",
				fontSize: "14px",
				boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
			});

			document.body.appendChild(notification);
			setTimeout(() => notification.remove(), 2000);
		} catch (error) {
			console.error("[Jay JS Inspector] Error copying file path:", error);
		}
	}

	/**
	 * Send request to open file in editor
	 */
	private async openInEditor(metadata: ComponentMetadata) {
		try {
			const _response = await fetch("/__jayjs-inspector/open-in-editor", {
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

			// Request sent to editor
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
		__jayjs_debug__?: typeof __jayjs_debug__;
		__JAYJS_DEBUG_REPORTER__?: any;
	}
}
