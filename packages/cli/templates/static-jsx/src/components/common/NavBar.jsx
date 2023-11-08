import { Navigate } from "@jay-js/system";

export function NavBar() {
  function handleNavigate(ev, path) {
    ev.preventDefault();
    Navigate(path);
  }

  return (
    <nav className="mb-4 flex gap-2">
      <a href="/" onclick={(ev) => handleNavigate(ev, "/")}>
        Home
      </a>
      <a href="/about" onclick={(ev) => handleNavigate(ev, "/about")}>
        About
      </a>
      <a href="/blog" onclick={(ev) => handleNavigate(ev, "/blog")}>
        Blog
      </a>
    </nav>
  )
}