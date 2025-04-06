import "./styles/globals.css";
import "./styles/fscroll.css";
import { i18nProvider, initTheme, resolvedRoutes } from "@jay-js/system";
import { Routes } from "./routes/routes";
import i18nConfig from "./locales/config";

initTheme();
i18nProvider(Routes, i18nConfig);

export default { resolvedRoutes };

setTimeout(() => {
  console.log(resolvedRoutes);
}, 3000);