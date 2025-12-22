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

		const hash = generateFunctionHash(currentSubscriber);
		const id = path ? `${hash}__target:${path}` : hash;
		state.sub(id, currentSubscriber);
		_effects_ids.add(id);
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
				const hadKey = Reflect.has(target, prop);
				const prev = Reflect.get(target, prop, receiver);
				console.log("🔥🔥🔥🔥", Array.from(_effects_ids));
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
					runEffects(null, Array.from(_effects_ids));
				} else {
					runEffects(changedPath);
				}

				return true;
			},

			deleteProperty(target, prop) {
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
					runEffects(null, Array.from(_effects_ids));
				} else {
					runEffects(changedPath);
				}

				return true;
			},
		});

		byPath.set(path, proxy);
		return proxy;
	}

	function runEffects(targetKey: string | null = null, targets?: string | string[]) {
		if (_effects.size === 0) {
			return;
		}

		const _ids = new Set<string>();

		const subscribedIds = _effects_ids.size > 0 ? Array.from(_effects_ids) : [];

		for (let i = 0; i < subscribedIds.length; i++) {
			const id = subscribedIds[i];

			if (!id.includes("__prop:") && !id.includes("__childref:")) {
				_ids.add(id);
			}

			if (targetKey) {
				const targetSuffix = `__target:${targetKey}`;
				if (id.includes(targetSuffix)) {
					_ids.add(id);
				}
			}
		}

		if (targets) {
			if (Array.isArray(targets)) {
				for (const target of targets) {
					_ids.add(target);
				}
			} else {
				_ids.add(targets);
			}
		}

		if (_ids.size > 0) {
			const ids = Array.from(_ids);
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
