type Join<K, P> = K extends string | number
  ? P extends string | number
    ? `${K}${"" extends P ? "" : "."}${P}`
    : never
  : never;

export type AllPaths<T, Prefix extends string = ""> = T extends object
  ? {
      [K in keyof T]-?: Join<Prefix, K> | AllPaths<T[K], Join<Prefix, K>>;
    }[keyof T]
  : "";

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
  import?: () => Promise<any>
}

export interface Ii18nOptions {
  languages: Array<Ii18nLanguages>;
  defaultLocale: string;
  saveToLocalStorage: boolean;
  nestedKeys: boolean;
}