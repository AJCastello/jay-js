// jay
import { Navigate, Router } from "@jay-js/system";

// layout
import { Layout } from "../layouts/layout";

// page
import { Home } from "../pages/home";

export function Routes(app) {
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
    target: app,
    onError: (error) => {
      if (error.cause === "no-match") {
        Navigate("/");
      }
    }
  });
}