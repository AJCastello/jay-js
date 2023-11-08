// style
import "./styles/globals.css";

// routes
import { Routes } from "./routes/routes";

const app = document.querySelector<HTMLDivElement>("#app")!;
Routes(app);
