import { Navigate } from "@jay-js/system";
import { i18n } from "../../locales/i18n";

export function NavBar() {
  function handleNavigate(ev: MouseEvent, path: string) {
    ev.preventDefault();
    Navigate(path);
  }

  return (
    <nav className="mb-4 flex gap-2">
      <a href="/" onclick={(ev: MouseEvent) => handleNavigate(ev, "/")}>
        {i18n("navbar.home")}
      </a>
      <a href="/about" onclick={(ev: MouseEvent) => handleNavigate(ev, "/about")}>
        {i18n("navbar.about")}
      </a>
      <a href="/blog" onclick={(ev: MouseEvent) => handleNavigate(ev, "/blog")}>
        {i18n("navbar.blog")}
      </a>
    </nav>
  )
}