type Join<K, P> = K extends string | number
  ? P extends string | number
  ? `${K}${"" extends P ? "" : "."}${P}`
  : never
  : never;

export type AllPaths<T> = T extends object
  ? {
    [K in keyof T]: K extends string
    ? `${K}` | Join<K, AllPaths<T[K]>>
    : never;
  }[keyof T]
  : "";

export type GetTypeAtPath<T, Path extends string> =
  Path extends `${infer Start}.${infer Rest}`
  ? Start extends keyof T
  ? GetTypeAtPath<T[Start], Rest>
  : never
  : Path extends keyof T
  ? T[Path]
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
}