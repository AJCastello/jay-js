import { IUseI18n } from "../types.js";
import { i18nOptions, i18nState, getNestedTranslation, interpolateParams } from "../core/configuration.js";
import { setLanguage } from "../core/language-manager.js";
import { Effect } from "../../state/index.js";

/**
 * Hook para usar funcionalidades de internacionalização
 */
export function useI18n(): IUseI18n {
  let state = i18nState.get();

  // Observa mudanças no estado do i18n
  Effect(() => {
    state = i18nState.value;
  });

  return {
    t: (key: string, params?: Record<string, any>): string => {
      const translations = state.translations;
      const value = i18nOptions.nestedKeys
        ? getNestedTranslation(translations, key)
        : translations[key];

      return interpolateParams(value || key, params);
    },
    locale: state.currentLocale,
    setLocale: setLanguage,
    translations: state.translations
  };
}