import { twMerge } from "tailwind-merge";

export function mergeClasses(args: Array<string | undefined>): string {
  // return twMerge(...args.filter(Boolean))
  return args.filter(Boolean).join(" ");
  
}