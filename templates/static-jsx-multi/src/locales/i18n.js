import { useI18n } from "@jay-js/system";

// locales
import i18nEnUs from "./en-us";

export const i18nConfig = {
  defaultLocale: "en-US",
  nestedKeys: false,
  saveToLocalStorage: true,
  languages: [
    {
      code: "en-US",
      // import: async () => (await import("./lang/en-us")).default,
      data: i18nEnUs
    }
  ]
};

export const i18n = useI18n();