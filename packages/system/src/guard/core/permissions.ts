/**
 * Permission checking functionality
 * 
 * Provides utilities for checking permissions against a defined permission set.
 * 
 * @module @jay-js/system/guard/core/permissions
 */

import type { THasPermission, TPermission } from "../types";

/**
 * Checks if a role has permission to perform an action on a subject
 * 
 * @param permissions - Array of permission objects to check against
 * @param role - The role to check permissions for
 * @param subject - The subject to check permissions on
 * @param action - The action to check permission for
 * @param attribute - Optional attribute to check permission for
 * @returns Object with granted status and available attributes
 * 
 * @example
 * ```ts
 * const result = hasPermission(userPermissions, 'editor', 'articles', 'edit');
 * if (result.granted) {
 *   // Allow the user to edit articles
 * }
 * ```
 */
export function hasPermission(
  permissions: TPermission[],
  role: string,
  subject: string,
  action: string,
  attribute?: string,
): THasPermission {
  // Find permissions that match the role, subject, and action
  const relevantPermissions = permissions.filter((permission) => {
    const roleMatch = Array.isArray(permission.role) ? permission.role.includes(role) : permission.role === role;
    const actionMatch = Array.isArray(permission.action)
      ? permission.action.includes(action)
      : permission.action === action;
    const subjectMatch = Array.isArray(permission.subject)
      ? permission.subject.includes(subject)
      : permission.subject === subject;
    return roleMatch && actionMatch && subjectMatch;
  });

  // Explicit deny takes precedence over allow
  const isForbidden = relevantPermissions.some((permission) => !permission.granted);
  const isAllowed = relevantPermissions.some((permission) => permission.granted);

  if (isForbidden) {
    return { granted: false };
  }

  if (isAllowed) {
    // Collect all attributes from permissions that grant access
    const allowedAttributes = relevantPermissions
      .filter((permission) => permission.granted)
      .flatMap((permission) => permission.attributes || []);

    // If checking for a specific attribute
    if (attribute) {
      return {
        granted: allowedAttributes.includes(attribute),
        attributes: allowedAttributes.length > 0 ? allowedAttributes : undefined,
      };
    }

    // General permission is granted
    return {
      granted: true,
      attributes: allowedAttributes.length > 0 ? allowedAttributes : undefined,
    };
  }

  // No matching permissions found
  return { granted: false };
}