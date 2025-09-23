/**
 * Debug Reporter for JayJS Inspector
 * Collects comprehensive diagnostic information for troubleshooting
 */

interface DebugReport {
	timestamp: string;
	environment: {
		nodeEnv: string;
		userAgent?: string;
		viteVersion?: string;
		inspectorVersion: string;
	};
	configuration: {
		enabled: boolean;
		editor: string;
		activationKey: string;
		include: string[];
		exclude: string[];
	};
	transformation: {
		totalFiles: number;
		transformedFiles: number;
		skippedFiles: number;
		errors: Array<{
			file: string;
			error: string;
			line?: number;
		}>;
		detectedComponents: Array<{
			component: string;
			file: string;
			line: number;
			column: number;
		}>;
	};
	runtime: {
		initialized: boolean;
		inspectorAvailable: boolean;
		debugFunctionAvailable: boolean;
		overlayCreated: boolean;
		registeredElements: number;
		errors: Array<{
			timestamp: string;
			error: string;
			context: string;
		}>;
	};
	network: {
		healthCheck: boolean;
		editorRequests: Array<{
			timestamp: string;
			success: boolean;
			file: string;
			error?: string;
		}>;
	};
}

class DebugReporter {
	private static instance: DebugReporter;
	private report: DebugReport;

	private constructor() {
		this.report = this.initializeReport();
		this.setupGlobalErrorHandling();
	}

	static getInstance(): DebugReporter {
		if (!DebugReporter.instance) {
			DebugReporter.instance = new DebugReporter();
		}
		return DebugReporter.instance;
	}

	private initializeReport(): DebugReport {
		return {
			timestamp: new Date().toISOString(),
			environment: {
				nodeEnv: process.env.NODE_ENV || 'unknown',
				userAgent: typeof window !== 'undefined' ? window.navigator?.userAgent : undefined,
				inspectorVersion: '1.0.0',
			},
			configuration: {
				enabled: false,
				editor: 'unknown',
				activationKey: 'unknown',
				include: [],
				exclude: [],
			},
			transformation: {
				totalFiles: 0,
				transformedFiles: 0,
				skippedFiles: 0,
				errors: [],
				detectedComponents: [],
			},
			runtime: {
				initialized: false,
				inspectorAvailable: false,
				debugFunctionAvailable: false,
				overlayCreated: false,
				registeredElements: 0,
				errors: [],
			},
			network: {
				healthCheck: false,
				editorRequests: [],
			},
		};
	}

	private setupGlobalErrorHandling() {
		if (typeof window !== 'undefined') {
			// Capture unhandled errors related to inspector
			window.addEventListener('error', (event) => {
				if (event.error?.message?.includes('jayjs') || event.error?.stack?.includes('inspector')) {
					this.addRuntimeError('Unhandled Error', event.error.message);
				}
			});

			// Capture unhandled promise rejections
			window.addEventListener('unhandledrejection', (event) => {
				if (event.reason?.message?.includes('jayjs') || event.reason?.stack?.includes('inspector')) {
					this.addRuntimeError('Unhandled Promise Rejection', event.reason.message);
				}
			});
		}
	}

	// Configuration methods
	setConfiguration(config: any) {
		this.report.configuration = {
			enabled: config.enabled ?? false,
			editor: config.editor ?? 'unknown',
			activationKey: config.activationKey ?? 'unknown',
			include: config.include ?? [],
			exclude: config.exclude ?? [],
		};
		this.log('Configuration set', config);
	}

	// Transformation methods
	addFileProcessed(filePath: string, transformed: boolean) {
		this.report.transformation.totalFiles++;
		if (transformed) {
			this.report.transformation.transformedFiles++;
		} else {
			this.report.transformation.skippedFiles++;
		}
		this.log(`File processed: ${filePath} (transformed: ${transformed})`);
	}

	addTransformationError(filePath: string, error: string, line?: number) {
		this.report.transformation.errors.push({
			file: filePath,
			error,
			line,
		});
		this.log(`Transformation error in ${filePath}: ${error}`, { line });
	}

	addDetectedComponent(component: string, file: string, line: number, column: number) {
		this.report.transformation.detectedComponents.push({
			component,
			file,
			line,
			column,
		});
		this.log(`Component detected: ${component} in ${file}:${line}:${column}`);
	}

	// Runtime methods
	setRuntimeInitialized() {
		this.report.runtime.initialized = true;
		this.log('Runtime initialized');
	}

	setInspectorAvailable(available: boolean) {
		this.report.runtime.inspectorAvailable = available;
		this.log(`Inspector available: ${available}`);
	}

	setDebugFunctionAvailable(available: boolean) {
		this.report.runtime.debugFunctionAvailable = available;
		this.log(`Debug function available: ${available}`);
	}

	setOverlayCreated(created: boolean) {
		this.report.runtime.overlayCreated = created;
		this.log(`Overlay created: ${created}`);
	}

	addElementRegistration() {
		this.report.runtime.registeredElements++;
		this.log(`Element registered (total: ${this.report.runtime.registeredElements})`);
	}

	addRuntimeError(context: string, error: string) {
		this.report.runtime.errors.push({
			timestamp: new Date().toISOString(),
			error,
			context,
		});
		this.log(`Runtime error in ${context}: ${error}`);
	}

	// Network methods
	setHealthCheck(success: boolean) {
		this.report.network.healthCheck = success;
		this.log(`Health check: ${success ? 'passed' : 'failed'}`);
	}

	addEditorRequest(file: string, success: boolean, error?: string) {
		this.report.network.editorRequests.push({
			timestamp: new Date().toISOString(),
			success,
			file,
			error,
		});
		this.log(`Editor request for ${file}: ${success ? 'success' : 'failed'}`, { error });
	}

	// Report generation
	generateReport(): string {
		const report = {
			...this.report,
			timestamp: new Date().toISOString(),
		};

		return `
=== JAYJS INSPECTOR DEBUG REPORT ===
Generated: ${report.timestamp}

ENVIRONMENT:
- Node ENV: ${report.environment.nodeEnv}
- User Agent: ${report.environment.userAgent || 'N/A'}
- Inspector Version: ${report.environment.inspectorVersion}

CONFIGURATION:
- Enabled: ${report.configuration.enabled}
- Editor: ${report.configuration.editor}
- Activation Key: ${report.configuration.activationKey}
- Include Patterns: ${JSON.stringify(report.configuration.include)}
- Exclude Patterns: ${JSON.stringify(report.configuration.exclude)}

TRANSFORMATION STATS:
- Total Files: ${report.transformation.totalFiles}
- Transformed: ${report.transformation.transformedFiles}
- Skipped: ${report.transformation.skippedFiles}
- Errors: ${report.transformation.errors.length}

DETECTED COMPONENTS:
${report.transformation.detectedComponents.map(c =>
	`  - ${c.component} (${c.file}:${c.line}:${c.column})`
).join('\n') || '  (none detected)'}

TRANSFORMATION ERRORS:
${report.transformation.errors.map(e =>
	`  - ${e.file}${e.line ? `:${e.line}` : ''}: ${e.error}`
).join('\n') || '  (none)'}

RUNTIME STATUS:
- Initialized: ${report.runtime.initialized}
- Inspector Available: ${report.runtime.inspectorAvailable}
- Debug Function Available: ${report.runtime.debugFunctionAvailable}
- Overlay Created: ${report.runtime.overlayCreated}
- Registered Elements: ${report.runtime.registeredElements}

RUNTIME ERRORS:
${report.runtime.errors.map(e =>
	`  - [${e.timestamp}] ${e.context}: ${e.error}`
).join('\n') || '  (none)'}

NETWORK STATUS:
- Health Check: ${report.network.healthCheck ? 'PASS' : 'FAIL'}
- Editor Requests: ${report.network.editorRequests.length}

RECENT EDITOR REQUESTS:
${report.network.editorRequests.slice(-5).map(r =>
	`  - [${r.timestamp}] ${r.file}: ${r.success ? 'SUCCESS' : 'FAILED'}${r.error ? ` (${r.error})` : ''}`
).join('\n') || '  (none)'}

=== END REPORT ===
		`.trim();
	}

	// Console methods
	generateConsoleReport(): string {
		return `
// COPY THIS ENTIRE BLOCK AND PASTE IT
console.group('🔍 JayJS Inspector Debug Report');
console.log('Report generated at:', new Date().toISOString());
console.log('Configuration:', ${JSON.stringify(this.report.configuration, null, 2)});
console.log('Transformation Stats:', ${JSON.stringify(this.report.transformation, null, 2)});
console.log('Runtime Status:', ${JSON.stringify(this.report.runtime, null, 2)});
console.log('Network Status:', ${JSON.stringify(this.report.network, null, 2)});
console.groupEnd();

// Test inspector availability
console.log('🧪 Testing Inspector Components:');
console.log('window.__JAYJS_INSPECTOR__:', typeof window.__JAYJS_INSPECTOR__);
console.log('window.__jayjs_debug__:', typeof window.__jayjs_debug__);
console.log('window.__JAYJS_INSPECTOR_CONFIG__:', typeof window.__JAYJS_INSPECTOR_CONFIG__);

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
    console.log(\`  \${i+1}. \${el.dataset.jayjsComponent} (\${el.dataset.jayjsFile}:\${el.dataset.jayjsLine})\`, el);
  });
}
		`.trim();
	}

	private log(message: string, data?: any) {
		if (process.env.NODE_ENV === 'development') {
			// console.debug(`[JayJS Inspector Debug] ${message}`, data || '');
		}
	}

	// Global access methods
	static logReport() {
		const reporter = DebugReporter.getInstance();
		console.log(reporter.generateReport());
	}

	static getConsoleCommands() {
		const reporter = DebugReporter.getInstance();
		console.log(reporter.generateConsoleReport());
	}
}

// Global access
if (typeof window !== 'undefined') {
	(window as any).__JAYJS_DEBUG_REPORTER__ = DebugReporter.getInstance();
	(window as any).jayjsDebugReport = () => DebugReporter.logReport();
	(window as any).jayjsDebugCommands = () => DebugReporter.getConsoleCommands();
}

export { DebugReporter };