import { Outlet } from "@jay-js/elements";
import { NavBar } from "../components/navbar";
import jayjs from "/jayjs.svg";
import { i18n } from "../locales/i18n";

export function Layout() {

  return (
    <section className="max-w-lg mx-auto h-screen w-screen flex flex-col justify-center items-center">
      <img src={jayjs} alt="Jay JS Logo" className="w-32 h-32 mb-4 shadow-2xl shadow-emerald-400/20 hover:shadow-emerald-400/70 rounded-full transition-shadow ease-in-out duration-500" />
      <h1 className="text-4xl mb-4 font-bold">
        {i18n("Welcome to Jay JS!")}
      </h1>
      <NavBar />
      <Outlet />
    </section>
  )
}
