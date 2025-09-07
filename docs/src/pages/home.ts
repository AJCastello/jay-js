import { Section } from "../../../packages/elements/src";
import {
	CallToAction,
	CodeExamples,
	Community,
	FeaturesSection,
	GettingStarted,
	Hero,
	Packages,
	WhyJayJS,
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
			CallToAction(),
		],
	});
}
