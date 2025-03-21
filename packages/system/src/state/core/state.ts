import type { StateType, setOptions } from "../types.js";
import { subscriberManager } from "./subscriber.js";

/**
 * Creates a reactive state container that can be subscribed to for changes
 *
 * @template T Type of the state data
 * @param data Initial value of the state
 * @returns A state object with methods to manage the state
 */
export const State = <T>(data: T): StateType<T> => {
	const state: StateType<T> = {
		/**
		 * Sets a new value for the state and notifies subscribers
		 *
		 * @param newData New data value or function that receives the current state and returns new state
		 * @param options Configuration options for the update operation
		 */
		set: (newData: T | ((currentState: T) => T), options?: setOptions): void => {
			let newValue: T;

			if (typeof newData === "function") {
				newValue = (newData as (currentState: T) => T)(data);
			} else {
				newValue = newData;
			}

				// Update the current data
			data = newValue;

			if (options?.silent) {
				return;
			}

			if (state.effects.size === 0) {
				return;
			}

			if (options?.target) {
				if (Array.isArray(options.target)) {
					for (const item of options.target) {
						const effect = state.effects.get(item);
						if (effect) {
							effect(data);
						}
					}
					return;
				}

				const effect = state.effects.get(options.target);
				if (effect) {
					effect(data);
				}
				return;
			}

			for (const [_, effect] of state.effects) {
				effect(data);
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
				callback(data);
			}
			return data;
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
			state.effects.set(id, effect);
			if (run) {
				return effect(data);
			}
		},

		/**
		 * Unsubscribes from state changes by ID
		 *
		 * @param id ID of the subscription to remove
		 */
		unsub: (id: string) => {
			state.effects.delete(id);
		},

		/**
		 * Manually triggers notifications to subscribers
		 *
		 * @param ids Specific subscriber IDs to trigger, if none provided all subscribers will be notified
		 */
		trigger: (...ids: string[]): void => {
			if (state.effects.size === 0) {
				return;
			}

			if (ids.length > 0) {
				for (let i = 0; i < ids.length; i++) {
					const effect = state.effects.get(ids[i]);
					if (effect) {
						effect(data);
					}
				}
				return;
			}

			for (const [, item] of state.effects) {
				item(data);
			}
		},

		/**
		 * Clears all subscriptions and optionally sets a new value
		 *
		 * @param newData Optional new value for the state
		 */
		clear: (newData?: T | ((currentState: T) => T)): void => {
			if (typeof newData === "function") {
				data = (newData as (currentState: T) => T)(data);
			} else if (newData !== undefined) {
				data = newData;
			} else {
				data = undefined as unknown as T;
			}

			state.effects.clear();
		},

		/**
		 * Map of all registered effect callbacks
		 */
		effects: new Map(),

		/**
		 * Getter for state value that automatically registers the current subscriber
		 */
		get value() {
			const currentSubscriber = subscriberManager.getSubscriber();
			if (currentSubscriber) {
				let hash: string;

				// Check if it's a setValue (from Values function)
				if (currentSubscriber.name.includes("_setValue") && (currentSubscriber as any)._fn) {
					hash = subscriberManager.generateFunctionHash((currentSubscriber as any)._fn);
				} else {
					hash = subscriberManager.generateFunctionHash(currentSubscriber);
				}

				state.sub(hash, currentSubscriber);
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
