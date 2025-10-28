import {
	addConfigChangeListener,
	lazyOptions,
	moduleCache,
	removeConfigChangeListener,
} from "../core/configuration.js";
import type { TLazyOptions } from "../types.js";

/**
 * Singleton class responsible for managing the lifecycle of lazy-loaded modules.
 * Implements garbage collection and idle detection to optimize memory usage.
 *
 * Features:
 * - Automatic garbage collection of unused modules
 * - Idle detection to pause collection when app is inactive
 * - Dynamic configuration through lazyOptions
 */
export class ModuleCollector {
	private static instance: ModuleCollector | null = null;
	private collectorInterval: ReturnType<typeof setInterval> | null = null;
	private idleTime = 0;
	private idleOptions = {
		passive: true,
		capture: true,
	};

	private constructor() {
		this.setupEventListeners();
		this.startCollector();
		this.setupIdleMonitor();
		addConfigChangeListener(this.handleConfigChange.bind(this));
	}

	/**
	 * Returns the singleton instance of ModuleCollector.
	 * Creates a new instance if one doesn't exist.
	 *
	 * @returns {ModuleCollector} The singleton collector instance
	 */
	public static getInstance(): ModuleCollector {
		if (!ModuleCollector.instance) {
			ModuleCollector.instance = new ModuleCollector();
		}
		return ModuleCollector.instance;
	}

	/**
	 * Handles changes in lazy loading configuration.
	 * Restarts the collector with new settings if running.
	 *
	 * @param {TLazyOptions} options - New configuration options
	 * @private
	 */
	private handleConfigChange(_options: TLazyOptions): void {
		if (this.collectorInterval) {
			clearInterval(this.collectorInterval);
			this.startCollector();
		}
	}

	/**
	 * Sets up event listeners for mousemove and keypress events
	 * to detect user activity.
	 *
	 * @private
	 */
	private setupEventListeners(): void {
		window.addEventListener("mousemove", this.resetIdle.bind(this), this.idleOptions);
		window.addEventListener("keypress", this.resetIdle.bind(this), this.idleOptions);
	}

	/**
	 * Resets the idle timer and restarts collection if stopped.
	 * Called when user activity is detected.
	 *
	 * @private
	 */
	private resetIdle(): void {
		this.idleTime = 0;
		if (!this.collectorInterval) {
			this.startCollector();
		}
	}

	/**
	 * Starts the garbage collection interval.
	 * Uses gcInterval from lazyOptions for timing.
	 *
	 * @private
	 */
	private startCollector(): void {
		this.collectorInterval = setInterval(this.runCollector.bind(this), lazyOptions.gcInterval || 60000);
	}

	/**
	 * Runs a garbage collection cycle.
	 * - Increments usage counters for all modules
	 * - Removes modules that exceed gcThreshold
	 * - Manages collection pausing during idle periods
	 *
	 * @private
	 */
	private runCollector(): void {
		const toRemove = [];
		const gcThreshold = lazyOptions.gcThreshold ? lazyOptions.gcThreshold / 60000 : 5;

		for (const [key, module] of moduleCache) {
			if (module.lastUsed > gcThreshold && module.collect) {
				toRemove.push({ key, module });
			} else {
				module.lastUsed++;
			}
		}

		for (const { key, module } of toRemove) {
			moduleCache.delete(key);
			module.lastUsed = 0;
			module.collect = false;
		}

		if (toRemove.length > 0) {
			console.log(
				"Garbage collector removed modules:",
				toRemove.map((item) => item.key),
			);
		}

		this.idleTime++;
		if (this.idleTime > 6) {
			if (this.collectorInterval) {
				clearInterval(this.collectorInterval);
				this.collectorInterval = null;
			}

			for (const [_, module] of moduleCache) {
				module.lastUsed = 0;
			}
		}
	}

	/**
	 * Sets up the idle monitoring interval.
	 * Resets module usage counters during extended idle periods.
	 *
	 * @private
	 */
	private setupIdleMonitor(): void {
		setInterval(() => {
			this.idleTime++;
			if (this.idleTime > 3) {
				for (const [_, module] of moduleCache) {
					module.lastUsed = 0;
				}
			}
		}, 60000);
	}

	/**
	 * Disposes of the collector instance.
	 * Cleans up event listeners and intervals.
	 */
	public dispose(): void {
		if (this.collectorInterval) {
			clearInterval(this.collectorInterval);
			this.collectorInterval = null;
		}
		window.removeEventListener("mousemove", this.resetIdle.bind(this), this.idleOptions);
		window.removeEventListener("keypress", this.resetIdle.bind(this), this.idleOptions);
		removeConfigChangeListener(this.handleConfigChange.bind(this));
		ModuleCollector.instance = null;
	}
}

ModuleCollector.getInstance();
