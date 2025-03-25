import { Box, Section } from "@jay-js/ui";
import { Logo } from "./Logo";
import { SearchForm } from "./SearchForm";
import { SelectLocation } from "./SelectLocation";

export function DocsNavBar() {
  return Section({
    tag: "header",
    className: "bg-base-300/40 fixed w-full z-50 backdrop-blur-md",
    children: Box({
      className: "p-4 flex justify-between items-center max-w-screen-xl mx-auto",
      children: [
        Logo(),
        SearchForm(),
        SelectLocation()
      ]
    })
  });
}