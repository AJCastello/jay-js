export interface IImportedModule {
  module: any;
  lastUsed: number;
  collect: boolean;
}

export interface ILazyModule {
  module: string;
  import: () => Promise<any>;
  style?: any;
  props?: any;
  collect?: boolean;
  loader?: any;
}