/**
 * Type definitions for the guard system
 *
 * @module @jay-js/system/guard/types
 */

/**
 * Represents a permission entry in the guard system
 */
export type TPermission = {
	/**
	 * The role or roles that the permission applies to
	 */
	role: string | string[];

	/**
	 * The subject or subjects that the permission applies to
	 */
	subject: string | string[];

	/**
	 * The action or actions that the permission applies to
	 */
	action: string | string[];

	/**
	 * Whether the permission is granted (true) or denied (false)
	 */
	granted: boolean;

	/**
	 * Optional attributes to further restrict the permission
	 */
	attributes?: string | string[];
};

/**
 * Interface for the permission definition builder
 */
export type TDefinePermission = {
	/**
	 * Allows the specified actions on the subject
	 *
	 * @param action - The action or actions to allow
	 * @param attributes - Optional attributes to restrict the permission to
	 * @returns The permission definition object for chaining
	 */
	allow: (action: string | string[], attributes?: string[]) => TDefinePermission;

	/**
	 * Forbids the specified actions on the subject
	 *
	 * @param action - The action or actions to forbid
	 * @param attributes - Optional attributes to restrict the permission to
	 * @returns The permission definition object for chaining
	 */
	forbid: (action: string | string[], attributes?: string[]) => TDefinePermission;

	/**
	 * Saves and returns the defined permissions
	 *
	 * @returns The array of permission objects
	 */
	save: () => TPermission[];
};

/**
 * Result of a permission check
 */
export type THasPermission = {
	/**
	 * Whether the permission is granted
	 */
	granted: boolean;

	/**
	 * Available attributes for the permission, if any
	 */
	attributes?: string[];
};
