import { i18nState } from "../core/configuration.js";

/**
 * Formata um número de acordo com o locale atual
 */
export function formatNumber(
  value: number,
  options?: Intl.NumberFormatOptions
): string {
  const locale = i18nState.get().currentLocale;
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Formata uma data de acordo com o locale atual
 */
export function formatDate(
  value: Date | number | string,
  options?: Intl.DateTimeFormatOptions
): string {
  const locale = i18nState.get().currentLocale;
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat(locale, options).format(date);
}

/**
 * Formata uma quantidade com plural adequado
 */
export function formatPlural(
  value: number,
  translations: { one: string; other: string; zero?: string }
): string {
  if (value === 0 && translations.zero) {
    return translations.zero.replace("{n}", String(value));
  }
  
  const form = value === 1 ? translations.one : translations.other;
  return form.replace("{n}", String(value));
}

/**
 * Verifica se um idioma está carregado
 */
export function isLanguageLoaded(code: string): boolean {
  return i18nState.get().currentLocale === code;
}

/**
 * Cria uma função de tradução pré-configurada para um namespace específico
 */
export function createNamespacedTranslation(namespace: string) {
  return (key: string, params?: Record<string, any>) => {
    const fullKey = `${namespace}.${key}`;
    const { t } = useI18n();
    return t(fullKey, params);
  };
}