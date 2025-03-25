import { Navigate, Router } from "@jay-js/system";
import { Layout } from "../layouts/layout";
import { Home } from "../pages/home";
import { Article } from "../pages/docs/article";
import { DocsIntro } from "../pages/docs/DocsIntro";
import { SystemDocs } from "../layouts/systemDocs";

export function Routes(app: HTMLDivElement) {
  Router([
    {
      path: "/",
      element: Layout,
      layout: true,
      children: [
        {
          path: "/",
          element: Home
        }
      ]
    },
    {
      path: "/docs",
      element: DocsIntro,
    },
    {
      path: "/docs/system",
      element: SystemDocs,
      layout: true,
      children: [
        {
          path: "/:slug",
          element: Article
        }
      ]
    }
  ], {
    target: "#app",
    onError: (error) => {
      if (error.cause === "no-match") {
        Navigate("/");
      }
    }
  });
}