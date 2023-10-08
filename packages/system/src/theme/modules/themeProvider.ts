import { IThemeOptions } from "../types";
import { initTheme } from "./initTheme";
import { themeDefineOptions } from "./themeDefineOptions";

export function themeProvider(options: Partial<IThemeOptions> = {}) {
  if (options) {
    themeDefineOptions(options);
  };
  initTheme();
}
