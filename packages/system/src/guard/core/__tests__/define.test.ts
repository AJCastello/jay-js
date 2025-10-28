import { vi } from 'vitest';
import type { TPermission } from "../../types";
/**
 * Tests for the permission definition functionality
 */
import { definePermissions } from "../define";

describe("definePermissions", () => {
	it("should define permissions for a single role and action", () => {
		const permissions = definePermissions("user", "articles").allow("read").save();

		expect(permissions).toHaveLength(1);
		expect(permissions[0]).toEqual({
			role: ["user"],
			subject: ["articles"],
			action: ["read"],
			granted: true,
		});
	});

	it("should define permissions for an array of roles", () => {
		const permissions = definePermissions(["admin", "editor"], "articles").allow("read").save();

		expect(permissions).toHaveLength(1);
		expect(permissions[0].role).toEqual(["admin", "editor"]);
	});

	it("should define permissions for an array of actions", () => {
		const permissions = definePermissions("editor", "articles").allow(["read", "write"]).save();

		expect(permissions).toHaveLength(1);
		expect(permissions[0].action).toEqual(["read", "write"]);
	});

	it("should support chaining of allow and forbid methods", () => {
		const permissions = definePermissions("editor", "articles").allow("read").allow("write").forbid("delete").save();

		expect(permissions).toHaveLength(3);
		expect(permissions[0].action).toEqual(["read"]);
		expect(permissions[0].granted).toBe(true);
		expect(permissions[1].action).toEqual(["write"]);
		expect(permissions[1].granted).toBe(true);
		expect(permissions[2].action).toEqual(["delete"]);
		expect(permissions[2].granted).toBe(false);
	});

	it("should support attributes in allow method", () => {
		const permissions = definePermissions("user", "comments").allow("edit", ["own"]).save();

		expect(permissions).toHaveLength(1);
		expect(permissions[0].attributes).toEqual(["own"]);
	});

	it("should support attributes in forbid method", () => {
		const permissions = definePermissions("user", "articles").forbid("delete", ["others"]).save();

		expect(permissions).toHaveLength(1);
		expect(permissions[0].attributes).toEqual(["others"]);
		expect(permissions[0].granted).toBe(false);
	});

	it("should create correct permission structure for complex definitions", () => {
		const permissions = definePermissions(["admin", "superuser"], "posts")
			.allow(["create", "read", "update"])
			.forbid("delete", ["draft"])
			.save();

		expect(permissions).toHaveLength(2);

		// Check first permission (allow)
		expect(permissions[0]).toEqual({
			role: ["admin", "superuser"],
			subject: ["posts"],
			action: ["create", "read", "update"],
			granted: true,
		});

		// Check second permission (forbid with attributes)
		expect(permissions[1]).toEqual({
			role: ["admin", "superuser"],
			subject: ["posts"],
			action: ["delete"],
			granted: false,
			attributes: ["draft"],
		});
	});

	it("should return an empty array if no permissions defined", () => {
		const permissions = definePermissions("guest", "articles").save();

		expect(permissions).toEqual([]);
		expect(permissions).toHaveLength(0);
	});
});
