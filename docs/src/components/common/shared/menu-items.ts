import { intl } from "../../../locales";

export interface MenuItem {
  label: string;
  href: string;
  scrollTo?: string;
}

export const navigationItems: MenuItem[] = [
  {
    label: intl("Get Started"),
    href: "/docs"
  },
  {
    label: intl("Features"),
    href: "/#features",
    scrollTo: "#features"
  },
  {
    label: intl("Why Jay JS"),
    href: "/#why-jayjs",
    scrollTo: "#why-jayjs"
  },
  {
    label: intl("Packages"),
    href: "/#packages",
    scrollTo: "#packages"
  },
  {
    label: intl("Documentation"),
    href: "/docs"
  },
  {
    label: intl("Examples"),
    href: "/#code-examples",
    scrollTo: "#code-examples"
  }
];

export const legalItems: MenuItem[] = [
  {
    label: intl("Terms of Use"),
    href: "/terms"
  },
  {
    label: intl("Privacy Policy"),
    href: "/privacy"
  },
  {
    label: intl("License"),
    href: "/license"
  }
];

export const socialItems = [
  {
    label: "GitHub",
    href: "https://github.com/jay-js/jay-js",
    icon: "ph-duotone ph-github-logo"
  },
  {
    label: "Twitter",
    href: "https://twitter.com/jayjs_dev",
    icon: "ph-duotone ph-twitter-logo"
  },
  {
    label: "Discord",
    href: "https://discord.gg/jayjs",
    icon: "ph-duotone ph-discord-logo"
  },
  {
    label: "NPM",
    href: "https://www.npmjs.com/org/jay-js",
    icon: "ph-duotone ph-package"
  }
];