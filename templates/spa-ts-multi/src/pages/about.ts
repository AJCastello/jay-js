import { Section } from "@jay-js/elements";
import { i18n } from "../locales/i18n";

export function About() {
  return Section({
    tag: "section",
    children: i18n("This is your lazy loaded About page."),
  })
}