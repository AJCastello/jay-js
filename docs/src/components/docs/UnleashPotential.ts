import { Box, Typography } from "@jay-js/ui";

export function UnleashPotential() {
  return Box({
    className: "mt-12",
    children: [
      Typography({
        className: "text-3xl font-bold max-w-xl mx-auto h-32 flex items-center justify-center text-center",
        children: [
          "Unleash the Potential of",
          Typography({
            tag: "span",
            className: "text-primary ml-2",
            children: "Jay JS"
          })
        ]
      }),
      Typography({
        children: "Explore our comprehensive documentation and dive into each Jay JS package to discover how it can revolutionize the way you build web applications. Get ready to experience a new level of performance, flexibility, and productivity."
      }),
      Typography({
        className: "my-8 italic",
        children: "Start your journey with Jay JS today! 🚀"
      })
    ]
  })
}