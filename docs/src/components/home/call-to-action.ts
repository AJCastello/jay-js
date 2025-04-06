import { Box, Icon, Link, Section, Typography } from "@jay-js/ui";

export function CallToAction() {
  return Section({
    tag: "section",
    className: "container py-20 mx-auto",
    children: Box({
      className: "bg-gradient-to-r from-primary to-accent text-primary-content rounded-xl shadow-xl p-12 text-center",
      children: [
        Typography({
          tag: "h2",
          className: "text-4xl font-bold mb-4",
          children: "Ready to Build Something Amazing?"
        }),
        Typography({
          className: "text-xl max-w-2xl mx-auto mb-8 opacity-90",
          children: "Get started with JayJS today and experience the perfect balance of simplicity, flexibility, and performance."
        }),
        Box({
          className: "flex flex-wrap justify-center gap-4",
          children: [
            Link({
              href: "/docs/getting-started",
              className: "btn bg-white text-primary hover:bg-base-200 border-none",
              children: [
                "Get Started",
                Icon({
                  className: "ml-2",
                  icon: "ph-duotone ph-arrow-right"
                })
              ]
            }),
            Link({
              href: "https://github.com/jay-js/jay-js",
              target: "_blank",
              rel: "noopener noreferrer",
              className: "btn btn-outline border-white text-white hover:bg-white hover:text-primary",
              children: [
                "Star on GitHub",
                Icon({
                  className: "ml-2",
                  icon: "ph-duotone ph-star"
                })
              ]
            })
          ]
        })
      ]
    })
  });
}