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
  : T extends string ? "" : any;

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

/**
 * Interface defining a language configuration
 * @interface Ii18nLanguages
 */
export interface Ii18nLanguages {
  /** The language code (e.g., 'en', 'fr', 'es') */
  code: string;
  /** Optional pre-loaded translation data */
  data?: any;
  /** Optional function to dynamically import translation data */
  import?: () => Promise<any>;
}

/**
 * Interface for the internationalization options
 * @interface Ii18nOptions
 */
export interface Ii18nOptions {
  /** Array of available languages */
  languages: Array<Ii18nLanguages>;
  /** The default locale to use if no preference is found */
  defaultLocale: string;
  /** Whether to save the user's language preference to localStorage */
  saveToLocalStorage: boolean;
  /** The key to use when storing the language preference in localStorage */
  localStorageKey: string;
  /** Whether to support nested translation keys using dot notation */
  nestedKeys: boolean;
}

/**
 * Interface for the internationalization state
 * @interface Ii18nState
 */
export interface Ii18nState {
  /** The current active locale code */
  currentLocale: string;
  /** The currently loaded language configuration */
  language: Ii18nLanguages;
}
