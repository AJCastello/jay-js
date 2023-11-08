import { Section } from "@jay-js/ui";
import { i18n } from "../locales/i18n";

export function About() {
  return Section({
    variant: "section",
    children: i18n("about.content"),
  })
}