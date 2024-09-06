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
    sub: (id: string, effect: (data: T) => any, run = false): any => {
      state.effect.set(id, effect);
      if (run) {
        return effect(data);
      }
    },
    unsub: (id: string) => {
      state.effect.delete(id);
    },
    trigger: (id?: string): void => {
      if (state.effect.size === 0) {
        return;
      }      
      if (id) {
        const effect = state.effect.get(id);
        if (effect) {
          effect(data);
        }
        return;
      }
      state.effect.forEach((item: (arg0: T) => any) => item(data));
    },
    clear: (newData?: T | ((currentState: T) => T)): void => {
      if (typeof newData === "function") {
        data = (newData as (currentState: T) => T)(data);
      } else if (newData) {
        data = newData;
      } else {
        data = undefined as unknown as T;
      }
      state.effect.clear();
    },
    effect: new Map(),
    data,
  };

  return state;
};
