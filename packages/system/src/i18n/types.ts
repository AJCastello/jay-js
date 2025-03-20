/**
 * Utility type that joins a key with its property path using dot notation
 * @template K - Base key (can be string or null)
 * @template P - Property to join with the key
 */
type Join<K, P> = K extends string | null
	? P extends string | number
		? `${K extends string ? `${K}.` : ""}${P}`
		: never
	: never;

/**
 * Generates all possible path strings for a nested object using dot notation
 * @template T - The object type to generate paths for
 * @template Prefix - Optional prefix for the path
 * @returns All possible paths in the object as string literals
 */
export type AllPaths<T, Prefix extends string | null = null> = T extends object
	? {
			[K in keyof T]-?: Join<Prefix, K> | AllPaths<T[K], Join<Prefix, K>>;
		}[keyof T]
	: T extends string
		? ""
		: any;

/**
 * Gets the type at a specific path in a nested object
 * @template T - The object to get the type from
 * @template Path - The dot-notation path to get the type at
 * @returns The type at the specified path
 */
export type GetTypeAtPath<T, Path extends string> = Path extends keyof T
	? T[Path]
	: Path extends `${infer Key}.${infer Rest}`
		? Key extends keyof T
			? GetTypeAtPath<T[Key], Rest>
			: never
		: never;

export type Ti18nLanguages = {
	code: string;
	data?: any;
	import?: () => Promise<any>;
};

export type Ti18nOptions = {
	languages: Array<Ti18nLanguages>;
	defaultLocale: string;
	saveToLocalStorage: boolean;
	localStorageKey: string;
	nestedKeys: boolean;
};

export interface Ti18nState {
	currentLocale: string;
	language: Ti18nLanguages;
}
