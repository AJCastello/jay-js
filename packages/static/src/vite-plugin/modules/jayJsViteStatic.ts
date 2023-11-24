import { extname } from "path";
import { IJayJsViteOptions } from "../types/index.js";
import { jayJsViteDefineOptions } from "../options/jayJsViteDefineOptions.js";
import { buildCollection } from "../services/buildCollection.js";
import { extractUseCollectionData } from "../utils/extractUseCollectionData.js";
import { parseMarkdown } from "../utils/parseMarkdown.js";

export function jayJsViteStatic(options: IJayJsViteOptions) {
  if (options) {
    jayJsViteDefineOptions(options);
  }

  return {
    name: "jay-js-vite",
    transform(src: string, id: string) {
      if ([".md"].includes(extname(id))) {
        const parsedMarkdown = parseMarkdown(src);
        const newSrc = `export default ${JSON.stringify(parsedMarkdown, null, 2)};`;
        return {
          code: newSrc,
          map: null
        };
      }
      if ([".ts", ".js", ".tsx", ".jsx"].includes(extname(id))) {
        const useCollectionData = extractUseCollectionData(src);
        if (useCollectionData) {
          buildCollection(useCollectionData);
        }
        return {
          code: src,
          map: null
        };
      }
    }
  }
}



