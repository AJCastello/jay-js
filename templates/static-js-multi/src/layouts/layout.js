import { Section, Outlet, Typography, Img } from "@jay-js/elements";

// image
import jayjs from "/jayjs.svg";
import { NavBar } from "../components/navbar";

// i18n
import { i18n } from "../locales/i18n";

export function Layout() {
  return Section({
    tag: "section",
    className: "max-w-lg mx-auto h-screen w-screen flex flex-col justify-center items-center",
    children: [
      Img({
        src: jayjs,
        alt: "Jay JS Logo",
        className: "w-32 h-32 mb-4"
      }),
      Typography({
        tag: "h1",
        className: "text-4xl mb-4 font-bold",
        children: i18n("Welcome do Jay JS!")
      }),
      NavBar(),
      Outlet()
    ]
  })
}