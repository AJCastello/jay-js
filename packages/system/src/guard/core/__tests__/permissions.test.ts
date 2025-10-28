import { vi } from "vitest";
import type { TPermission } from "../../types";
/**
 * Tests for the permission checking functionality
 */
import { hasPermission } from "../permissions";

describe("hasPermission", () => {
	// Sample permission set for testing
	const samplePermissions: TPermission[] = [
		{
			role: ["admin"],
			subject: ["articles"],
			action: ["read", "write", "delete"],
			granted: true,
		},
		{
			role: ["editor"],
			subject: ["articles"],
			action: ["read", "write"],
			granted: true,
		},
		{
			role: ["editor"],
			subject: ["articles"],
			action: ["delete"],
			granted: false,
		},
		{
			role: ["user"],
			subject: ["articles"],
			action: ["read"],
			granted: true,
		},
		{
			role: ["user"],
			subject: ["comments"],
			action: ["create", "edit"],
			granted: true,
			attributes: ["own"],
		},
	];

	test("should grant permission when explicitly allowed", () => {
		const result = hasPermission(samplePermissions, "admin", "articles", "read");
		expect(result.granted).toBe(true);
	});

	test("should deny permission when explicitly forbidden", () => {
		const result = hasPermission(samplePermissions, "editor", "articles", "delete");
		expect(result.granted).toBe(false);
	});

	test("should deny permission when not defined", () => {
		const result = hasPermission(samplePermissions, "user", "articles", "delete");
		expect(result.granted).toBe(false);
	});

	test("should deny permission for undefined role", () => {
		const result = hasPermission(samplePermissions, "guest", "articles", "read");
		expect(result.granted).toBe(false);
	});

	test("should deny permission for undefined subject", () => {
		const result = hasPermission(samplePermissions, "admin", "settings", "read");
		expect(result.granted).toBe(false);
	});

	test("should handle permissions with attributes", () => {
		const result = hasPermission(samplePermissions, "user", "comments", "create", "own");
		expect(result.granted).toBe(true);
		expect(result.attributes).toEqual(["own"]);
	});

	test("should deny permission for undefined attribute", () => {
		const result = hasPermission(samplePermissions, "user", "comments", "create", "any");
		expect(result.granted).toBe(false);
	});

	test("should return all available attributes", () => {
		const result = hasPermission(samplePermissions, "user", "comments", "create");
		expect(result.granted).toBe(true);
		expect(result.attributes).toEqual(["own"]);
	});

	test("should handle array of roles, subjects, and actions", () => {
		const permissions: TPermission[] = [
			{
				role: ["admin", "superuser"],
				subject: ["posts", "articles"],
				action: ["manage", "publish"],
				granted: true,
			},
		];

		const result = hasPermission(permissions, "superuser", "articles", "publish");
		expect(result.granted).toBe(true);
	});

	test("should prioritize deny over allow for same permission", () => {
		const conflictingPermissions: TPermission[] = [
			{
				role: ["moderator"],
				subject: ["forum"],
				action: ["moderate"],
				granted: true,
			},
			{
				role: ["moderator"],
				subject: ["forum"],
				action: ["moderate"],
				granted: false,
			},
		];

		const result = hasPermission(conflictingPermissions, "moderator", "forum", "moderate");
		expect(result.granted).toBe(false);
	});
});
