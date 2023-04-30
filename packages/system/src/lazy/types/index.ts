export interface ImportedModule {
  module: any;
  lastUsed: number;
  collect: boolean;
}

export interface LazyModuleProps {
  module: string;
  import: () => Promise<any>;
  route?: string;
  style?: any;
  props?: any;
  collect?: boolean;
  loader?: any;
}