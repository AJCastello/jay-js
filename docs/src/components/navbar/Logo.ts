import { Navigate } from "@jay-js/system";
import jayjs from "/jayjs.svg";
import { Box, Img, Link } from "@jay-js/ui";

export function Logo() {
  return Box({
    className: "flex flex-row items-center",
    children: [
      Img({
        src: jayjs,
        alt: "Jay JS Logo",
        className: "w-8 h-8"
      }),
      Link({
        className: "ml-4 font-bold text-2xl no-underline",
        children: "Jay JS",
        href: "/",
        onclick: (e) => {
          e.preventDefault();
          Navigate("/")
        }
      })
    ]
  })
}