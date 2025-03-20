export type ConfigChangeCallback = (options: ILazyOptions) => void;

export interface IImportedModule {
  module: any;
  lastUsed: number;
  collect: boolean;
}

export interface ILazyModule {
  module?: string;  // Agora é opcional para permitir export default
  import: () => Promise<any>;
  props?: Record<string, any>;
  collect?: boolean;
  loader?: HTMLElement | DocumentFragment;
}

export interface ILazyOptions {
  gcThreshold?: number;
  gcInterval?: number;
  defaultLoader?: HTMLElement | DocumentFragment;
}