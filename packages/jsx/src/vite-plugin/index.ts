/**
 * @file Vite plugin for Jay JS JSX
 * @description Configures Vite to use Jay JS JSX runtime
 */

/**
 * Vite Plugin interface type
 */
interface Plugin {
	name: string;
	config?: (config: any) => any;
	[key: string]: any;
}

/**
 * Creates a Vite plugin that automatically injects Jay JS JSX runtime imports
 * This allows JSX to work with Jay JS without additional configuration in each file
 *
 * @returns Vite plugin configuration object
 *
 * @example
 * // vite.config.ts
 * import { defineConfig } from 'vite';
 * import { jayJsxPlugin } from '@jay-js/jsx';
 *
 * export default defineConfig({
 *   plugins: [jayJsxPlugin()]
 * });
 */
function jayJsxPlugin(): Plugin {
	return {
		name: "vite-plugin-jay-jsx",
		config(_config: any) {
			return {
				esbuild: {
					jsxInject: 'import { jayJSX, Fragment } from "@jay-js/jsx/runtime/jsx-runtime.js";',
				},
			};
		},
	};
}

export default jayJsxPlugin;
