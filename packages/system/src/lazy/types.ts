/**
 * Callback function type for configuration change events.
 * Called when lazy loading options are updated.
 */
export type ConfigChangeCallback = (options: ILazyOptions) => void;

/**
 * Represents a module stored in the cache.
 * @interface IImportedModule
 */
export interface IImportedModule {
  module: any;
  lastUsed: number;
  collect: boolean;
}

/**
 * Configuration for a lazy loadable module.
 * @interface ILazyModule
 */
export interface ILazyModule {
  module?: string;
  import: () => Promise<any>;
  props?: Record<string, any>;
  collect?: boolean;
  loader?: HTMLElement | DocumentFragment;
}

/**
 * Global configuration options for the lazy loading system.
 * @interface ILazyOptions
 */
export interface ILazyOptions {
  gcThreshold?: number;
  gcInterval?: number;
  defaultLoader?: HTMLElement | DocumentFragment;
}