export function mergeClasses(args: Array<string | Boolean | undefined>): string {
  return args.filter(Boolean).join(" ").trim();
}