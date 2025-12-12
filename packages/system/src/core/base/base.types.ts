import type { TRefObject } from "../utils/use-ref.js";

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

type TChildValue = string | number | Node | boolean | null | undefined;
type TChildPromise = Promise<TChildValue>;
type TChildFunction = () => TChildValue | TChildPromise;
type TChildArray = (TChildValue | TChildPromise | TChildFunction | TChildArray)[];

export type TChildren = TChildValue | TChildPromise | TChildFunction | TChildArray;

export type TLifecycleElement = {
	onmount?: (element: HTMLElement) => void | (() => void);
	onunmount?: (element: HTMLElement) => void;
} & HTMLElement;

type ReactiveHTMLProps<T> = {
	[K in keyof T]?: K extends `on${string}` ? T[K] : T[K] | (() => T[K]);
};

export type TBaseElement<T extends TBaseTagMap> = {
	tag?: T;
	className?: string | (() => string);
	listeners?: Listener;
	ref?: TRefObject<HTMLElement>;
	dataset?:
		| Partial<DOMStringMap>
		| (() => Partial<DOMStringMap>)
		| {
				[key: string]: string | (() => string);
		  };
	style?:
		| TStyle
		| (() => TStyle)
		| {
				[K in keyof TStyle]?: TStyle[K] | (() => TStyle[K]);
		  };
	children?: TChildren;
	onmount?: (element: HTMLElement) => void | (() => void);
	onunmount?: (element: HTMLElement) => void;
} & ReactiveHTMLProps<Omit<TBaseTagNameMap[T], "children" | "style" | "size" | "className" | "dataset">>;

export type TBaseDiv = TBaseElement<TBaseTagMap> & {
	tag: TBaseTagMap;
};

export type TBase<T extends TBaseTagMap> = TBaseElement<T> | TBaseDiv;
