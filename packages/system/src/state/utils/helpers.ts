import { State } from "../core/state.js";
import { ISetValue, StateType } from "../types.js";
import { subscriberManager } from "../core/subscriber.js";

/**
 * Creates a persistent state that saves values to localStorage
 * 
 * @template T Type of the state data
 * @param key Key for storage in localStorage
 * @param defaultValue Default value when no data is saved
 * @returns A state object that persists changes to localStorage
 */
export function PersistentState<T>(
  key: string,
  defaultValue: T
): StateType<T> {
  // Try to retrieve value from localStorage
  let initialValue: T;
  try {
    const savedValue = localStorage.getItem(key);
    initialValue = savedValue ? JSON.parse(savedValue) : defaultValue;
  } catch (error) {
    initialValue = defaultValue;
  }

  const state = State<T>(initialValue);
  const originalSet = state.set;
  state.set = (newData, options) => {
    originalSet(newData, options);
    try {
      localStorage.setItem(key, JSON.stringify(state.get()));
    } catch (error) {
      console.error(`Error saving state to localStorage: ${error}`);
    }
  };

  return state;
}

/**
 * Combines multiple states into a single object
 * 
 * @template T Record type containing state types
 * @param states Object with states to be combined
 * @returns A new state that keeps the combined values updated
 */
export function CombineStates<T extends Record<string, any>>(
  states: { [K in keyof T]: StateType<T[K]> }
): StateType<T> {
  // Gets initial values from each state
  const initialValue = Object.entries(states).reduce(
    (acc, [key, state]) => {
      acc[key] = state.get();
      return acc;
    }, 
    {} as Record<string, any>
  ) as T;

  const combinedState = State<T>(initialValue);

  // Subscribe to each state to update the combined value
  Object.entries(states).forEach(([key, state]) => {
    state.sub(`combined_${key}`, (newValue: T[typeof key]) => {
      combinedState.set((current) => ({
        ...current,
        [key]: newValue
      }));
    });
  });

  return combinedState;
}

/**
 * Creates a derived state that depends on another state
 * 
 * @template T Type of source state
 * @template U Type of derived state
 * @param sourceState Source state
 * @param transform Function that transforms source state value
 * @returns A derived state that updates when source state changes
 */
export function DerivedState<T, U>(
  sourceState: StateType<T>,
  transform: (value: T) => U
): StateType<U> {
  // Create derived state with initial transformed value
  const derivedState = State<U>(transform(sourceState.get()));
  
  // Subscribe to source state to update the derived state
  sourceState.sub("derived_state", (value) => {
    derivedState.set(transform(value));
  });
  
  return derivedState;
}

/**
 * Creates a derived state that automatically recalculates whenever states 
 * accessed within the function change
 * 
 * @template T Type of derived value
 * @param fn Function that calculates the derived value
 * @returns A state that updates when any dependency changes
 */
export function Derived<T>(fn: () => T): StateType<T> {
  const value = State(fn());
  Effect(() => {
    value.set(fn());
  });
  return value;
}

/**
 * Executes a function and automatically monitors any state access
 * to create a reactive effect. The function will be executed again when
 * any accessed state changes.
 * 
 * @param fn Function to be executed as an effect
 */
export function Effect(fn: () => void) {
  subscriberManager.setSubscriber(fn);
  fn();
  subscriberManager.clearSubscriber();
}

/**
 * Creates a helper for setting values in objects reactively.
 * When a state is accessed within the function, a subscription is automatically
 * created to update the value when the state changes.
 * 
 * @param fn Function that returns the value to be set
 * @returns Function for setting values in objects
 */
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
    subscriberManager.setSubscriber(_setValue);
    await _setValue();
    subscriberManager.clearSubscriber();
  }
  return _set_value_effect;
}