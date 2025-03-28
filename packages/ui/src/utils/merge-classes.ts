import { twMerge } from "tailwind-merge";

/**
 * Merges multiple class name strings, filtering out falsy values and resolving Tailwind CSS conflicts
 *
 * @param args - Array of class strings or undefined values
 * @returns A single merged class string with Tailwind conflicts resolved
 */
export function mergeClasses(args: Array<string | undefined>): string {
	return twMerge(...args.filter(Boolean));
}
