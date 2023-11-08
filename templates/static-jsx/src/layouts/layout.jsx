import { Outlet, Divider, Img } from "@jay-js/ui";

// components
import { NavBar } from "../components/common/NavBar";

// logo
import jayjs from "/jayjs.svg";

export function Layout() {
  return (
    <section className="max-w-lg mx-auto h-screen w-screen flex flex-col justify-center items-center">
      <Img src={jayjs} alt="Jay JS Logo" className="w-32 h-32 mb-4" />
      <h1 className="text-4xl mb-4 font-bold">
        Welcome to Jay JS!
      </h1>
      <NavBar />
      <Divider />
      <Outlet />
    </section>
  )
}
