import { i18nOptions } from "./i18nDefineOptions";
import { i18nContext } from "./i18nContext";

export function setLanguage(code: string) {
  const language = i18nOptions.languages.find((lang) => lang.code === code);
  if (!language) {
    throw new Error(`@jay-js/system: Language ${code} not found`);
  }
  if (i18nOptions.saveToLocalStorage) {
    try {
      localStorage.setItem("default-locale", code);
    } catch (e) {
      console.warn("Failed to save theme to localStorage:", e);
    }
  }
  i18nContext.set(language);
}