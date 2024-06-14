export type TArgument = "create" | "c" | "add";

export type TOptions = {
  translate: boolean;
};

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
