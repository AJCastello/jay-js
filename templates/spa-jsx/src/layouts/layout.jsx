import { Outlet } from "@jay-js/elements";
import { NavBar } from "../components/navbar";
import jayjs from "/jayjs.svg";

export function Layout() {
  return (
    <section className="max-w-lg mx-auto h-screen w-screen flex flex-col justify-center items-center">
      <img src={jayjs} alt="Jay JS Logo" className="w-32 h-32 mb-4 shadow-2xl shadow-primary/30 hover:shadow-primary/70 rounded-full transition-shadow ease-in-out duration-500" />
      <h1 className="text-4xl mb-4 font-bold">
        Welcome to Jay JS!
      </h1>
      <NavBar />
      <Outlet />
    </section>
  )
}
