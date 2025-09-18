import { extname } from "path";
import { IJayJsViteOptions } from "../types/index.js";
import { jayJsViteDefineOptions } from "../options/jay-js-vite-define-options.js";
import { buildCollection } from "../services/build-collection.js";
import { extractUseCollectionData } from "../utils/extract-use-collection-data.js";
import { parseMarkdown } from "../utils/parse-markdown.js";
import { hmrManager } from "../utils/hmr-manager.js";
import { hmrLogger } from "../utils/hmr-logger.js";

export function jayJsViteStatic(options: IJayJsViteOptions) {
  if (options) {
    jayJsViteDefineOptions(options);
  }

  return {
    name: "jay-js-vite",
    configureServer(server: any) {
      hmrManager.setServer(server);
      hmrLogger.success('HMR enabled for Markdown files and collections');
    },
    transform(src: string, id: string) {
      if ([".md", ".mdx"].includes(extname(id))) {
        const parsedMarkdown = parseMarkdown(src);
        const newSrc = `export default ${JSON.stringify(parsedMarkdown, null, 2)};`;
        
        // Track which collection this file belongs to for HMR
        const collectionName = hmrManager.getCollectionNameFromPath(id);
        if (collectionName) {
          hmrManager.trackFileCollection(id, collectionName);
        }
        
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
    },
    handleHotUpdate(ctx: any) {
      const { file, server } = ctx;
      
      // Handle Markdown file changes
      if ([".md", ".mdx"].includes(extname(file))) {
        const collectionName = hmrManager.getCollectionNameFromPath(file);
        
        if (collectionName) {
          try {
            // Rebuild affected collections
            const useCollectionData = {
              contentPath: options?.contentPath || '',
              dir: collectionName,
              format: 'js' as const,
              suffix: 'collection'
            };
            
            buildCollection(useCollectionData);
            hmrLogger.collectionRebuilt(collectionName);
            
            // Handle HMR invalidation
            return hmrManager.handleMarkdownChange(file);
          } catch (error) {
            hmrLogger.error('Error rebuilding collection on HMR:', error);
          }
        }

        // Let Vite handle the module update
        return [];
      }

      // Handle collection file changes
      if (file.includes('.collection.')) {
        hmrLogger.info(`Collection file changed: ${file}`);
        return hmrManager.handleCollectionChange(file);
      }

      // Default behavior
      return undefined;
    },
    buildStart() {
      // Clear HMR cache on build start
      hmrManager.clearCache();
    }
  }
}



