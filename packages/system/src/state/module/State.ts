import { StateType, setOptions } from "../type/index.js";

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

      if (options?.target) {
        if (Array.isArray(options.target)) {
          options.target.forEach((item: string) => {
            const effect = state.effect.get(item);
            if (effect) {
              effect(data);
            }
          });
          return;
        }

        const effect = state.effect.get(options.target);
        if (effect) {
          effect(data);
        }
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
