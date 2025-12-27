import type { TState, TSetOptions } from "../types.js";
import { generateFunctionHash, SETCHILD_MARKER, SETVALUE_MARKER } from "../utils/helpers.js";
import { subscriberManager } from "./subscriber.js";

const buildPath = (segments: Array<string | symbol>): string => (segments.length ? segments.map(String).join(".") : "<root>");
const isObjectLike = (value: unknown): value is Record<string | symbol, any> => typeof value === "object" && value !== null;
const VALID_SUBSCRIPTION_ID = /^[a-zA-Z0-9_:<>.()\-]+$/;

/**
 * Creates a reactive state container that can be subscribed to for changes
 *
 * @template T Type of the state data
 * @param data Initial value of the state
 * @returns A state object with methods to manage the state
 */
export const state = <T>(data: T): TState<T> => {
	let _data = data;
	const _effects = new Map<string, (data: T) => any>();
	const _effects_ids = new Set<string>();

	const _effects_by_target = new Map<string, Set<string>>();
	const _effects_global = new Set<string>();

	const _proxy_cache = new WeakMap<object, Map<string, any>>();

	function isStructuralMutation(target: object, prop: string | symbol, hadKey: boolean): boolean {
		if (Array.isArray(target)) {
			if (prop === "length") {
				return true;
			}
			if (typeof prop === "string") {
				// Numeric index: setting an existing slot is not structural.
				// Adding/removing (new index) is structural.
				if (/^(0|[1-9]\d*)$/.test(prop)) {
					return !hadKey;
				}
			}
			return !hadKey;
		}

		// Para objetos: adicionar/remover propriedade NÃO é estrutural
		// (apenas notifica quem acessa essa propriedade específica)
		return false;
	}

	function subscribeEffect(path?: string) {

		const currentSubscriber = subscriberManager.getSubscriber();
		if (!currentSubscriber) {
			return;
		}

		const hash = generateFunctionHash(currentSubscriber, path);
		state.sub(hash, Object.assign(currentSubscriber, { _target: path }));
		_effects_ids.add(hash);
	}

	function getProxyForPath(value: unknown, pathSegments: Array<string | symbol>): any {
		if (!isObjectLike(value)) {
			return value;
		}

		const targetObj = value as object;
		const path = buildPath(pathSegments);
		let byPath = _proxy_cache.get(targetObj);
		if (!byPath) {
			byPath = new Map<string, any>();
			_proxy_cache.set(targetObj, byPath);
		}
		const existing = byPath.get(path);
		if (existing) {
			return existing;
		}

		const proxy = new Proxy(value as any, {
			get(target, prop, receiver) {
				// Always allow common symbol-based introspection without tracking noise.
				if (
					prop === Symbol.toStringTag ||
					prop === Symbol.toPrimitive ||
					prop === Symbol.iterator
				) {
					return Reflect.get(target, prop, receiver);
				}

				const nextPathSegments = pathSegments.concat(prop);
				const res = Reflect.get(target, prop, receiver);

				if (isObjectLike(res)) {
					return getProxyForPath(res, nextPathSegments)
				}
				subscribeEffect(buildPath(nextPathSegments));
				return res;
			},

			set(target, prop, newValue, receiver) {
				if (prop === "__proto__" || prop === "constructor" || prop === "prototype") {
					return false;
				}

				const hadKey = Reflect.has(target, prop);
				const prev = Reflect.get(target, prop, receiver);
				if (Object.is(prev, newValue)) {
					return true;
				}

				const ok = Reflect.set(target, prop, newValue, receiver);
				if (!ok) {
					return false;
				}

				const nextPathSegments = pathSegments.concat(prop);
				const changedPath = buildPath(nextPathSegments);
				const structural = isStructuralMutation(target, prop, hadKey);

				// Prefer targeted invalidation; for structural mutations be conservative.
				if (structural) {
					runEffects(null, _effects_ids);
				} else {
					runEffects(changedPath);
				}

				return true;
			},

			deleteProperty(target, prop) {
				if (prop === "__proto__" || prop === "constructor" || prop === "prototype") {
					return false;
				}

				const hadKey = Reflect.has(target, prop);
				const ok = Reflect.deleteProperty(target, prop);
				if (!ok) {
					return false;
				}

				if (!hadKey) {
					return true;
				}

				const nextPathSegments = pathSegments.concat(prop);
				const changedPath = buildPath(nextPathSegments);
				const structural = isStructuralMutation(target, prop, hadKey);

				if (structural) {
					runEffects(null, _effects_ids);
				} else {
					runEffects(changedPath);
				}

				return true;
			},
		});

		byPath.set(path, proxy);
		subscribeEffect(path);
		return proxy;
	}

	function runEffects(targetKey: string | null = null, targets?: string | string[] | Set<string>, includeGlobal: boolean = true) {
		if (_effects.size === 0) {
			return;
		}

		const effectsToRun = new Set<string>();

		if (targetKey) {
			const targetedEffects = _effects_by_target.get(targetKey);
			if (targetedEffects) {
				for (const id of targetedEffects) {
					effectsToRun.add(id);
				}
			}
		}

		if (includeGlobal) {
			for (const id of _effects_global) {
				effectsToRun.add(id);
			}
		}

		if (targets) {
			if (targets instanceof Set) {
				for (const id of targets) {
					effectsToRun.add(id);
				}
			} else {
				const targetArray = Array.isArray(targets) ? targets : [targets];
				for (const target of targetArray) {
					effectsToRun.add(target);
				}
			}
		}

		if (effectsToRun.size === 0 && !targetKey && !targets) {
			for (const [id] of _effects) {
				effectsToRun.add(id);
			}
		}

		const executedFunctions = new Set<Function>();

		for (const id of effectsToRun) {
			const effect = _effects.get(id);
			if (effect && !executedFunctions.has(effect)) {
				executedFunctions.add(effect);
				effect(_data);
			}
		}
	}

	const state: TState<T> = {
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
				runEffects(null, options.target, false);
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
			if (!id || typeof id !== "string") {
				throw new TypeError("Subscription ID must be a non-empty string");
			}

			if (!VALID_SUBSCRIPTION_ID.test(id)) {
				throw new Error(
					`Invalid subscription ID: "${id}". Only alphanumeric characters, underscore, and hyphen are allowed.`
				);
			}

			if (typeof effect !== "function") {
				throw new TypeError("Effect must be a function");
			}

			_effects.set(id, effect);
			_effects_ids.add(id);

			const target = (effect as any)._target;

			if (target) {
				if (!_effects_by_target.has(target)) {
					_effects_by_target.set(target, new Set());
				}
				_effects_by_target.get(target)!.add(id);
			} else if (
				!(effect as any)[SETVALUE_MARKER] &&
				!(effect as any)[SETCHILD_MARKER]
			) {
				_effects_global.add(id);
			}

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
			const effect = _effects.get(id);
			if (!effect) return;

			_effects.delete(id);
			_effects_ids.delete(id);
			_effects_global.delete(id);

			const target = (effect as any)._target;
			if (target) {
				const targetSet = _effects_by_target.get(target);
				if (targetSet) {
					targetSet.delete(id);
					if (targetSet.size === 0) {
						_effects_by_target.delete(target);
					}
				}
			}
		},

		/**
		 * Manually triggers notifications to subscribers
		 *
		 * @param ids Specific subscriber IDs to trigger, if none provided all subscribers will be notified
		 */
		trigger: (...ids: string[]): void => {
			if (ids.length === 0) {
				runEffects(null, _effects_ids);
				return;
			}
			runEffects(null, ids, false);
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
			_effects_by_target.clear();
			_effects_global.clear();
		},

		/**
		 * Getter for state value that automatically registers the current subscriber
		 */
		get value() {
			// Para objetos/arrays, retorna um Proxy que registra a propriedade acessada
			// e dispara invalidação por caminho (keyed-tracking).
			if (isObjectLike(_data)) {
				return getProxyForPath(_data, []);
			}

			subscribeEffect();
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
