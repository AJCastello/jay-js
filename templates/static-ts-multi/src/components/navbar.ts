import { Navigate } from "@jay-js/system";
import { Link, Section } from "@jay-js/elements";
import { i18n } from "../locales/i18n";

export function NavBar() {
  function handleNavigate(ev: MouseEvent, path: string) {
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
				className: "underline",
        onclick: (ev) => handleNavigate(ev, "/")
      }),
      Link({
        href: "/about",
        children: i18n("About"),
				className: "underline",
        onclick: (ev) => handleNavigate(ev, "/about")
      }),
      Link({
        href: "/blog",
        children: i18n("Blog"),
				className: "underline",
        onclick: (ev) => handleNavigate(ev, "/blog")
      })
    ]
  })
}