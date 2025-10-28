import { register } from "node:module";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const loaderPath = pathToFileURL(path.join(__dirname, "loader.js")).href;

register(loaderPath);
