import { Ii18nConfig, Ii18nLanguages } from "../types";
import { i18nConfig, i18nDefineConfig } from "./i18nDefineConfig";
import { i18nContext } from "./i18nContext";
import { initLanguage } from "./initLanguage";

export function i18nProvider(onLoad: (i18n: Ii18nLanguages) => void, config?: Partial<Ii18nConfig>) {
  if (config) {
    i18nDefineConfig(config);
  }
  initLanguage();
  if (!i18nConfig.languages.length) {
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
