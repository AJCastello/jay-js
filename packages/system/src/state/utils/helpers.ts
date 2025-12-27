import { state } from "../core/state.js";
import { subscriberManager } from "../core/subscriber.js";
import type { ISetValue, TState } from "../types.js";

export const REACTIVE_MARKER = Symbol("reactive");
export const SETVALUE_MARKER = Symbol("setValue");
export const SETCHILD_MARKER = Symbol("setChildren");

/**
 * Creates a derived state that automatically recalculates whenever states
 * accessed within the function change
 *
 * @template T Type of derived value
 * @param fn Function that calculates the derived value
 * @returns A state that updates when any dependency changes
 */
export function derived<T>(fn: () => T): TState<T> {
	const derivedState = state(fn());
	effect(() => {
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
export function effect(fn: () => void) {
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
export function values(fn: () => any): (object: any, ...path: string[]) => void {
	const _set_value: ISetValue = Object.assign(() => {
		if (_set_value._path.length > 0) {
			let target = _set_value._object_ref;
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
		_set_value._object_ref = _set_value._fn(); // Isso aqui é para o caso de setar o objeto todo, Mas talvez não faça sentido
	}, {
		_object_ref: undefined,
		_path: [] as string[],
		_fn: fn,
		[SETVALUE_MARKER]: true,
	});

	return Object.assign((object: any, ...path: string[]) => {
		_set_value._object_ref = object;
		_set_value._path = path;
		effect(_set_value);
	}, {
		[REACTIVE_MARKER]: true,
	});
}

/**
 * Creates a reactive effect for updating children of a DOM node.
 * Automatically monitors state changes and triggers child updates.
 *
 * @param fn Function that generates the child elements
 * @param nodeRefId Reference identifier for the target node
 * @param setChild Callback function to execute when children need to be updated
 */
export function Childs(fn: any, nodeRefId: string, setChild: () => void):  any {
	const _set_child = Object.assign(setChild, {
		_fn: fn,
		_ref: nodeRefId,
		[SETCHILD_MARKER]: true,
	});

	effect(_set_child);
}

/**
 * Generates a unique hash identifier for a function.
 * Takes into account special markers (SETVALUE_MARKER, SETCHILD_MARKER) to create
 * unique identifiers for reactive functions with additional metadata.
 *
 * @param fn Function to generate hash for
 * @returns Hexadecimal hash string with optional suffix based on function markers
 */
export function generateFunctionHash(fn: (...args: never) => unknown, path?: string): string {
	let suffix = "";
	let _fn: (...args: never) => unknown = fn;

	if ((fn as any)[SETVALUE_MARKER]) {
		suffix = `__prop:${(fn as any)._path.join(".")}`;
		_fn = (fn as any)._fn;
	}

	if ((fn as any)[SETCHILD_MARKER]) {
		suffix = `__childref:${(fn as any)._ref}`;
		_fn = (fn as any)._fn;
	}

	suffix = path ? `${suffix}__target:${path}` : suffix

	const _fn_string = _fn.toString();
	let hash = 0;

	for (let i = 0; i < _fn_string.length; i++) {
		const char = _fn_string.charCodeAt(i);
		hash = (hash << 5) - hash + char;
		hash |= 0;
	}

	return `${Math.abs(hash).toString(16)}${suffix ? suffix : ""}`;
}