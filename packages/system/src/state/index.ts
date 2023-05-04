export type StateType<T> = {
  set: (newData: T | ((currentState: T) => T)) => void;
  get: (callback?: (data: T) => void) => T;
  sub: (id: string, effect: (data: T) => void) => any;
  unsub: (id: string) => void;
  trigger: () => void;
  effect: Map<string, (data: T) => void>;
  data: T;
};

export const State = <T>(data: T): StateType<T> => {
  const state: StateType<T> = {
    set: (newData: T | ((currentState: T) => T)): void => {
      if (typeof newData === "function") {
        data = (newData as (currentState: T) => T)(data);
      } else {
        data = newData;
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
    sub: (id: string, effect: (data: T) => void) => {
      state.effect.set(id, effect);
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
    effect: new Map(),
    data,
  };

  return state;
};
