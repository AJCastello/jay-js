type Join<K, P> = K extends string | null
  ? P extends string | number
  ? `${K extends string ? `${K}.` : ""}${P}`
  : never
  : never;

export type AllPaths<T, Prefix extends string | null = null> = T extends object
  ? {
    [K in keyof T]-?: Join<Prefix, K> | AllPaths<T[K], Join<Prefix, K>>;
  }[keyof T]
  : T extends string ? "" : any;

export type GetTypeAtPath<T, Path extends string> = Path extends keyof T
  ? T[Path]
  : Path extends `${infer Key}.${infer Rest}`
  ? Key extends keyof T
  ? GetTypeAtPath<T[Key], Rest>
  : never
  : never;

export interface Ii18nLanguages {
  code: string;
  data?: any;
  import?: () => Promise<any>;
}

export interface Ii18nOptions {
  languages: Array<Ii18nLanguages>;
  defaultLocale: string;
  saveToLocalStorage: boolean;
  localStorageKey: string;
  nestedKeys: boolean;
}

export interface Ii18nState {
  currentLocale: string;
  language: Ii18nLanguages;
}
