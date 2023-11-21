import { IThemeOptions } from "../types/index.js";
import { initTheme } from "./initTheme.js";
import { themeDefineOptions } from "./themeDefineOptions.js";

export function themeProvider(options: Partial<IThemeOptions> = {}) {
  if (options) {
    themeDefineOptions(options);
  };
  initTheme();
}
