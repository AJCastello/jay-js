import { Navigate } from "@jay-js/system";
import { i18n } from "../../locales/i18n";

export function NavBar() {
  function handleNavigate(ev, path) {
    ev.preventDefault();
    Navigate(path);
  }

  return (
    <nav className="mb-4 flex gap-2">
      <a href="/" onclick={(ev) => handleNavigate(ev, "/")}>
        {i18n("Home")}
      </a>
      <a href="/about" onclick={(ev) => handleNavigate(ev, "/about")}>
        {i18n("About")}
      </a>
    </nav>
  )
}