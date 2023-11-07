import { Outlet, Typography } from "@jay-js/ui";

// components
import { NavBar } from "../components/Common/NavBar";

// i18n
import { i18n } from "../locales/i18n";

export function Layout() {
  return (
    <section className="max-w-lg mx-auto h-screen w-screen flex flex-col justify-center items-center">
      <Typography variant="h1" className="text-4xl mb-4 font-bold">
        {i18n("welcomeMessage")}
      </Typography>
      <NavBar />
      <Divider />
      <Outlet />
    </section>
  )
}
