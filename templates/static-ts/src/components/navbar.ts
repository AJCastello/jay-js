import { Navigate } from "@jay-js/system";
import { Link, Section } from "@jay-js/elements";

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
        children: "Home",
				className: "underline",
        onclick: (ev) => handleNavigate(ev, "/")
      }),
      Link({
        href: "/about",
        children: "About",
				className: "underline",
        onclick: (ev) => handleNavigate(ev, "/about")
      }),
      Link({
        href: "/blog",
        children: "Blog",
				className: "underline",
        onclick: (ev) => handleNavigate(ev, "/blog")
      })
    ]
  })
}