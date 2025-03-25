import { Box, Section } from "@jay-js/ui";
import { WhyChoose } from "../../components/docs/WhyChoose";
import { DocsFooter } from "../../components/footer/DocsFooter";
import { DocsNavBar } from "../../components/navbar/DocsNavBar";
import { Introduction } from "../../components/docs/Introduction";
import { ExplorePackages } from "../../components/docs/ExplorePackages";
import { UnleashPotential } from "../../components/docs/UnleashPotential";

export function DocsIntro() {
  return Section({
    className: "min-h-screen flex flex-col",
    children: [
      DocsNavBar(),
      Box({
        className: "max-w-screen-xl w-full mx-auto pb-8 pt-20  grow",
        children: Section({
          children: [
            Introduction(),
            WhyChoose(),
            ExplorePackages(),
            UnleashPotential()
          ]
        })
      }),
      DocsFooter()
    ]
  });
}
