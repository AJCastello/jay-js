import { setTheme } from "./setTheme";
import { themeConfig } from "./themeDefineConfig";

export function initTheme() {
  let themeToSet = themeConfig.defaultTheme;
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    themeToSet = storedTheme;
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    themeToSet = themeConfig.defaultDarkTheme;
  }
  setTheme(themeToSet);
}