import type { TInflightRequest, TQueryKey } from "./types.js";

/**
 * In-flight requests map for deduplication
 */
const inflightRequests = new Map<string, TInflightRequest<any>>();

/**
 * Execute fetch with deduplication
 * If same key is already fetching, return existing promise
 *
 * @param key Query key
 * @param fetcher Function to fetch data
 * @param onFinally Callback to run when fetch completes
 * @returns Promise with fetched data
 */
export async function executeFetch<TData>(
	key: string,
	fetcher: (signal: AbortSignal) => Promise<TData>,
	onFinally?: () => void,
): Promise<TData> {
	const existing = inflightRequests.get(key);

	if (existing) {
		return existing.promise;
	}

	const controller = new AbortController();

	const promise = fetcher(controller.signal).finally(() => {
		inflightRequests.delete(key);
		onFinally?.();
	});

	inflightRequests.set(key, { promise, controller });

	return promise;
}

/**
 * Cancel in-flight request for a key
 *
 * @param key Query key
 */
export function cancelFetch(key: string): void {
	const inflight = inflightRequests.get(key);

	if (inflight) {
		inflight.controller.abort();
		inflightRequests.delete(key);
	}
}

/**
 * Execute fetch with retry logic
 *
 * @param fetcher Function to fetch data
 * @param retry Number of retries or boolean
 * @param retryDelay Delay between retries in ms or function
 * @param signal AbortSignal to cancel request
 * @returns Promise with fetched data
 */
export async function executeWithRetry<TData>(
	fetcher: (signal: AbortSignal) => Promise<TData>,
	retry: number | boolean,
	retryDelay: number | ((attempt: number) => number),
	signal: AbortSignal,
): Promise<TData> {
	const maxAttempts = typeof retry === "boolean" ? (retry ? 3 : 0) : retry;
	let attempt = 0;
	let lastError: Error = new Error("Unknown error");

	while (attempt <= maxAttempts) {
		try {
			return await fetcher(signal);
		} catch (error) {
			lastError = error as Error;
			attempt++;

			if (signal.aborted) {
				throw new Error("Request aborted");
			}

			if (attempt > maxAttempts) {
				break;
			}

			const delay = typeof retryDelay === "function" ? retryDelay(attempt) : retryDelay;

			await sleep(delay);
		}
	}

	throw lastError;
}

/**
 * Default retry delay with exponential backoff
 *
 * @param attempt Current attempt number
 * @returns Delay in milliseconds
 */
export function defaultRetryDelay(attempt: number): number {
	return Math.min(1000 * 2 ** attempt, 30000);
}

/**
 * Sleep utility
 *
 * @param ms Milliseconds to sleep
 * @returns Promise that resolves after delay
 */
function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Setup window focus refetch listener
 *
 * @param callback Function to call when window gains focus
 * @returns Cleanup function to remove listener
 */
export function setupFocusRefetch(callback: () => void): () => void {
	const handler = () => {
		if (document.visibilityState === "visible") {
			callback();
		}
	};

	document.addEventListener("visibilitychange", handler);

	return () => {
		document.removeEventListener("visibilitychange", handler);
	};
}

/**
 * Setup reconnect refetch listener
 *
 * @param callback Function to call when network reconnects
 * @returns Cleanup function to remove listener
 */
export function setupReconnectRefetch(callback: () => void): () => void {
	const handler = () => callback();

	window.addEventListener("online", handler);

	return () => {
		window.removeEventListener("online", handler);
	};
}

/**
 * Resolve query key (static or reactive)
 *
 * @param key Query key
 * @returns Resolved string key
 */
export function resolveQueryKey(key: TQueryKey): string {
	return typeof key === "function" ? key() : key;
}
