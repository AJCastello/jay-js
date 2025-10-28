import { Box, Section } from "@jay-js/elements";
import { ExplorePackages } from "../../components/docs/explore-packages";
import { Introduction } from "../../components/docs/introduction";
import { UnleashPotential } from "../../components/docs/unleash-potential";
import { WhyChoose } from "../../components/docs/why-choose";
import { DocsFooter } from "../../components/footer/docs-footer";
import { DocsNavBar } from "../../components/navbar/docs-nav-bar";

export function DocsIntro() {
	return Section({
		className: "min-h-screen flex flex-col",
		children: [
			DocsNavBar(),
			Box({
				className: "max-w-screen-xl w-full mx-auto pb-8 pt-20  grow",
				children: Section({
					children: [Introduction(), WhyChoose(), ExplorePackages(), UnleashPotential()],
				}),
			}),
			DocsFooter(),
		],
	});
}
