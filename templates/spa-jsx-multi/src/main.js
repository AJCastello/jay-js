import "./styles/globals.css";
import { i18nProvider } from "@jay-js/system";
import { Routes } from "./routes/routes";
import { i18nConfig } from "./locales/i18n";

i18nProvider(() => {
  Routes();
}, i18nConfig);
