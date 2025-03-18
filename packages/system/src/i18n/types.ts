/**
 * Utilitário para criar tipos aninhados de caminhos de tradução
 */
type Join<K, P> = K extends string | null
  ? P extends string | number
    ? `${K extends string ? `${K}.` : ""}${P}`
    : never
  : never;

/**
 * Gera todos os caminhos possíveis em um objeto de traduções
 */
export type AllPaths<T, Prefix extends string | null = null> = T extends object
  ? {
      [K in keyof T]-?: Join<Prefix, K> | AllPaths<T[K], Join<Prefix, K>>;
    }[keyof T]
  : T extends string ? "" : any;

/**
 * Obtém o tipo de um valor em um caminho específico do objeto de traduções
 */
export type GetTypeAtPath<T, Path extends string> = Path extends keyof T
  ? T[Path]
  : Path extends `${infer Key}.${infer Rest}`
    ? Key extends keyof T
      ? GetTypeAtPath<T[Key], Rest>
      : never
    : never;

/**
 * Configuração de um idioma
 */
export interface Ii18nLanguages {
  /** Código do idioma (ex: 'en', 'pt-BR') */
  code: string;
  /** Dados de tradução (opcional) */
  data?: any;
  /** Função para importar dados de tradução sob demanda */
  import?: () => Promise<any>;
}

/**
 * Opções de configuração do i18n
 */
export interface Ii18nOptions {
  /** Lista de idiomas disponíveis */
  languages: Array<Ii18nLanguages>;
  /** Código do idioma padrão */
  defaultLocale: string;
  /** Se deve salvar o idioma selecionado no localStorage */
  saveToLocalStorage: boolean;
  /** Se deve permitir chaves aninhadas nas traduções */
  nestedKeys: boolean;
}

/**
 * Estado interno do i18n
 */
export interface Ii18nState {
  /** Idioma atual */
  currentLocale: string;
  /** Dados de tradução do idioma atual */
  translations: Record<string, any>;
}

/**
 * Hook de internacionalização
 */
export interface IUseI18n {
  /** Traduz uma chave */
  t: (key: string, params?: Record<string, any>) => string;
  /** Idioma atual */
  locale: string;
  /** Muda o idioma */
  setLocale: (code: string) => Promise<void>;
  /** Dados de tradução */
  translations: Record<string, any>;
}