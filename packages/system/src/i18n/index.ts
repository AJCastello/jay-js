// Exporta API principal
export { useI18n } from "./hooks/use-i18n.js";
export { i18nDefineOptions } from "./core/configuration.js";
export { setLanguage, initLanguage } from "./core/language-manager.js";

// Exporta utilitários
export {
  formatDate,
  formatNumber,
  formatPlural,
  isLanguageLoaded,
  createNamespacedTranslation
} from "./utils/helpers.js";

// Exporta tipos
export * from "./types.js";

