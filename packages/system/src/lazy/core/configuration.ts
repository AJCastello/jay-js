import { IImportedModule, ILazyOptions } from "../types.js";

export const lazyOptions: ILazyOptions = {
  gcThreshold: 5 * 60 * 1000, // 5 min
  gcInterval: 60 * 1000,      // 1 min
  enablePrefetch: false
};

export const moduleCache = new Map<string, IImportedModule>();

type ConfigChangeCallback = (options: ILazyOptions) => void;
const configChangeListeners: Set<ConfigChangeCallback> = new Set();

export function addConfigChangeListener(callback: ConfigChangeCallback): void {
  configChangeListeners.add(callback);
}

export function removeConfigChangeListener(callback: ConfigChangeCallback): void {
  configChangeListeners.delete(callback);
}

export function setLazyOptions(options: Partial<ILazyOptions>): void {
  Object.assign(lazyOptions, options);
  // Notify all listeners of the configuration change
  configChangeListeners.forEach(listener => listener(lazyOptions));
}
