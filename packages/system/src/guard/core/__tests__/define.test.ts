/**
 * Tests for the permission definition functionality
 */
import { definePermissions } from '../define';

describe('definePermissions', () => {
  test('should create permissions for a single role and subject', () => {
    const permissions = definePermissions('admin', 'articles')
      .allow('read')
      .save();

    expect(permissions).toHaveLength(1);
    expect(permissions[0]).toEqual({
      role: ['admin'],
      subject: ['articles'],
      action: ['read'],
      granted: true
    });
  });

  test('should create multiple permissions with chaining', () => {
    const permissions = definePermissions('editor', 'posts')
      .allow(['read', 'create'])
      .forbid('delete')
      .save();

    expect(permissions).toHaveLength(3);

    // Check read permission
    expect(permissions[0]).toEqual({
      role: ['editor'],
      subject: ['posts'],
      action: ['read', 'create'],
      granted: true
    });

    // Check delete permission
    expect(permissions[1]).toEqual({
      role: ['editor'],
      subject: ['posts'],
      action: ['delete'],
      granted: false
    });
  });

  test('should handle array of roles', () => {
    const permissions = definePermissions(['user', 'guest'], 'comments')
      .allow('read')
      .save();

    expect(permissions).toHaveLength(1);
    expect(permissions[0].role).toEqual(['user', 'guest']);
  });

  test('should add attributes when specified', () => {
    const permissions = definePermissions('user', 'profile')
      .allow('edit', ['own'])
      .save();

    expect(permissions).toHaveLength(1);
    expect(permissions[0].attributes).toEqual(['own']);
  });
});