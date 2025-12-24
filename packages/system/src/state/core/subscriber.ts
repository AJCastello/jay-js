/**
 * Subscriber manager for the state system
 * Isolates the logic of managing the current subscriber and avoids using global variables
 */
class SubscriberManager {
	// The current active subscriber
	private _current: ((args?: any) => void | Promise<void>) | null = null;

	/**
	 * Sets the current subscriber
	 * @param subscriber Function to be set as the current subscriber
	 */
	setSubscriber(subscriber: ((args?: any) => void | Promise<void>) | null): void {
		this._current = subscriber;
	}

	/**
	 * Gets the current subscriber
	 * @returns The current subscriber or null if none exists
	 */
	getSubscriber(): ((args?: any) => void | Promise<void>) | null {
		return this._current;
	}

	/**
	 * Checks if there is an active subscriber
	 * @returns true if there is an active subscriber, false otherwise
	 */
	hasSubscriber(): boolean {
		return this._current !== null;
	}

	/**
	 * Clears the current subscriber
	 */
	clearSubscriber(): void {
		this._current = null;
	}

}

// Exports a single instance of the manager to be shared across the application
export const subscriberManager = new SubscriberManager();
