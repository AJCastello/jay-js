import { IImportedModule, ILazyOptions } from "../types.js";

export const lazyOptions: ILazyOptions = {
  gcThreshold: 5 * 60 * 1000, // 5 min
  gcInterval: 60 * 1000,      // 1 min
  enablePrefetch: false
};

export const moduleCache = new Map<string, IImportedModule>();

export function setLazyOptions(options: Partial<ILazyOptions>): void {
  Object.assign(lazyOptions, options);
}
