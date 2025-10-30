import { Navigate } from "@jay-js/system";

export function NavBar() {
  function handleNavigate(ev: MouseEvent, path: string) {
    ev.preventDefault();
    Navigate(path);
  }

  return (
    <nav className="mb-4 flex gap-2">
      <a href="/" className="underline" onclick={(ev: MouseEvent) => handleNavigate(ev, "/")}>
        Home
      </a>
      <a href="/about" className="underline" onclick={(ev: MouseEvent) => handleNavigate(ev, "/about")}>
        About
      </a>
    </nav>
  )
}