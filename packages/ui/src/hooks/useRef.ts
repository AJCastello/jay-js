export interface IRefObject<T> {
  current: T | null
}

export function useRef<T>(): IRefObject<T> {
  return {
    current: null
  };
}