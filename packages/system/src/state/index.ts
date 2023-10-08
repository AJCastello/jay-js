type setOptions = {
  silent: boolean;
};

export type StateType<T> = {
  set: (newData: T | ((currentState: T) => T), options?: setOptions) => void;
  get: (callback?: (data: T) => void) => T;
  sub: (id: string, effect: (data: T) => void, run?: boolean) => void;
  unsub: (id: string) => void;
  trigger: () => void;
  clear: (newData: T | ((currentState: T) => T)) => void;
  effect: Map<string, (data: T) => void>;
  data: T;
};

export const State = <T>(data: T): StateType<T> => {
  const state: StateType<T> = {
    set: (newData: T | ((currentState: T) => T), options?: setOptions): void => {
      if (typeof newData === "function") {
        data = (newData as (currentState: T) => T)(data);
      } else {
        data = newData;
      }

      if (options?.silent) {
        return;
      }

      if (state.effect.size === 0) {
        return;
      }
      state.effect.forEach((item: (arg0: T) => any) => item(data));
    },
    get: (callback?: (data: T) => void): T => {
      if (callback) {
        callback(data);
      }
      return data;
    },
    sub: (id: string, effect: (data: T) => void, run: boolean = false) => {
      state.effect.set(id, effect);
      if (run) {
        effect(data);
      }
    },
    unsub: (id: string) => {
      state.effect.delete(id);
    },
    trigger: () => {
      if (state.effect.size === 0) {
        return;
      }
      state.effect.forEach((item: (arg0: T) => any) => item(data));
    },
    clear: (newData: T | ((currentState: T) => T)): void => {
      if (typeof newData === "function") {
        data = (newData as (currentState: T) => T)(data);
      } else {
        data = newData;
      }
      state.effect.clear();
    },
    effect: new Map(),
    data,
  };

  return state;
};
