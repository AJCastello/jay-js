import { Navigate } from "@jay-js/system";
import { i18n } from "../locales/i18n";

export function NavBar() {
  function handleNavigate(ev, path) {
    ev.preventDefault();
    Navigate(path);
  }

  return (
    <nav className="mb-4 flex gap-2">
      <a href="/" className="underline" onclick={(ev) => handleNavigate(ev, "/")}>
        {i18n("Home")}
      </a>
      <a href="/about" className="underline" onclick={(ev) => handleNavigate(ev, "/about")}>
        {i18n("About")}
      </a>
      <a href="/blog" className="underline" onclick={(ev) => handleNavigate(ev, "/blog")}>
        {i18n("Blog")}
      </a>
    </nav>
  )
}