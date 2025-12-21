import type { StateType, TSetOptions } from "../types.js";
import { generateFunctionHash } from "../utils/helpers.js";
import { subscriberManager } from "./subscriber.js";

const buildPath = (segments: Array<string | symbol>): string => (segments.length ? segments.map(String).join(".") : "<root>");
const isObjectLike = (value: unknown): value is Record<string | symbol, any> => typeof value === "object" && value !== null;

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
	let _target = "";

	function runEffects(targetKey: string | null = null, targets?: string | string[]) {
		if (_effects.size === 0) {
			return;
		}

		const _ids: string[] = [];

		const subscribedIds = _effects_ids.size > 0 ? Array.from(_effects_ids) : [];

		for (let i = 0; i < subscribedIds.length; i++) {
			const id = subscribedIds[i];

			if (!id.includes("__prop:") && !id.includes("__childref:")) {
				_ids.push(id);
			}

			if (targetKey) {
				const targetSuffix = `__target:${targetKey}`;
				if (id.includes(targetSuffix)) {
					_ids.push(id);
				}
			}
		}

		if (targets) {
			if (Array.isArray(targets)) {
				_ids.push(...targets);
			} else {
				_ids.push(targets);
			}
		}

		if (_ids.length > 0) {
			for (let i = 0; i < _ids.length; i++) {
				const effect = _effects.get(_ids[i]);
				if (effect) {
					effect(_data);
				}
			}
			return;
		}

		for (const [, item] of _effects) {
			item(_data);
		}
	}

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

			if (options?.target) {
				runEffects(null, options.target);
				return;
			}

			runEffects();
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
			if (ids.length === 0) {
				runEffects(null, Array.from(_effects_ids));
				return;
			}
			runEffects(null, ids);
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
			// TODO:
			// aqui tem que identificar que se, em caso de objeto completo, saber qual caminho está sendo acessado
			// para isso, talvez seja necessário criar um proxy dinâmico para cada nível do objeto
			// que ao acessar uma propriedade, ele atualiza o _target com o caminho completo daquela propriedade
			// e depois reseta o _target para vazio após a leitura completa

			const currentSubscriber = subscriberManager.getSubscriber();
			if (currentSubscriber) {
				const hash = generateFunctionHash(currentSubscriber);
				state.sub(hash, currentSubscriber);
				_effects_ids.add(hash);
			}
			return _data;
		},

		/**
		 * Setter for state value
		 */
		set value(newData: T) {
			// TODO:
			// aqui tem que identificar que se, em caso de objeto completo, saber qual caminho está sendo acessado
			// para isso, talvez seja necessário criar um proxy dinâmico para cada nível do objeto
			// que ao acessar uma propriedade, ele atualiza o _target com o caminho completo daquela propriedade
			// e depois reseta o _target para vazio após a leitura completa
			this.set(newData);
		},
	};

	return state;
};
