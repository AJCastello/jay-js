import { IThemeProvider } from "../types";
import { initTheme } from "./initTheme";
import { themeDefineOptions } from "./themeDefineOptions";

export function themeProvider({ options }: IThemeProvider = {}) {
  if (options) {
    themeDefineOptions(options);
  };
  initTheme();
}
