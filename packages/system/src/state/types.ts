/**
 * Options for the set operation on a state
 */
export type TSetOptions = {
	/**
	 * When true, subscribers will not be notified of the change
	 */
	silent?: boolean;

	/**
	 * Specific subscriber(s) to notify about the change
	 */
	target?: string | Array<string>;
};

/**
 * Reactive state interface
 */
export type TState<T> = {
	/**
	 * Sets a new value for the state
	 * @param newData New value or function that returns a new value based on current state
	 * @param options Configuration options for the update operation
	 */
	set: (newData: T | ((currentState: T) => T), options?: TSetOptions) => void;

	/**
	 * Gets the current state value
	 * @param callback Optional function to run with the current value
	 * @returns Current state value
	 */
	get: (callback?: (value: T) => void) => T;

	/**
	 * Subscribes to state changes
	 * @param id Unique identifier for this subscription
	 * @param effect Function to call when state changes
	 * @param run Whether to immediately run the effect with current state
	 */
	sub: (id: string, effect: (value: T) => void, run?: boolean) => void;

	/**
	 * Unsubscribes from state changes
	 * @param id ID of the subscription to remove
	 */
	unsub: (id: string) => void;

	/**
	 * Manually triggers subscribers
	 * @param ids Specific subscriber IDs to trigger, if none provided all subscribers will be notified
	 */
	trigger: (...ids: string[]) => void;

	/**
	 * Clears all subscriptions and optionally sets new value
	 * @param newData Optional new value for the state
	 */
	clear: (newData?: T | ((currentState: T) => T)) => void;

	/**
	 * Map of registered effect callbacks
	 */
	effects: Map<string, (value: T) => void>;

	/**
	 * Accessor property for the state value
	 */
	value: T;
};

export type StateType<T> = TState<T>;

/**
 * Interface for setValue function used by Values helper
 */
export interface ISetValue extends Function {
	(): void;
	_object: any;
	_path: string[];
	_fn: () => any;
}
