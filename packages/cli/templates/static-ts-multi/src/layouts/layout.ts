import { Section, Outlet, Typography, Divider } from "@jay-js/ui";

// components
import { NavBar } from "../components/Common/NavBar";

// i18n
import { i18n } from "../locales/i18n";

export function Layout() {
  return Section({
    variant: "section",
    className: "max-w-lg mx-auto h-screen w-screen flex flex-col justify-center items-center",
    children: [
      Typography({
        variant: "h1",
        className: "text-4xl mb-4 font-bold",
        children: i18n("welcomeMessage")
      }),
      NavBar(),
      Divider(),
      Outlet()
    ]
  })
}