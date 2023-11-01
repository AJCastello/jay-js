import { extname } from "path";
import { IJayJsViteOptions } from "../types";
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
        const newSrc = parseMarkdown(src);
        
        return {
          code: newSrc,
          map: null
        };
      }
      if ([".ts", ".js", ".tsx", ".jsx"].includes(extname(id))) {
        // detects if the file has a useCollection method
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



