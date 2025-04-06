import { useI18n } from "@jay-js/system";
import defaultLanguage from "./languages/en-us";

export type Ti18n = Record<keyof typeof defaultLanguage, string>;
export const intl = useI18n<Ti18n>();
