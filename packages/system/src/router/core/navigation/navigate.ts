import { routerOptions } from "../configuration";
import { getRoute } from "./get-route";

type BeforeNavigateFunction = () => boolean | Promise<boolean>;

// Store for beforeNavigate functions - functions are automatically destroyed after execution
const navigationGuards = new Set<BeforeNavigateFunction>();

/**
 * Register a function to be executed before the next navigation.
 * The navigation will only proceed if the function returns true.
 * The function is automatically removed after being executed once.
 *
 * @param {Function} guardFn - Function that returns boolean or Promise<boolean>
 * @param {Object} options - Additional options (reserved for future use)
 * @returns {Function} - Function to manually remove the guard if needed
 *
 * @example
 * // Prevent navigation if form has unsaved changes
 * beforeNavigate(() => {
 *   if (formHasUnsavedChanges()) {
 *     return confirm('You have unsaved changes. Are you sure you want to leave?');
 *   }
 *   return true;
 * });
 */
export function beforeNavigate(guardFn: BeforeNavigateFunction) {
	navigationGuards.add(guardFn);

	// Return a function to manually remove the guard if needed
	return () => {
		navigationGuards.delete(guardFn);
	};
}

/**
 * Executes all registered navigation guards.
 * Returns true if all guards pass, false otherwise.
 */
async function runNavigationGuards(): Promise<boolean> {
	// Convert to array to ensure we work with a fixed set even if guards modify the set
	const guards = Array.from(navigationGuards);

	for (const guard of guards) {
		// Remove the guard as it should only run once
		navigationGuards.delete(guard);

		try {
			// Execute the guard and await if it's a promise
			const result = guard();
			const canProceed = result instanceof Promise ? await result : result;

			if (!canProceed) {
				return false;
			}
		} catch (error) {
			console.error("Navigation guard failed:", error);
			return false;
		}
	}

	return true;
}

/**
 * Navigates to a specified path programmatically
 *
 * This function updates the browser URL and triggers route resolution without requiring a full page reload.
 * If a prefix is configured in the router options, it will be automatically applied to the path.
 *
 * Before navigation occurs, any registered beforeNavigate guards are executed.
 * The navigation will only proceed if all guards return true.
 *
 * @param {string} path - The target path to navigate to (without the prefix)
 *
 * @example
 * // Navigate to the about page
 * Navigate('/about');
 *
 * // With a configured prefix of '/app', this would navigate to '/app/about'
 */
export async function Navigate(path: string) {
	// Run navigation guards before proceeding
	const canProceed = await runNavigationGuards();
	if (!canProceed) {
		return; // Stop navigation if any guard returned false
	}

	const prefixOptions = routerOptions.prefix || "";

	if (prefixOptions) {
		path = [prefixOptions, path]
			.join("/")
			.replace(/\/+$/, "")
			.replace(/\/{2,}/g, "/");
	}

	history.pushState(null, "", path);
	getRoute();
}
