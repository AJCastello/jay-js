import { i18nConfig } from "./i18nDefineConfig";
import { i18nContext } from "./i18nContext";

export function setLanguage(code: string) {
  const language = i18nConfig.languages.find((lang) => lang.code === code);
  if (!language) {
    throw new Error(`@jay-js/system: Language ${code} not found`);
  }
  if (i18nConfig.saveToLocalStorage) {
    try {
      localStorage.setItem("default-locale", code);
    } catch (e) {
      console.warn("Failed to save theme to localStorage:", e);
    }
  }
  i18nContext.set(language);
}