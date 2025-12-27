import type { TLazyModule } from "../types.js";

import { moduleCache } from "./configuration.js";
import { loadFromCache, loadModule } from "./module-loader.js";

/**
 * Creates a lazily loaded module that will be dynamically imported when needed.
 *
 * @param {TLazyModule} lazy - Configuration object for the lazy module
 * @param {string} [lazy.module] - Name of the module to import. If not provided, a unique default name will be generated
 * @param {() => Promise<any>} lazy.import - Function that returns a promise resolving to the module
 * @param {Record<string, any>} [lazy.params] - Props to pass to the module when instantiated
 * @param {boolean} [lazy.collect] - Whether the module can be garbage collected
 * @param {HTMLElement|DocumentFragment} [lazy.loader] - Custom loader element to show while loading
 * @param {HTMLElement} [loader] - Optional loader element to show while module is loading
 * @returns {HTMLElement} Element that will be replaced with the loaded module
 * @throws {Error} When module configuration is undefined
 */
export function Lazy(lazy: TLazyModule, loader?: HTMLElement) {
	if (!lazy) {
		throw new Error("Module is undefined");
	}

	if (!lazy.module) {
		const randomUUID = crypto.randomUUID();
		const moduleId = `default_${randomUUID}`;
		lazy = { ...lazy, module: moduleId };
	}

	if (lazy.module && moduleCache.has(lazy.module)) {
		return loadFromCache(lazy);
	}

	const moduleSection = loader || document.createElement("jayjs-lazy-slot");
	loadModule(lazy, moduleSection);
	return moduleSection;
}
