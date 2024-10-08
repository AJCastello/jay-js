export type setOptions = {
  silent?: boolean;
  target?: string | Array<string>;
};

export type StateType<T> = {
  set: (newData: T | ((currentState: T) => T), options?: setOptions) => void;
  get: (callback?: (data: T) => void) => T;
  sub: (id: string, effect: (data: T) => void, run?: boolean) => void;
  unsub: (id: string) => void;
  trigger: (id?: string) => void;
  clear: (newData?: T | ((currentState: T) => T)) => void;
  effect: Map<string, (data: T) => void>;
  data: T;
};