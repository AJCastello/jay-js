import { themeConfig } from "./themeDefineConfig";

export function setTheme(theme: string) {
  if (themeConfig.useAsDataset) {
    themeConfig.target.dataset.theme = theme;
  }

  if (themeConfig.useAsClass) {
    themeConfig.target.classList.remove(...themeConfig.themeList || [themeConfig.defaultTheme, themeConfig.defaultDarkTheme]);
    themeConfig.target.classList.add(theme);
  }

  if (themeConfig.saveToLocalStorage) {
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      console.warn("Failed to save theme to localStorage:", e);
    }
  }

  const themeChangedEvent = new CustomEvent("themeChanged", { detail: { theme } });
  document.dispatchEvent(themeChangedEvent);
}