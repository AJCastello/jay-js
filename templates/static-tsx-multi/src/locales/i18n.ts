import { Ii18nOptions, useI18n } from "@jay-js/system";

// types
import { Ii18nBase } from "./i18n.types";

// locales
import i18nEnUs from "./en-us";

export const i18nConfig: Ii18nOptions = {
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

export const i18n = useI18n<Ii18nBase>();