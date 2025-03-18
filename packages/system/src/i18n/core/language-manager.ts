import { i18nOptions, i18nState } from "./configuration.js";

/**
 * Inicializa o idioma do sistema
 */
export async function initLanguage(): Promise<void> {
  const savedLocale = i18nOptions.saveToLocalStorage
    ? localStorage.getItem("i18n_locale")
    : null;

  if (savedLocale) {
    await setLanguage(savedLocale);
  } else {
    await setLanguage(i18nOptions.defaultLocale);
  }
}

/**
 * Altera o idioma atual do sistema
 */
export async function setLanguage(code: string): Promise<void> {
  const language = i18nOptions.languages.find(lang => lang.code === code);
  
  if (!language) {
    throw new Error(`Language ${code} not found`);
  }

  try {
    // Carrega os dados do idioma se necessário
    let translationData = language.data;
    if (!translationData && language.import) {
      translationData = await language.import();
    }

    // Atualiza o estado
    i18nState.set({
      currentLocale: code,
      translations: translationData || {}
    });

    // Salva a preferência no localStorage
    if (i18nOptions.saveToLocalStorage) {
      localStorage.setItem("i18n_locale", code);
    }
  } catch (error: any) {
    throw new Error(`Failed to load language ${code}: ${error.message}`);
  }
}

/**
 * Retorna o código do idioma atual
 */
export function getCurrentLocale(): string {
  return i18nState.get().currentLocale;
}

/**
 * Retorna as traduções do idioma atual
 */
export function getCurrentTranslations(): Record<string, any> {
  return i18nState.get().translations;
}