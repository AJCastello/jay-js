import { Navigate } from "@jay-js/system";
import { Link, Section } from "@jay-js/ui";
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
        children: i18n("navbar.home"),
        onclick: (ev) => handleNavigate(ev, "/")
      }),
      Link({
        href: "/about",
        children: i18n("navbar.about"),
        onclick: (ev) => handleNavigate(ev, "/about")
      }),
      Link({
        href: "/blog",
        children: i18n("navbar.blog"),
        onclick: (ev) => handleNavigate(ev, "/blog")
      })
    ]
  })
}