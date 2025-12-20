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

			// Update the current data
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

			for (const [_, effect] of _effects) {
				effect(_data);
			}
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
			return this.get();
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
