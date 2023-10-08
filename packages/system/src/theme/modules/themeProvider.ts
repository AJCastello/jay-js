import { IThemeProvider } from "../types";
import { initTheme } from "./initTheme";
import { themeDefineConfig } from "./themeDefineConfig";

export function themeProvider({ config }: IThemeProvider = {}) {
  if (config) {
    themeDefineConfig(config);
  };
  initTheme();
}
