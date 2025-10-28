// style
import "./styles/globals.css";

// providers
import { i18nProvider, resolvedRoutes } from "@jay-js/system";

// routes
import { Routes } from "./routes/routes";
import { i18nConfig } from "./locales/i18n";

const app = document.querySelector("#app");

i18nProvider(() => {
  Routes(app);
}, i18nConfig);

export default { resolvedRoutes }