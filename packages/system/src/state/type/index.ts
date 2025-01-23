export type setOptions = {
  silent?: boolean;
  target?: string | Array<string>;
};

export type StateType<T> = {
  set: (newData: T | ((currentState: T) => T), options?: setOptions) => void;
  get: (callback?: (value: T) => void) => T;
  sub: (id: string, effect: (value: T) => void, run?: boolean) => void;
  unsub: (id: string) => void;
  trigger: (id?: string) => void;
  clear: (newData?: T | ((currentState: T) => T)) => void;
  effects: Map<string, (value: T) => void>;
  value: T;
};

export interface ISetValue extends Function {
  (): Promise<void>;
  _object: any;
  _path: string[];
  _fn: () => any;
}
