import type { ConfigChangeCallback, TImportedModule, TLazyOptions } from "../types.js";

/**
 * Global configuration options for the lazy loading system.
 * Default values:
 * - gcThreshold: 300000 (5 minutes)
 * - gcInterval: 60000 (1 minute)
 */
export const lazyOptions: TLazyOptions = {
	gcThreshold: 300000, // 5 minutes in milliseconds
	gcInterval: 60000, // 1 minute in milliseconds
};

/**
 * Global cache for storing imported modules and their metadata.
 * The key is the module name and the value contains:
 * - module: The actual module function/class
 * - lastUsed: Counter for tracking module usage
 * - collect: Whether the module can be garbage collected
 */
export const moduleCache = new Map<string, TImportedModule>();

/**
 * Set of callbacks to be called when configuration changes.
 * @private
 */
const configChangeListeners: Set<ConfigChangeCallback> = new Set();

/**
 * Registers a callback to be called when lazy loading configuration changes.
 *
 * @param {ConfigChangeCallback} callback - Function to be called with new options
 */
export function addConfigChangeListener(callback: ConfigChangeCallback): void {
	configChangeListeners.add(callback);
}

/**
 * Removes a previously registered configuration change callback.
 *
 * @param {ConfigChangeCallback} callback - The callback to remove
 */
export function removeConfigChangeListener(callback: ConfigChangeCallback): void {
	configChangeListeners.delete(callback);
}

/**
 * Updates the lazy loading configuration options.
 * Undefined values are removed from the update to preserve existing values.
 * Triggers all registered configuration change listeners.
 *
 * @param {Partial<TLazyOptions>} options - Partial configuration object
 */
export function setLazyOptions(options: Partial<TLazyOptions>): void {
	Object.keys(options).forEach((key) => {
		const typedKey = key as keyof TLazyOptions;
		if (options[typedKey] === undefined) {
			delete options[typedKey];
		}
	});
	Object.assign(lazyOptions, options);
	configChangeListeners.forEach((listener) => listener(lazyOptions));
}
