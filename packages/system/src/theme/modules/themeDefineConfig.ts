import { IThemeConfig } from "../types";

export let themeConfig: IThemeConfig = {
  target: document.documentElement,
  saveToLocalStorage: true,
  defaultTheme: "light",
  defaultDarkTheme: "dark",
  useAsDataset: true,
  useAsClass: false
}

export function themeDefineConfig(config: Partial<IThemeConfig>) {
  themeConfig = { ...themeConfig, ...config };
}