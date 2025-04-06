import { Box, Icon, Link, Section, Typography } from "@jay-js/ui";

export function Packages() {
  const packagesList = [
    {
      name: "system",
      description: "Core utilities for state management, routing, drag-and-drop, and lazy loading",
      features: ["State management", "Client-side routing", "Draggable elements", "Lazy-loaded modules"],
      icon: "ph-duotone ph-gear"
    },
    {
      name: "ui",
      description: "Flexible UI components that can be used with or without Tailwind CSS",
      features: ["Customizable components", "Headless or styled options", "DaisyUI integration", "Responsive design"],
      icon: "ph-duotone ph-palette"
    },
    {
      name: "jsx",
      description: "JSX runtime for writing declarative components with familiar syntax",
      features: ["JSX development", "Vite plugin", "TypeScript declarations", "Fragment support"],
      icon: "ph-duotone ph-brackets-curly"
    }
  ];

  return Section({
    tag: "section",
    className: "container py-20 mx-auto",
    children: [
      Box({
        className: "text-center mb-16",
        children: [
          Typography({
            className: "text-sm font-bold tracking-wider text-primary uppercase",
            children: "Packages"
          }),
          Typography({
            tag: "h2",
            className: "mt-3 text-3xl font-bold tracking-tight lg:text-4xl",
            children: "Modular By Design"
          }),
          Typography({
            className: "max-w-2xl mx-auto mt-4 text-lg opacity-80",
            children: "Choose exactly what you need. JayJS is split into focused packages that can be used independently or together."
          })
        ]
      }),
      Box({
        className: "grid grid-cols-1 gap-8 md:grid-cols-3",
        children: packagesList.map(({ name, description, features, icon }) => {
          return Box({
            className: "flex flex-col h-full border border-base-300 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md hover:border-primary/50 overflow-hidden",
            children: [
              Box({
                className: "p-6 bg-base-200 flex items-center",
                children: [
                  Box({
                    className: "flex items-center justify-center w-12 h-12 rounded-md bg-primary text-primary-content",
                    children: Icon({
                      className: "text-2xl",
                      icon: icon
                    })
                  }),
                  Typography({
                    tag: "h3",
                    className: "ml-4 text-xl font-bold",
                    children: `@jay-js/${name}`
                  })
                ]
              }),
              Box({
                className: "p-6 flex-grow",
                children: [
                  Typography({
                    className: "mb-4",
                    children: description
                  }),
                  Box({
                    tag: "ul",
                    className: "space-y-2",
                    children: features.map(feature => {
                      return Box({
                        tag: "li",
                        className: "flex items-start",
                        children: [
                          Icon({
                            className: "w-5 h-5 mr-2 text-primary flex-shrink-0 mt-0.5",
                            icon: "ph-duotone ph-check-circle"
                          }),
                          Typography({
                            children: feature
                          })
                        ]
                      });
                    })
                  })
                ]
              }),
              Box({
                className: "p-4 bg-base-200 mt-auto",
                children: Link({
                  href: `/docs/packages/${name}`,
                  className: "text-primary font-medium hover:underline flex items-center",
                  children: [
                    "View documentation",
                    Icon({
                      className: "ml-2 w-4 h-4",
                      icon: "ph-duotone ph-arrow-right"
                    })
                  ]
                })
              })
            ]
          });
        })
      })
    ]
  });
}