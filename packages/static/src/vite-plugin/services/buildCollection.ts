// node.js modules
import { join } from "path";
import { readFileSync, readdirSync } from "fs";

// configurations
import { jayJsViteOptions } from "../options/jayJsViteDefineOptions.js";

// types
import { IBuildCollection } from "../types/index.js";

// services
import { getParsedFileContent } from "./getParsedFileContent.js";
import { writeCollection } from "./writeCollection.js";

// utilities
import { reduceMetadata } from "../utils/reduceMetadata.js";


export function buildCollection({
  contentPath,
  suffix = "collection",
  format = "js",
  metadata,
  dir
}: IBuildCollection) {
  const collectionPath = join(jayJsViteOptions.contentPath, dir);
  const collectionFile = join(jayJsViteOptions.contentPath, `${dir}.${suffix}.${format}`);
  const files = readdirSync(collectionPath);

  const collection: Array<any> = [];

  files.forEach(file => {
    const filePath = join(collectionPath, file);
    const fileContent = readFileSync(filePath, "utf-8");
    const parsedContent = getParsedFileContent(file, fileContent);
    const reducedMetadata = reduceMetadata(parsedContent, metadata);
    collection.push(reducedMetadata);
  });

  writeCollection(collection, collectionFile, format);
  return collection;
}