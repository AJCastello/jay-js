export interface IThemeOptions {
  target: HTMLElement;
  saveToLocalStorage: boolean;
  defaultTheme: string;
  defaultDarkTheme: string;
  useAsDataset?: boolean;
  useAsClass?: boolean;
  themeList?: Array<string>;
}
