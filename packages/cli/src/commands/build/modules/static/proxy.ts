const queryParams = new URL(import.meta.url).searchParams;
const originalPath = queryParams.get("path");

if (originalPath === null) {
  throw new Error("'path' query parameter is required");
}

export default originalPath;