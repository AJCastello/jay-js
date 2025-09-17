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

			// Add middleware to handle inspector requests
			server.middlewares.use("/__jayjs-inspector", (req: any, res: any, next: any) => {
				if (req.method === "POST" && req.url === "/__jayjs-inspector/open-in-editor") {
					// Handle open-in-editor requests
					handleOpenInEditor(req, res, config.editor);
				} else if (req.method === "GET" && req.url === "/__jayjs-inspector/health") {
					// Health check endpoint
					res.writeHead(200, { "Content-Type": "application/json" });
					res.end(JSON.stringify({ status: "ok" }));
				} else {
					next();
				}
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

      window.__JAYJS_INSPECTOR_CONFIG__ = ${JSON.stringify(config)};

      // Initialize inspector when DOM is ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeInspector);
      } else {
        initializeInspector();
      }

      function initializeInspector() {
        import('/@jayjs-inspector/runtime').then(({ JayJsInspectorRuntime }) => {
          new JayJsInspectorRuntime(window.__JAYJS_INSPECTOR_CONFIG__);
        });
      }
    })();
  `;
}
