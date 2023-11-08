import { Section, Outlet, Typography, Divider, Img } from "@jay-js/ui";

// image
import jayjs from "/jayjs.svg";

// components
import { NavBar } from "../components/common/NavBar";

export function Layout() {
  return Section({
    variant: "section",
    className: "max-w-lg mx-auto h-screen w-screen flex flex-col justify-center items-center",
    children: [
      Img({
        src: jayjs,
        alt: "Jay JS Logo",
        className: "w-32 h-32 mb-4"
      }),
      Typography({
        variant: "h1",
        className: "text-4xl mb-4 font-bold",
        children: "Welcome to Jay JS!"
      }),
      NavBar(),
      Divider(),
      Outlet()
    ]
  })
}