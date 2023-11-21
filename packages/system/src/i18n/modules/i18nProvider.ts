import { Ii18nOptions, Ii18nLanguages } from "../types/index.js";
import { i18nOptions, i18nDefineOptions } from "./i18nDefineOptions.js";
import { i18nContext } from "./i18nContext.js";
import { initLanguage } from "./initLanguage.js";

export function i18nProvider(onLoad: (i18n: Ii18nLanguages) => void, options?: Partial<Ii18nOptions>) {
  if (options) {
    i18nDefineOptions(options);
  }
  initLanguage();
  if (!i18nOptions.languages.length) {
    throw new Error("@jay-js/system: No languages defined");
  }
  i18nContext.sub("i18n", async (i18n) => {
    if (!i18n.data) {
      if (i18n.import) {
        const language = await i18n.import();
        i18n.data = language;
      }
    };
    onLoad(i18n);
  }, true);
}
