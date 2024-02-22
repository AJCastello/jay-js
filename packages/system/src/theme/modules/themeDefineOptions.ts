import { IThemeOptions } from "../types/index.js";

export let themeOptions: IThemeOptions = {
  target: document.documentElement,
  saveToLocalStorage: true,
  defaultTheme: "light",
  defaultDarkTheme: "dark",
  useAsDataset: true,
  useAsClass: false
};

export function themeDefineOptions(options: Partial<IThemeOptions>) {
  themeOptions = { ...themeOptions, ...options };
}