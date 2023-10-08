import { themeOptions } from "./themeDefineOptions";

export function setTheme(theme: string) {
  if (themeOptions.useAsDataset) {
    themeOptions.target.dataset.theme = theme;
  }

  if (themeOptions.useAsClass) {
    themeOptions.target.classList.remove(...themeOptions.themeList || [themeOptions.defaultTheme, themeOptions.defaultDarkTheme]);
    themeOptions.target.classList.add(theme);
  }

  if (themeOptions.saveToLocalStorage) {
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      console.warn("Failed to save theme to localStorage:", e);
    }
  }

  const themeChangedEvent = new CustomEvent("themeChanged", { detail: { theme } });
  document.dispatchEvent(themeChangedEvent);
}