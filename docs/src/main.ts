// style
import "./styles/globals.css";
import "./styles/fscroll.css";

// providers
import { i18nProvider, resolvedRoutes } from "@jay-js/system";

// routes
import { Routes } from "./routes/routes";

// i18n
import { i18nConfig } from "./locales/i18n";

const app = document.querySelector<HTMLDivElement>("#app")!;

i18nProvider(() => {
	Routes(app);
}, i18nConfig);

export default { resolvedRoutes };
