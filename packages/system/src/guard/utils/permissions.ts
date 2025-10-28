/**
 * Utility functions for the guard system
 *
 * @module @jay-js/system/guard/utils
 */

import type { TPermission } from "../types";

/**
 * Combines multiple permission arrays into a single array
 *
 * This is useful when permissions come from different sources
 * such as user roles, feature flags, or dynamic conditions.
 *
 * @param permissionSets - Arrays of permission objects to combine
 * @returns A combined array of all permissions
 *
 * @example
 * ```ts
 * const rolePermissions = definePermissions('user', 'articles').allow('read').save();
 * const featurePermissions = definePermissions('user', 'beta-features').allow('access').save();
 *
 * const allPermissions = combinePermissions(rolePermissions, featurePermissions);
 * ```
 */
export function combinePermissions(...permissionSets: TPermission[][]): TPermission[] {
	return permissionSets.flat();
}

/**
 * Creates a permission object for a single permission rule
 *
 * This is a helper function for creating individual permission entries
 * without using the builder pattern from definePermissions.
 *
 * @param role - The role or roles that the permission applies to
 * @param subject - The subject that the permission applies to
 * @param action - The action that the permission applies to
 * @param granted - Whether the permission is granted
 * @param attributes - Optional attributes to restrict the permission to
 * @returns A permission object
 *
 * @example
 * ```ts
 * const viewArticlesPermission = createPermission('editor', 'articles', 'view', true);
 * const deleteArticlesPermission = createPermission('editor', 'articles', 'delete', false);
 * ```
 */
export function createPermission(
	role: string | string[],
	subject: string | string[],
	action: string | string[],
	granted: boolean,
	attributes?: string | string[],
): TPermission {
	const permission: TPermission = {
		role: Array.isArray(role) ? role : [role],
		subject: Array.isArray(subject) ? subject : [subject],
		action: Array.isArray(action) ? action : [action],
		granted,
	};

	if (attributes) {
		permission.attributes = attributes;
	}

	return permission;
}
