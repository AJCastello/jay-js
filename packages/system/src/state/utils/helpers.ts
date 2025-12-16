import { State } from "../core/state.js";
import { subscriberManager } from "../core/subscriber.js";
import type { ISetValue, StateType } from "../types.js";

export const REACTIVE_MARKER = Symbol("reactive");
export const SETVALUE_MARKER = Symbol("setValue");

/**
 * Creates a derived state that automatically recalculates whenever states
 * accessed within the function change
 *
 * @template T Type of derived value
 * @param fn Function that calculates the derived value
 * @returns A state that updates when any dependency changes
 */
export function Derived<T>(fn: () => T): StateType<T> {
	const derivedState = State(fn());
	Effect(() => {
		derivedState.set(fn());
	});
	return derivedState;
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
	const _set_value: ISetValue = () => {
		if (_set_value._path.length > 0) {
			let target = _set_value._object;
			for (let i = 0; i < _set_value._path.length - 1; i++) {
				if (!target[_set_value._path[i]]) {
					target[_set_value._path[i]] = {};
				}
				target = target[_set_value._path[i]];
			}
			const lastKey = _set_value._path[_set_value._path.length - 1];
			target[lastKey] = _set_value._fn();
			return;
		}
		_set_value._object = _set_value._fn();
	};
	_set_value._object = undefined;
	_set_value._path = [];
	_set_value._fn = fn;
	(_set_value as any)[SETVALUE_MARKER] = true;

	function _set_value_effect(object: any, ...path: string[]) {
		_set_value._object = object;
		_set_value._path = path;
		Effect(_set_value);
	}
	(_set_value_effect as any)[REACTIVE_MARKER] = true;
	return _set_value_effect;
}
