/**
 * @file JSX Runtime implementation for Jay JS
 * @description Provides the JSX transformation functions for production use
 */

import { Base, Fragment } from "@jay-js/elements";

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
 * JSX transformation function for production use
 *
 * @param tag - String tag name or component function
 * @param props - Element properties and attributes
 * @returns HTMLElement or Promise<HTMLElement>
 */
function jsx(tag: any, props: JSXProps): HTMLElement | Promise<HTMLElement> {
	if (typeof tag === "function") {
		return tag({ ...props });
	}
	// Use type assertion to get around type checking issues
	// This is safe because Base component expects tag to be a valid HTML tag
	const element = Base({ tag, ...props });
	return element;
}

export { jsx, jsx as jsxs, Fragment };
export type { JSX } from "./types/intrinsic-elements.js";
