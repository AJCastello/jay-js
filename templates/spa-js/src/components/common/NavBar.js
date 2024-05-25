import { Navigate } from "@jay-js/system";
import { Link, Section } from "@jay-js/ui";

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
        children: "Home",
        onclick: (ev) => handleNavigate(ev, "/")
      }),
      Link({
        href: "/about",
        children: "About",
        onclick: (ev) => handleNavigate(ev, "/about")
      })
    ]
  })
}