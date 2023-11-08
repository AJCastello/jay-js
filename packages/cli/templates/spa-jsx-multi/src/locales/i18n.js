import { useI18n } from "@jay-js/system";

export const i18nConfig = {
  defaultLocale: "en-US",
  languages: [
    {
      code: "en-US",
      import: async () => (await import("./en-us")).default,
    }
  ]
};

export const i18n = useI18n();