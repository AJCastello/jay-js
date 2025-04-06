import { Section } from "@jay-js/ui";
import {
	Hero,
	FeaturesSection,
	WhyJayJS,
	GettingStarted,
	Packages,
	CodeExamples,
	Community,
	CallToAction
} from "../components/home";

export function Home() {
	return Section({
		tag: "main",
		children: [
			Hero(),
			FeaturesSection(),
			WhyJayJS(),
			Packages(),
			CodeExamples(),
			GettingStarted(),
			Community(),
			CallToAction()
		]
	});
}
