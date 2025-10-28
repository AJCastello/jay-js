import { Navigate } from "@jay-js/system";
import { Link, Section } from "@jay-js/elements";
import { i18n } from "../../locales/i18n";

export function NavBar() {
  function handleNavigate(ev, path) {
    ev.preventDefault();
    Navigate(path);
  }

  return Section({
    tag: "nav",
    className: "mb-4 flex gap-2",
    children: [
      Link({
        href: "/",
        children: i18n("Home"),
        onclick: (ev) => handleNavigate(ev, "/")
      }),
      Link({
        href: "/about",
        children: i18n("About"),
        onclick: (ev) => handleNavigate(ev, "/about")
      })
    ]
  })
}