export type StateType = {
  set: (newData: any) => void;
  get: (callback?: (data: any) => void) => any;
  sub: (id: string, effect: (data: any) => void) => any;
  unsub: (id: string) => void;
  trigger: () => void;
  effect: Map<any, any>;
  data: any;
}

export const State = <T>(data: T): StateType => ({
  set(newData: T) {
    if (typeof newData === "function") {
      data = newData(data as T);
    } else {
      data = newData;
    }

    if (this.effect.size === 0) {
      return;
    }
    this.effect.forEach((item: (arg0: T) => any) => item(data as T));
  },
  get(callback) {
    if (callback) {
      callback(data as T);
    }
    return data as T;
  },
  sub(id, effect) {
    this.effect.set(id, effect);
  },
  unsub(id) {
    this.effect.delete(id);
  },
  trigger() {
    if (this.effect.size === 0) {
      return;
    }
    this.effect.forEach((item: (arg0: T) => any) => item(data as T));
  },
  effect: new Map(),
  data
});
