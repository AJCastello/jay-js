import { Section } from "../../../packages/elements/src";
import { intl } from "../locales";

export function About() {
	return Section({
		tag: "section",
		children: intl("This is your lazy loaded About page."),
	});
}
