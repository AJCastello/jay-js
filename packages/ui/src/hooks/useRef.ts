/**
 * Represents a reference object holding a value of type T
 */
export type TRefObject<T> = {
  current: T | null;
}

/**
 * Creates a mutable reference object that persists across renders
 * @template T The type of value the reference will hold
 * @returns A reference object with a mutable .current property
 */
export function useRef<T>(): TRefObject<T> {
  return {
    current: null,
  };
}
