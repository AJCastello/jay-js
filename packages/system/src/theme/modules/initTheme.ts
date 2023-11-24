import { setTheme } from "./setTheme.js";
import { themeOptions } from "./themeDefineOptions.js";

export function initTheme() {
  let themeToSet = themeOptions.defaultTheme;
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) {
    themeToSet = storedTheme;
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    themeToSet = themeOptions.defaultDarkTheme;
  }
  setTheme(themeToSet);
}