import { ISetValue, StateType, setOptions } from "../types.js";

let _subscriber: ((args?: any) => (void | Promise<void>)) | null = null;

function fn_hash(func: Function): string {
  const funcString = func.toString();
  let hash = 0;
  for (let i = 0; i < funcString.length; i++) {
    const char = funcString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return Math.abs(hash).toString(16);
}

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
      if (state.effects.size === 0) {
        return;
      }
      if (options?.target) {
        if (Array.isArray(options.target)) {
          options.target.forEach((item: string) => {
            const effect = state.effects.get(item);
            if (effect) {
              effect(data);
            }
          });
          return;
        }
        const effect = state.effects.get(options.target);
        if (effect) {
          effect(data);
        }
        return;
      }
      state.effects.forEach((item: (arg0: T) => any) => item(data));
    },
    get: (callback?: (data: T) => void): T => {
      if (callback) {
        callback(data);
      }
      return data;
    },
    sub: (id: string, effect: (data: T) => any, run = false): any => {
      state.effects.set(id, effect);
      if (run) {
        return effect(data);
      }
    },
    unsub: (id: string) => {
      state.effects.delete(id);
    },
    trigger: (id?: string): void => {
      if (state.effects.size === 0) {
        return;
      }
      if (id) {
        const effect = state.effects.get(id);
        if (effect) {
          effect(data);
        }
        return;
      }
      state.effects.forEach((item: (arg0: T) => any) => item(data));
    },
    clear: (newData?: T | ((currentState: T) => T)): void => {
      if (typeof newData === "function") {
        data = (newData as (currentState: T) => T)(data);
      } else if (newData) {
        data = newData;
      } else {
        data = undefined as unknown as T;
      }
      state.effects.clear();
    },
    effects: new Map(),
    get value() {
      if (_subscriber) {
        let hash = fn_hash(_subscriber);
        if (_subscriber.name.includes("_setValue") && (_subscriber as any)._fn) {
          hash = fn_hash((_subscriber as any)._fn);
        }
        state.sub(hash, _subscriber);
      }
      return this.get();
    },
    set value(newData: T) {
      this.set(newData);
    }
  };
  return state;
};

export function Effect(fn: () => void) {
  _subscriber = fn;
  fn();
  _subscriber = null;
}

export function Values(fn: () => any): any {
  const _setValue = async function () {
    if (_setValue._path.length > 0) {
      let target = _setValue._object;
      for (let i = 0; i < _setValue._path.length - 1; i++) {
        target = target[_setValue._path[i]];
      }
      const lastKey = _setValue._path[_setValue._path.length - 1];
      target[lastKey] = await _setValue._fn();
      return;
    }
    _setValue._object = await _setValue._fn();
  } as ISetValue;
  _setValue._object = undefined;
  _setValue._path = [];
  _setValue._fn = fn;
  async function _set_value_effect(object: any, ...path: string[]) {
    _setValue._object = object;
    _setValue._path = path;
    _subscriber = _setValue;
    await _setValue();
    _subscriber = null;
  }
  return _set_value_effect;
}