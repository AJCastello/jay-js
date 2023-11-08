// style
import "./styles/globals.css";

// providers
import { i18nProvider } from "@jay-js/system";

// routes
import { Routes } from "./routes/routes";

// i18n
import { i18nConfig } from "./locales/i18n";

const app = document.querySelector("#app");

i18nProvider(() => {
  Routes(app);
}, i18nConfig);
