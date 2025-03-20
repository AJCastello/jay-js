export interface IImportedModule {
  module: any;
  lastUsed: number;
  collect: boolean;
}

export interface ILazyModule {
  module: string;
  import: () => Promise<any>;
  props?: Record<string, any>;
  collect?: boolean;
  loader?: HTMLElement | DocumentFragment;
}

export interface ILazyOptions {
  gcThreshold?: number;
  gcInterval?: number;
  defaultLoader?: HTMLElement | DocumentFragment;
  enablePrefetch?: boolean;
}