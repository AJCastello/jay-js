// style
import "./styles/globals.css";

// providers
import { resolvedRoutes } from "@jay-js/system";

// routes
import { Routes } from "./routes/routes";

const app = document.querySelector<HTMLDivElement>("#app")!;
Routes(app);

export default { resolvedRoutes }