import type { TState } from "../types.js";

export interface ISubscriptionRecord {
	subscriptionId: string;
	state: TState<any>;
	cleanupFn: () => void;
}

class SubscriptionRegistry {
	private subscriptionsByElement = new WeakMap<HTMLElement, Set<ISubscriptionRecord>>();
	private elementBySubscriptionId = new Map<string, WeakRef<HTMLElement>>();

	registerSubscription(element: HTMLElement, subscriptionId: string, state: TState<any>, cleanupFn: () => void): void {
		const record: ISubscriptionRecord = {
			subscriptionId,
			state,
			cleanupFn,
		};

		if (!this.subscriptionsByElement.has(element)) {
			this.subscriptionsByElement.set(element, new Set());
		}

		const subscriptions = this.subscriptionsByElement.get(element);
		if (subscriptions) {
			subscriptions.add(record);
		}

		this.elementBySubscriptionId.set(subscriptionId, new WeakRef(element));
	}

	cleanupElement(element: HTMLElement): void {
		const subscriptions = this.subscriptionsByElement.get(element);

		if (!subscriptions) {
			return;
		}

		for (const record of subscriptions) {
			try {
				record.cleanupFn();
			} catch (error) {
				console.error("JayJS: Error cleaning up subscription:", error);
			}

			this.elementBySubscriptionId.delete(record.subscriptionId);
		}

		this.subscriptionsByElement.delete(element);
	}

	getSubscriptionCount(element: HTMLElement): number {
		const subscriptions = this.subscriptionsByElement.get(element);
		return subscriptions ? subscriptions.size : 0;
	}

	hasSubscriptions(element: HTMLElement): boolean {
		return this.subscriptionsByElement.has(element);
	}

	cleanupSubscription(subscriptionId: string): void {
		const elementRef = this.elementBySubscriptionId.get(subscriptionId);

		if (!elementRef) {
			return;
		}

		const element = elementRef.deref();

		if (!element) {
			this.elementBySubscriptionId.delete(subscriptionId);
			return;
		}

		const subscriptions = this.subscriptionsByElement.get(element);

		if (!subscriptions) {
			return;
		}

		for (const record of subscriptions) {
			if (record.subscriptionId === subscriptionId) {
				try {
					record.cleanupFn();
				} catch (error) {
					console.error("JayJS: Error cleaning up subscription:", error);
				}

				subscriptions.delete(record);
				this.elementBySubscriptionId.delete(subscriptionId);
				break;
			}
		}

		if (subscriptions.size === 0) {
			this.subscriptionsByElement.delete(element);
		}
	}
}

export const subscriptionRegistry = new SubscriptionRegistry();
