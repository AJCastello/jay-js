import type { TRefObject } from "../../hooks/use-ref.js";

interface HTMLFormElementExt extends HTMLElement {
	acceptCharset: string;
	action: string;
	autocomplete: AutoFillBase;
	readonly elements: HTMLFormControlsCollection;
	encoding: string;
	enctype: string;
	readonly length: number;
	method: string;
	name: string;
	noValidate: boolean;
	rel: string;
	readonly relList: DOMTokenList;
	target: string;
	checkValidity(): boolean;
	reportValidity(): boolean;
	requestSubmit(submitter?: HTMLElement | null): void;
	reset(): void;
	submit(): void;
	addEventListener<K extends keyof HTMLElementEventMap>(
		type: K,
		listener: (this: HTMLFormElement, ev: HTMLElementEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions,
	): void;
	addEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | AddEventListenerOptions,
	): void;
	removeEventListener<K extends keyof HTMLElementEventMap>(
		type: K,
		listener: (this: HTMLFormElement, ev: HTMLElementEventMap[K]) => any,
		options?: boolean | EventListenerOptions,
	): void;
	removeEventListener(
		type: string,
		listener: EventListenerOrEventListenerObject,
		options?: boolean | EventListenerOptions,
	): void;
}

type ListenerKeys = keyof GlobalEventHandlersEventMap;

export type Listener = {
	[K in ListenerKeys]?: (this: GlobalEventHandlers, ev: GlobalEventHandlersEventMap[K]) => any;
};

export type TBaseTagNameMap = Omit<HTMLElementTagNameMap, "form"> & { form: HTMLFormElementExt };

export type TBaseTagMap = keyof TBaseTagNameMap;

export type TStyle = Partial<Omit<CSSStyleDeclaration, "parentRule" | "length">>;

export type TChildren =
	| (string | Node | boolean | null | undefined)
	| (string | Node | boolean | null | undefined)[]
	| Promise<string | Node | boolean | null | undefined>
	| Promise<string | Node | boolean | null | undefined>[]
	| (string | Node | Promise<string | Node> | boolean | null | undefined)[];

export type TBaseElement<T extends TBaseTagMap> = {
	tag?: T;
	className?: string;
	listeners?: Listener;
	ref?: TRefObject<HTMLElement>;
	dataset?: Partial<DOMStringMap>;
	style?: TStyle;
	children?: TChildren;
	onmount?: (element: HTMLElement) => void;
} & Omit<Partial<TBaseTagNameMap[T]>, "children" | "style" | "size">;

export type TBaseDiv = TBaseElement<TBaseTagMap> & {
	tag: TBaseTagMap;
};

export type TBase<T extends TBaseTagMap> = TBaseElement<T> | TBaseDiv;
