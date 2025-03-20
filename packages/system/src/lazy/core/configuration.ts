import { ConfigChangeCallback, IImportedModule, ILazyOptions } from "../types.js";

export const lazyOptions: ILazyOptions = {
  gcThreshold: 300000,       // 5 minutes in milliseconds
  gcInterval: 60000,         // 1 minute in milliseconds
};

export const moduleCache = new Map<string, IImportedModule>();

const configChangeListeners: Set<ConfigChangeCallback> = new Set();

export function addConfigChangeListener(callback: ConfigChangeCallback): void {
  configChangeListeners.add(callback);
}

export function removeConfigChangeListener(callback: ConfigChangeCallback): void {
  configChangeListeners.delete(callback);
}

export function setLazyOptions(options: Partial<ILazyOptions>): void {
  Object.keys(options).forEach((key) => {
    const typedKey = key as keyof ILazyOptions;
    if (options[typedKey] === undefined) {
      delete options[typedKey];
    }
  });
  Object.assign(lazyOptions, options);
  configChangeListeners.forEach(listener => listener(lazyOptions));
}
