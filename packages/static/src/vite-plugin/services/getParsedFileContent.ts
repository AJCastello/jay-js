// utils
import { extractMetadata } from "../utils/extractMetadata.js";

export function getParsedFileContent(file: string, src: string): any {
  if (file.endsWith(".js")) {
    const runContent = new Function("return " + src.replace("export default ", ""));
    return runContent();
  }

  if (file.endsWith(".json")) {
    return JSON.parse(src);
  }

  if (file.endsWith(".md") || file.endsWith(".mdx")) {
    return extractMetadata(src);
  }
}