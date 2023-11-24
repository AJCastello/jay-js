import { getPotentialMatch } from "./getPotentialMatch.js";

export function getParams(): Record<string, string> {
  let params: Record<string, string> = {};
  const match = getPotentialMatch();

  if (match.result) {
    const values = match.result?.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map((result) => result[1]);
    params = Object.fromEntries(keys.map((key, i) => [key, (values as any)[i]]));
  }

  const searchParams = new URLSearchParams(window.location.search);
  searchParams.forEach((value, key) => (params[key] = value));
  return params;
}