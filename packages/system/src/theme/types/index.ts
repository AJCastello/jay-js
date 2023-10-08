export interface IThemeConfig {
  target: HTMLElement;
  saveToLocalStorage: boolean;
  defaultTheme: string;
  defaultDarkTheme: string;
  useAsDataset?: boolean;
  useAsClass?: boolean;
  themeList?: Array<string>;
}

export interface IThemeProvider {
  config?: Partial<IThemeConfig>;
}