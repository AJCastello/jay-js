import { Router } from "@jay-js/system";
import { Layout } from "../layouts/layout";
import { Home } from "../pages/home";

export function Routes() {
  Router([
    {
      path: "/",
      element: Layout,
      layout: true,
      children: [
        {
          path: "/",
          element: Home
        },
        {
          path: "/about",
          element: async () => {
            const { About } = await import("../pages/about");
            return About();
          }
        }
      ]
    }
  ], {
    target: "#app"
  });
}