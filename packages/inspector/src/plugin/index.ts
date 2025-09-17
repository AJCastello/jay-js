import type { Plugin, ResolvedConfig, ViteDevServer } from "vite";
import { EditorIntegration } from "../utils/bridge.js";
import { createFileFilter } from "../utils/index.js";
import { transformSource } from "./transformer.js";
import type { JayJsInspectorOptions } from "./types.js";

/**
 * Default options for Jay JS Inspector
 */
const DEFAULT_OPTIONS: Required<JayJsInspectorOptions> = {
	enabled: process.env.NODE_ENV === "development",
	editor: "code",
	overlayStyles: {
		backgroundColor: "rgba(65, 184, 131, 0.2)",
		borderColor: "#41b883",
		borderWidth: "2px",
		borderStyle: "solid",
		opacity: 0.8,
	},
	include: ["**/*.{ts,tsx,js,jsx}"],
	exclude: ["**/node_modules/**", "**/dist/**", "**/*.d.ts"],
	activationKey: "shift+click",
};

/**
 * Vite plugin for Jay JS Inspector
 * Instruments Jay JS component calls with debug metadata for click-to-source functionality
 */
export function jayJsInspector(options: JayJsInspectorOptions = {}): Plugin {
	const config = { ...DEFAULT_OPTIONS, ...options };
	const fileFilter = createFileFilter(config.include, config.exclude);
	let transformedFiles = 0;

	return {
		name: "jayjs-inspector",

		configResolved(resolvedConfig: ResolvedConfig) {
			// Only enable in development mode
			if (resolvedConfig.command !== "serve" || !config.enabled) {
				if (!config.enabled) {
					console.log("🔍 Jay JS Inspector: Disabled");
				}
				return;
			}

			// Show startup message
			console.log("\n🔍 Jay JS Inspector: Active");
			console.log(`📝 Editor: ${config.editor}`);
			console.log(`⌨️  Activation: ${config.activationKey}`);
			console.log(`📁 Include: ${config.include.join(", ")}`);
			console.log(`🚫 Exclude: ${config.exclude.join(", ")}`);
			console.log("💡 Press Shift+Alt+J to toggle inspector mode, then Shift+Click on components\n");
		},

		transform(code: string, id: string) {
			// Skip if not enabled or not a target file
			if (!config.enabled || !fileFilter(id)) {
				return null;
			}

			// Transform the source code
			const transformedCode = transformSource(code, id);

			if (transformedCode) {
				transformedFiles++;
				if (transformedFiles === 1) {
					console.log("🔧 Jay JS Inspector: Started instrumenting components...");
				}

				// Show occasional progress
				if (transformedFiles % 10 === 0) {
					console.log(`🔧 Jay JS Inspector: Instrumented ${transformedFiles} files so far`);
				}

				return {
					code: transformedCode,
					map: null, // TODO: Generate source map for better debugging
				};
			}

			return null;
		},

		configureServer(server: ViteDevServer) {
			if (!config.enabled) return;

			console.log("🌐 Jay JS Inspector: Server middleware configured");
			console.log("🔗 Endpoints available:");
			console.log("   • POST /__jayjs-inspector/open-in-editor");
			console.log("   • GET  /__jayjs-inspector/health");
			console.log("   • GET  /__jayjs-inspector/runtime.js");

			// Add middleware to handle inspector requests
			server.middlewares.use("/__jayjs-inspector", (req: any, res: any, next: any) => {
				if (req.method === "POST" && req.url === "/__jayjs-inspector/open-in-editor") {
					// Handle open-in-editor requests
					handleOpenInEditor(req, res, config.editor);
				} else if (req.method === "GET" && req.url === "/__jayjs-inspector/health") {
					// Health check endpoint
					res.writeHead(200, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ status: "ok" }));
				} else if (req.method === "GET" && req.url === "/__jayjs-inspector/runtime.js") {
					// Serve the runtime script
					res.writeHead(200, { "Content-Type": "application/javascript" });
					res.end(generateInspectorRuntime(config));
				} else {
					next();
				}
			});

			// Inject runtime script into HTML pages
			server.middlewares.use((req: any, res: any, next: any) => {
				if (req.url && req.url.endsWith('.html') || req.url === '/') {
					const originalEnd = res.end;
					res.end = function(chunk: any, encoding: any) {
						if (chunk && typeof chunk === 'string' && chunk.includes('<head>')) {
							const inspectorScript = `<script>
								${generateInspectorRuntime(config)}
							</script>`;
							chunk = chunk.replace('<head>', `<head>${inspectorScript}`);
						}
						return originalEnd.call(this, chunk, encoding);
					};
				}
				next();
			});
		},

		generateBundle() {
			// Inject inspector runtime in development
			if (config.enabled) {
				this.emitFile({
					type: "asset",
					fileName: "jayjs-inspector-runtime.js",
					source: generateInspectorRuntime(config),
				});
			}
		},
	};
}

/**
 * Handle open-in-editor requests from the browser
 */
async function handleOpenInEditor(req: any, res: any, editor: string) {
	try {
		let body = "";
		req.on("data", (chunk: Buffer) => {
			body += chunk.toString();
		});

		req.on("end", async () => {
			const { file, line, column } = JSON.parse(body);

			console.log(`🚀 Jay JS Inspector: Opening ${file}:${line}:${column} in ${editor}`);

			// Use EditorIntegration to open file
			const result = await EditorIntegration.openFile(file, line, column, editor);

			if (result.success) {
				console.log(`✅ Jay JS Inspector: Successfully opened file in ${editor}`);
			} else {
				console.error(`❌ Jay JS Inspector: Failed to open file - ${result.error}`);
			}

			res.writeHead(result.success ? 200 : 500, { "Content-Type": "application/json" });
			res.end(JSON.stringify(result));
		});
	} catch (error) {
		console.error("❌ Jay JS Inspector: Error handling open-in-editor request:", error);
		res.writeHead(500, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				success: false,
				error: error instanceof Error ? error.message : "Unknown error",
			}),
		);
	}
}

/**
 * Generate runtime script for inspector overlay
 */
function generateInspectorRuntime(config: Required<JayJsInspectorOptions>): string {
	return `
(function() {
  if (typeof window === 'undefined') return;

  console.log('[Jay JS Inspector] Runtime script loaded');

  window.__JAYJS_INSPECTOR_CONFIG__ = ${JSON.stringify(config)};

  // Define the inspector class inline to avoid import issues
  class JayJsInspectorRuntime {
    constructor(config) {
      this.config = config;
      this.overlay = null;
      this.elementMap = new WeakMap();
      this.isEnabled = false;
      this.init();
    }

    init() {
      window.__JAYJS_INSPECTOR__ = this;
      this.createOverlay();
      this.bindEvents();

      console.log('[Jay JS Inspector] Runtime initialized');
      console.log('[Jay JS Inspector] Config:', this.config);
      console.log('[Jay JS Inspector] Press Shift+Alt+J to toggle inspector mode');
      console.log('[Jay JS Inspector] Then use Shift+Click on components to open in editor');
    }

    registerElement(element, metadata) {
      this.elementMap.set(element, metadata);
      element.dataset.jayjsComponent = metadata.component;
      element.dataset.jayjsFile = metadata.file;
      element.dataset.jayjsLine = metadata.line.toString();
      console.log('[Jay JS Inspector] Registered ' + metadata.component + ' from ' + metadata.file + ':' + metadata.line, element);
    }

    createOverlay() {
      this.overlay = document.createElement('div');
      this.overlay.id = 'jayjs-inspector-overlay';

      Object.assign(this.overlay.style, {
        position: 'absolute',
        pointerEvents: 'none',
        zIndex: '999999',
        display: 'none',
        backgroundColor: this.config.overlayStyles.backgroundColor,
        border: this.config.overlayStyles.borderWidth + ' ' + this.config.overlayStyles.borderStyle + ' ' + this.config.overlayStyles.borderColor,
        opacity: this.config.overlayStyles.opacity.toString(),
        borderRadius: '4px',
        transition: 'all 0.1s ease'
      });

      const tooltip = document.createElement('div');
      tooltip.style.cssText = 'position: absolute; top: -30px; left: 0; background: #333; color: white; padding: 4px 8px; border-radius: 4px; font-size: 12px; font-family: monospace; white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.3);';

      this.overlay.appendChild(tooltip);
      document.body.appendChild(this.overlay);
    }

    bindEvents() {
      let isInspecting = false;
      const self = this;

      document.addEventListener('keydown', function(e) {
        if (e.key.toLowerCase() === 'j' && e.shiftKey && e.altKey) {
          e.preventDefault();
          isInspecting = !isInspecting;
          self.setInspecting(isInspecting);
        }
      });

      document.addEventListener('mouseover', function(e) {
        if (!isInspecting) return;
        const metadata = self.findComponentMetadata(e.target);
        if (metadata) {
          self.showOverlay(e.target, metadata);
        }
      });

      document.addEventListener('mouseout', function(e) {
        if (!isInspecting) return;
        self.hideOverlay();
      });

      document.addEventListener('click', function(e) {
        if (!isInspecting) return;

        if (self.config.activationKey === 'shift+click' && !e.shiftKey) return;
        if (self.config.activationKey === 'ctrl+click' && !e.ctrlKey) return;
        if (self.config.activationKey === 'alt+click' && !e.altKey) return;

        e.preventDefault();
        e.stopPropagation();

        const metadata = self.findComponentMetadata(e.target);
        if (metadata) {
          self.openInEditor(metadata);
        }
      });
    }

    findComponentMetadata(element) {
      let current = element;
      while (current) {
        const metadata = this.elementMap.get(current);
        if (metadata) return metadata;
        current = current.parentElement;
      }
      return null;
    }

    showOverlay(element, metadata) {
      if (!this.overlay) return;

      const rect = element.getBoundingClientRect();
      const tooltip = this.overlay.firstElementChild;

      this.overlay.style.display = 'block';
      this.overlay.style.left = rect.left + window.scrollX + 'px';
      this.overlay.style.top = rect.top + window.scrollY + 'px';
      this.overlay.style.width = rect.width + 'px';
      this.overlay.style.height = rect.height + 'px';

      const fileName = metadata.file.split('/').pop() || metadata.file;
      tooltip.textContent = '<' + metadata.component + '> ' + fileName + ':' + metadata.line;
    }

    hideOverlay() {
      if (this.overlay) {
        this.overlay.style.display = 'none';
      }
    }

    setInspecting(enabled) {
      this.isEnabled = enabled;

      if (enabled) {
        document.body.style.cursor = 'crosshair';
        console.log('[Jay JS Inspector] Inspector mode enabled. Click on components to open in editor.');
      } else {
        document.body.style.cursor = '';
        this.hideOverlay();
        console.log('[Jay JS Inspector] Inspector mode disabled.');
      }
    }

    async openInEditor(metadata) {
      try {
        const response = await fetch('/__jayjs-inspector/open-in-editor', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            file: metadata.file,
            line: metadata.line,
            column: metadata.column
          })
        });

        if (response.ok) {
          console.log('[Jay JS Inspector] Opening ' + metadata.file + ':' + metadata.line);
        } else {
          console.error('[Jay JS Inspector] Failed to open file in editor');
        }
      } catch (error) {
        console.error('[Jay JS Inspector] Error opening file:', error);
      }
    }
  }

  // Define the debug function
  window.__jayjs_debug__ = function(element, metadata) {
    if (window.__JAYJS_INSPECTOR__) {
      window.__JAYJS_INSPECTOR__.registerElement(element, metadata);
    }
    return element;
  };

  // Initialize inspector when DOM is ready
  function initializeInspector() {
    new JayJsInspectorRuntime(window.__JAYJS_INSPECTOR_CONFIG__);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeInspector);
  } else {
    initializeInspector();
  }
})();
  `;
}
