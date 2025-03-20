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
  /** The actual module function/class */
  module: any;
  /** Counter for tracking how long the module has been unused */
  lastUsed: number;
  /** Whether the module can be garbage collected */
  collect: boolean;
}

/**
 * Configuration for a lazy loadable module.
 * @interface ILazyModule
 */
export interface ILazyModule {
  /** Name of the exported module. Optional for default exports */
  module?: string;
  /** Function that returns a promise resolving to the module */
  import: () => Promise<any>;
  /** Props to pass to the module when instantiated */
  props?: Record<string, any>;
  /** Whether the module can be garbage collected */
  collect?: boolean;
  /** Custom loader element to show while loading */
  loader?: HTMLElement | DocumentFragment;
}

/**
 * Global configuration options for the lazy loading system.
 * @interface ILazyOptions
 */
export interface ILazyOptions {
  /** Time threshold in milliseconds for marking a module as unused */
  gcThreshold?: number;
  /** Time interval in milliseconds between garbage collection cycles */
  gcInterval?: number;
  /** Default loader element to use when not specified in module config */
  defaultLoader?: HTMLElement | DocumentFragment;
}