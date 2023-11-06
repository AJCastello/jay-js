import { useI18n } from "@jay-js/system";

// types
import { Ii18nBase } from "./i18n.types";

// locales
import i18nEnUs from "./en-us";

export const i18nConfig = {
  defaultLocale: "en-US",
  languages: [
    {
      code: "en-US",
      // import: async () => (await import("./lang/en-us")).default,
      data: i18nEnUs
    }
  ]
};

export const i18n = useI18n<Ii18nBase>();