/**
 * Permission definition functionality
 *
 * Provides utilities for defining permissions in a structured way.
 *
 * @module @jay-js/system/guard/core/define
 */

import type { TDefinePermission, TPermission } from "../types";

/**
 * Defines permissions for a role and subject
 *
 * @param role - The role or roles that the permissions apply to
 * @param subject - The subject that the permissions apply to
 * @returns A permission definition object with methods to allow or forbid actions
 *
 * @example
 * ```ts
 * const userPermissions = definePermissions('user', 'articles')
 *   .allow(['read', 'comment'])
 *   .forbid(['edit', 'delete'])
 *   .save();
 * ```
 */
export function definePermissions(role: string | string[], subject: string): TDefinePermission {
	const permissionsData: TPermission[] = [];

	/**
	 * Creates a permission entry and adds it to the permissions data
	 */
	function create_permission(
		action: string | string[],
		granted: boolean,
		subject: string | string[],
		attributes?: string | string[],
	) {
		const permission: TPermission = {
			role: Array.isArray(role) ? role : [role],
			action: Array.isArray(action) ? action : [action],
			subject: Array.isArray(subject) ? subject : [subject],
			granted,
		};

		if (attributes) {
			permission.attributes = attributes;
		}

		permissionsData.push(permission);
	}

	return {
		/**
		 * Allows the specified actions on the subject
		 *
		 * @param action - The action or actions to allow
		 * @param attributes - Optional attributes to restrict the permission to
		 * @returns The permission definition object for chaining
		 */
		allow(action: string | string[], attributes?: string[]) {
			create_permission(action, true, subject, attributes);
			return this;
		},

		/**
		 * Forbids the specified actions on the subject
		 *
		 * @param action - The action or actions to forbid
		 * @param attributes - Optional attributes to restrict the permission to
		 * @returns The permission definition object for chaining
		 */
		forbid(action: string | string[], attributes?: string[]) {
			create_permission(action, false, subject, attributes);
			return this;
		},

		/**
		 * Saves and returns the defined permissions
		 *
		 * @returns The array of permission objects
		 */
		save: () => {
			return permissionsData;
		},
	} as TDefinePermission;
}
