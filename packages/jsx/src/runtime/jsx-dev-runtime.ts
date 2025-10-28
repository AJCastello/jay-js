/**
 * @file JSX Development Runtime implementation for Jay JS
 * @description Provides the JSX transformation functions for development use
 */

import { Base, Fragment } from "@jay-js/elements";
import type {} from "../types/jsx-intrinsic-elements";

/**
 * Type definition for JSX props
 */
export interface JSXProps {
	[key: string]: any;
	children?: any[] | any;
}

/**
 * Type definition for JSX component function
 */
export type JSXComponent = (props: JSXProps) => HTMLElement | Promise<HTMLElement>;

/**
 * JSX Development transformation function
 * This function is used by the JSX compiler in development mode
 *
 * @param tag - HTML tag name or component function
 * @param props - Element properties and attributes
 * @param key - Unique key for element identification
 * @param isStaticChildren - Whether children are static
 * @param source - Source information for development tools
 * @param self - Self reference for development tools
 * @returns HTMLElement or Promise<HTMLElement>
 */
function jayJSXDEV(
	tag: any,
	props: JSXProps,
	_key: string | null,
	_isStaticChildren: boolean,
	_source: any,
	_self: any,
): HTMLElement | Promise<HTMLElement> {
	if (typeof tag === "function") {
		return tag({ ...props });
		// Uncomment if async handling needs improvement
		// const result = tag({ ...props });
		// if (result instanceof Promise) {
		//   return Promise.resolve(result);
		// }
		// return result as HTMLElement;
	}
	// Use type assertion to get around type checking issues
	// This is safe because Base component expects tag to be a valid HTML tag
	const element = Base({ tag, ...props });
	return element;
}

export { jayJSXDEV as jsxDEV, Fragment };
