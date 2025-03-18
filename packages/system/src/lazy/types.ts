/**
 * Representa um módulo importado e seu estado
 */
export interface IImportedModule {
  /** O módulo carregado */
  module: any;
  /** Timestamp da última utilização */
  lastUsed: number;
  /** Se o módulo deve ser coletado pelo garbage collector */
  collect: boolean;
}

/**
 * Configuração para carregamento preguiçoso de um módulo
 */
export interface ILazyModule {
  /** Caminho ou identificador do módulo */
  module: string;
  /** Função que importa o módulo */
  import: () => Promise<any>;
  /** Estilos associados ao módulo (opcional) */
  style?: string | (() => Promise<any>);
  /** Propriedades a serem passadas para o módulo */
  props?: Record<string, any>;
  /** Se o módulo deve ser coletado pelo garbage collector */
  collect?: boolean;
  /** Componente de loading customizado */
  loader?: HTMLElement | DocumentFragment;
}

/**
 * Estado de carregamento de um módulo
 */
export interface IModuleLoadingState {
  /** Se o módulo está carregando */
  loading: boolean;
  /** Erro durante o carregamento, se houver */
  error?: Error;
  /** O módulo carregado */
  module?: any;
}

/**
 * Opções de configuração do sistema lazy
 */
export interface ILazyOptions {
  /** Tempo em ms após o qual um módulo pode ser coletado */
  gcThreshold?: number;
  /** Intervalo em ms para executar o garbage collector */
  gcInterval?: number;
  /** Loader padrão para todos os módulos */
  defaultLoader?: HTMLElement | DocumentFragment;
  /** Se deve usar prefetch para módulos */
  enablePrefetch?: boolean;
}