import type { StateType, TSetOptions } from "../types.js";
import { generateFunctionHash, SETVALUE_MARKER } from "../utils/helpers.js";
import { subscriberManager } from "./subscriber.js";

/**
 * Creates a reactive state container that can be subscribed to for changes
 *
 * @template T Type of the state data
 * @param data Initial value of the state
 * @returns A state object with methods to manage the state
 */
export const State = <T>(data: T): StateType<T> => {
	let _data = data;
	const _effects = new Map<string, (data: T) => any>();
	const _effects_ids = new Set<string>();

	const TARGET_SUFFIX = "__target:";

	const isObjectLike = (value: unknown): value is Record<PropertyKey, unknown> =>
		typeof value === "object" && value !== null;

	const notifyAll = (): void => {
		if (_effects.size === 0) {
			return;
		}
		const visited = new Set<(data: T) => any>();
		for (const [, effect] of _effects) {
			if (visited.has(effect)) {
				continue;
			}
			visited.add(effect);
			effect(_data);
		}
	};

	const notifyTargetKey = (key: string): void => {
		if (_effects.size === 0) {
			return;
		}
		const suffix = `${TARGET_SUFFIX}${key}`;
		for (const [id, effect] of _effects) {
			if (id.endsWith(suffix)) {
				effect(_data);
			}
		}
	};

	// A stable proxy for object-like state values.
	// It forwards property reads/writes to the current `_data` reference.
	const objectValueProxy = new Proxy({} as Record<PropertyKey, unknown>, {
		get(_target, prop: PropertyKey, receiver) {
			// Allow some runtime introspection without tracking
			if (prop === Symbol.toStringTag) {
				return "StateValueProxy";
			}

			if (!isObjectLike(_data)) {
				return undefined;
			}

			const currentSubscriber = subscriberManager.getSubscriber();
			if (currentSubscriber && typeof prop !== "symbol") {
				const hash = generateFunctionHash(currentSubscriber);
				state.sub(`${hash}${TARGET_SUFFIX}${String(prop)}`, currentSubscriber);
				_effects_ids.add(`${hash}${TARGET_SUFFIX}${String(prop)}`);
			}

			return Reflect.get(_data as any, prop);
		},

		set(_target, prop: PropertyKey, value: unknown, receiver) {
			if (!isObjectLike(_data)) {
				return false;
			}

			const key = typeof prop === "symbol" ? undefined : String(prop);
			const currentValue = Reflect.get(_data as any, prop);
			if (Object.is(currentValue, value)) {
				return true;
			}

			const didSet = Reflect.set(_data as any, prop, value);
			if (!didSet) {
				return false;
			}

			if (key) {
				notifyTargetKey(key);
			}
			return true;
		},

		has(_target, prop: PropertyKey) {
			if (!isObjectLike(_data)) {
				return false;
			}
			return Reflect.has(_data as any, prop);
		},

		ownKeys() {
			if (!isObjectLike(_data)) {
				return [];
			}
			return Reflect.ownKeys(_data as any);
		},

		getOwnPropertyDescriptor(_target, prop: PropertyKey) {
			if (!isObjectLike(_data)) {
				return undefined;
			}
			const desc = Reflect.getOwnPropertyDescriptor(_data as any, prop);
			if (!desc) {
				return undefined;
			}
			// Ensure properties are configurable on the proxy view
			return { ...desc, configurable: true };
		},
	});

	const state: StateType<T> = {
		/**
		 * Sets a new value for the state and notifies subscribers
		 *
		 * @param newData New data value or function that receives the current state and returns new state
		 * @param options Configuration options for the update operation
		 */
		set: (newData: T | ((currentState: T) => T), options?: TSetOptions): void => {
			let newValue: T;

			if (typeof newData === "function") {
				newValue = (newData as (currentState: T) => T)(_data);
			} else {
				newValue = newData;
			}

			if (Object.is(newValue, _data)) {
				return;
			}

			_data = newValue;

			if (options?.silent) {
				return;
			}

			if (_effects.size === 0) {
				return;
			}

			if (options?.target) {
				if (Array.isArray(options.target)) {
					for (const item of options.target) {
						const effect = _effects.get(item);
						if (effect) {
							effect(_data);
						}
					}
					return;
				}

				const effect = _effects.get(options.target);
				if (effect) {
					effect(_data);
				}
				return;
			}

			notifyAll();
		},

		/**
		 * Gets the current value of the state
		 *
		 * @param callback Optional callback function that receives the current state value
		 * @returns The current state value
		 */
		get: (callback?: (data: T) => void): T => {
			if (callback) {
				callback(_data);
			}
			return _data;
		},

		/**
		 * Subscribes to state changes with a specific ID
		 *
		 * @param id Unique identifier for this subscription
		 * @param effect Callback function to be called when state changes
		 * @param run Whether to immediately run the effect with current state
		 * @returns Result of the effect if run is true
		 */
		sub: (id: string, effect: (data: T) => any, run = false): any => {
			_effects.set(id, effect);
			_effects_ids.add(id);
			if (run) {
				return effect(_data);
			}
		},

		/**
		 * Unsubscribes from state changes by ID
		 *
		 * @param id ID of the subscription to remove
		 */
		unsub: (id: string) => {
			_effects.delete(id);
			_effects_ids.delete(id);
		},

		/**
		 * Manually triggers notifications to subscribers
		 *
		 * @param ids Specific subscriber IDs to trigger, if none provided all subscribers will be notified
		 */
		trigger: (...ids: string[]): void => {
			if (_effects.size === 0) {
				return;
			}

			if (ids.length > 0) {
				for (let i = 0; i < ids.length; i++) {
					const effect = _effects.get(ids[i]);
					if (effect) {
						effect(_data);
					}
				}
				return;
			}

			for (const [, item] of _effects) {
				item(_data);
			}
		},

		/**
		 * Clears all subscriptions and optionally sets a new value
		 *
		 * @param newData Optional new value for the state
		 */
		clear: (newData?: T | ((currentState: T) => T)): void => {
			if (typeof newData === "function") {
				_data = (newData as (currentState: T) => T)(_data);
			} else if (newData !== undefined) {
				_data = newData;
			} else {
				_data = undefined as unknown as T;
			}

			_effects.clear();
			_effects_ids.clear();
		},

		/**
		 * Getter for state value that automatically registers the current subscriber
		 */
		get value() {
			const currentSubscriber = subscriberManager.getSubscriber();
			if (currentSubscriber) {
				const hash = generateFunctionHash(currentSubscriber);
				state.sub(hash, currentSubscriber);
				_effects_ids.add(hash);
			}
			if (isObjectLike(_data)) {
				return objectValueProxy as unknown as T;
			}
			return _data;
		},

		/**
		 * Setter for state value
		 */
		set value(newData: T) {
			this.set(newData);
		},
	};

	return state;
};
