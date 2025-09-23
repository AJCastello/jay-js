import type { Plugin, ResolvedConfig, ViteDevServer } from "vite";
import { EditorIntegration } from "../utils/bridge.js";
import { createFileFilter } from "../utils/index.js";
import { DebugReporter } from "../utils/debug-reporter.js";
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
	const reporter = DebugReporter.getInstance();
	let transformedFiles = 0;

	// Configure the debug reporter
	reporter.setConfiguration(config);

	return {
		name: "jayjs-inspector",

		configResolved(resolvedConfig: ResolvedConfig) {
			// Only enable in development mode
			if (resolvedConfig.command !== "serve" || !config.enabled) {
				return;
			}

			// Simple startup message
			console.log("🔍 Jay JS Inspector: Active");
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

				return {
					code: transformedCode,
					map: null, // TODO: Generate source map for better debugging
				};
			}

			return null;
		},

		configureServer(server: ViteDevServer) {
			if (!config.enabled) return;

			// Add middleware to handle inspector requests
			server.middlewares.use("/__jayjs-inspector", (req: any, res: any, next: any) => {
				if (req.method === "POST" && req.url === "/open-in-editor") {
					// Handle open-in-editor requests
					handleOpenInEditor(req, res, config.editor, reporter);
				} else if (req.method === "GET" && req.url === "/health") {
					// Health check endpoint
					reporter.setHealthCheck(true);
					res.writeHead(200, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ status: "ok", timestamp: new Date().toISOString() }));
				} else if (req.method === "GET" && req.url === "/runtime.js") {
					// Serve the runtime script
					res.writeHead(200, { "Content-Type": "application/javascript" });
					res.end(generateInspectorRuntime(config));
				} else if (req.method === "GET" && req.url === "/debug-report") {
					// Serve debug report
					res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
					res.end(reporter.generateReport());
				} else {
					next();
				}
			});

			// Inject runtime script into HTML pages using proper module loading
			server.middlewares.use((req: any, res: any, next: any) => {
				if (req.url && (req.url.endsWith(".html") || req.url === "/")) {
					const originalEnd = res.end;
					res.end = function (chunk: any, encoding: any) {
						if (chunk && typeof chunk === "string" && chunk.includes("<head>")) {
							const inspectorScript = `<script type="module">
								// Load inspector runtime
								${generateInspectorRuntime(config)}
							</script>`;
							chunk = chunk.replace("<head>", `<head>${inspectorScript}`);
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
async function handleOpenInEditor(req: any, res: any, editor: string, reporter: DebugReporter) {
	try {
		let body = "";
		req.on("data", (chunk: Buffer) => {
			body += chunk.toString();
		});

		req.on("end", async () => {
			const { file, line, column } = JSON.parse(body);

			// Use EditorIntegration to open file
			const result = await EditorIntegration.openFile(file, line, column, editor);

			// Report the editor request
			reporter.addEditorRequest(file, result.success, result.error);

			res.writeHead(result.success ? 200 : 500, { "Content-Type": "application/json" });
			res.end(JSON.stringify(result));
		});
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : "Unknown error";

		// Report the error
		reporter.addEditorRequest("unknown", false, errorMessage);

		res.writeHead(500, { "Content-Type": "application/json" });
		res.end(
			JSON.stringify({
				success: false,
				error: errorMessage,
			}),
		);
	}
}

/**
 * Generate runtime script for inspector overlay
 * This creates a self-contained runtime that doesn't rely on external imports
 */
function generateInspectorRuntime(config: Required<JayJsInspectorOptions>): string {
	return `
(function() {
  if (typeof window === 'undefined') return;

  console.log('[Jay JS Inspector] Ready - Press Shift+Alt+J to toggle inspector mode');

  window.__JAYJS_INSPECTOR_CONFIG__ = ${JSON.stringify(config)};

  // Initialize Debug Reporter inline to avoid import issues
  function createDebugReporter() {
    const reporter = {
      configuration: ${JSON.stringify(config)},
      transformation: { totalFiles: 0, transformedFiles: 0, skippedFiles: 0, errors: [], detectedComponents: [] },
      runtime: { initialized: false, inspectorAvailable: false, debugFunctionAvailable: false, overlayCreated: false, registeredElements: 0, errors: [] },
      network: { healthCheck: false, editorRequests: [] },

      setRuntimeInitialized() { this.runtime.initialized = true; },
      setInspectorAvailable(available) { this.runtime.inspectorAvailable = available; },
      setDebugFunctionAvailable(available) { this.runtime.debugFunctionAvailable = available; },
      setOverlayCreated(created) { this.runtime.overlayCreated = created; },
      addElementRegistration() { this.runtime.registeredElements++; },
      addRuntimeError(context, error) {
        this.runtime.errors.push({ timestamp: new Date().toISOString(), context, error });
      },

      generateReport() {
        return \`=== JAYJS INSPECTOR DEBUG REPORT ===
Generated: \${new Date().toISOString()}

CONFIGURATION:
- Enabled: \${this.configuration.enabled}
- Editor: \${this.configuration.editor}
- Activation Key: \${this.configuration.activationKey}

RUNTIME STATUS:
- Initialized: \${this.runtime.initialized}
- Inspector Available: \${this.runtime.inspectorAvailable}
- Debug Function Available: \${this.runtime.debugFunctionAvailable}
- Overlay Created: \${this.runtime.overlayCreated}
- Registered Elements: \${this.runtime.registeredElements}

RUNTIME ERRORS:
\${this.runtime.errors.map(e => \`  - [\${e.timestamp}] \${e.context}: \${e.error}\`).join('\\n') || '  (none)'}

DETECTED ELEMENTS:
\${Array.from(document.querySelectorAll('[data-jayjs-component]')).map((el, i) =>
  \`  \${i+1}. \${el.dataset.jayjsComponent} (\${el.dataset.jayjsFile}:\${el.dataset.jayjsLine})\`
).join('\\n') || '  (none found)'}

=== END REPORT ===\`;
      }
    };
    return reporter;
  }

  window.__JAYJS_DEBUG_REPORTER__ = createDebugReporter();

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
    }

    registerElement(element, metadata) {
      if (!element || !metadata) return element;

      this.elementMap.set(element, metadata);
      element.dataset.jayjsComponent = metadata.component;
      element.dataset.jayjsFile = metadata.file;
      element.dataset.jayjsLine = metadata.line.toString();

      return element;
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
      while (current && current !== document.body) {
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
      } else {
        document.body.style.cursor = '';
        this.hideOverlay();
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
          // File opened successfully
        } else {
          // Failed to open file
        }
      } catch (error) {
        // Error opening file - silent fail
      }
    }
  }

  // Define the debug function globally - this is what transformed code will call
  window.__jayjs_debug__ = function(element, metadata) {
    if (!element) return element;

    // Only register if inspector is available
    if (window.__JAYJS_INSPECTOR__ && typeof window.__JAYJS_INSPECTOR__.registerElement === 'function') {
      try {
        return window.__JAYJS_INSPECTOR__.registerElement(element, metadata);
      } catch (error) {
        // Silent fail
      }
    }

    return element;
  };

  // Define global debug report functions
  window.jayjsDebugReport = function() {
    if (window.__JAYJS_DEBUG_REPORTER__ && typeof window.__JAYJS_DEBUG_REPORTER__.generateReport === 'function') {
      console.log(window.__JAYJS_DEBUG_REPORTER__.generateReport());
    } else {
      console.error('Debug reporter not available. Make sure inspector plugin is properly configured.');
    }
  };

  window.jayjsDebugCommands = function() {
    if (window.__JAYJS_DEBUG_REPORTER__ && typeof window.__JAYJS_DEBUG_REPORTER__.generateConsoleReport === 'function') {
      console.log(window.__JAYJS_DEBUG_REPORTER__.generateConsoleReport());
    } else {
      console.log(\`
// COPY THIS ENTIRE BLOCK AND PASTE IT
console.group('🔍 JayJS Inspector Debug Report - Basic');
console.log('Report generated at:', new Date().toISOString());

// Test inspector availability
console.log('🧪 Testing Inspector Components:');
console.log('window.__JAYJS_INSPECTOR__:', typeof window.__JAYJS_INSPECTOR__);
console.log('window.__jayjs_debug__:', typeof window.__jayjs_debug__);
console.log('window.__JAYJS_INSPECTOR_CONFIG__:', typeof window.__JAYJS_INSPECTOR_CONFIG__);
console.log('window.__JAYJS_DEBUG_REPORTER__:', typeof window.__JAYJS_DEBUG_REPORTER__);

// Test health endpoint
fetch('/__jayjs-inspector/health')
  .then(r => r.json())
  .then(data => console.log('🏥 Health check:', data))
  .catch(err => console.error('❌ Health check failed:', err));

// Show registered elements
if (window.__JAYJS_INSPECTOR__) {
  console.log('📊 Inspector instance:', window.__JAYJS_INSPECTOR__);
  const overlay = document.getElementById('jayjs-inspector-overlay');
  console.log('🎯 Overlay element:', overlay);

  const jayjsElements = document.querySelectorAll('[data-jayjs-component]');
  console.log('📋 JayJS elements found:', jayjsElements.length);
  jayjsElements.forEach((el, i) => {
    console.log(\\\`  \\\${i+1}. \\\${el.dataset.jayjsComponent} (\\\${el.dataset.jayjsFile}:\\\${el.dataset.jayjsLine})\\\`, el);
  });
}

console.log('⌨️ Inspector Controls:');
console.log('Press: Shift + Alt + J to toggle inspector mode');
console.log('Then: Shift + Click on components to open in editor');

console.groupEnd();
      \`);
    }
  };

  // Initialize inspector when DOM is ready
  function initializeInspector() {
    try {
      new JayJsInspectorRuntime(window.__JAYJS_INSPECTOR_CONFIG__);

      // Report successful initialization
      if (window.__JAYJS_DEBUG_REPORTER__) {
        window.__JAYJS_DEBUG_REPORTER__.setRuntimeInitialized();
        window.__JAYJS_DEBUG_REPORTER__.setInspectorAvailable(!!window.__JAYJS_INSPECTOR__);
        window.__JAYJS_DEBUG_REPORTER__.setDebugFunctionAvailable(!!window.__jayjs_debug__);
        window.__JAYJS_DEBUG_REPORTER__.setOverlayCreated(!!document.getElementById('jayjs-inspector-overlay'));
      }
    } catch (error) {
      // Initialization failed - silent fail
      if (window.__JAYJS_DEBUG_REPORTER__) {
        window.__JAYJS_DEBUG_REPORTER__.addRuntimeError('Initialization', error.message || String(error));
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeInspector);
  } else {
    initializeInspector();
  }
})();
  `;
}
