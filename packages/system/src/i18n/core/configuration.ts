import { State } from "../../state/index.js";
import { Ii18nLanguages, Ii18nOptions, Ii18nState } from "../types.js";

export const i18nOptions: Ii18nOptions = {
  languages: [],
  defaultLocale: "en",
  saveToLocalStorage: true,
  localStorageKey: "jayjs-i18n-default-locale",
  nestedKeys: true
};

export const i18nState = State<Ii18nState>({
  currentLocale: i18nOptions.defaultLocale,
  language: {} as Ii18nLanguages
});


export function i18nDefineOptions(options: Partial<Ii18nOptions>): void {
  Object.assign(i18nOptions, options);
}
