/**
 * Tests for the permission utility functions
 */
import { combinePermissions, createPermission } from '../permissions';
import type { TPermission } from '../../types';

describe('permission utilities', () => {
  describe('combinePermissions', () => {
    test('should combine multiple permission arrays', () => {
      const rolePermissions: TPermission[] = [
        {
          role: ['admin'],
          subject: ['articles'],
          action: ['manage'],
          granted: true
        }
      ];

      const featurePermissions: TPermission[] = [
        {
          role: ['user'],
          subject: ['beta-features'],
          action: ['access'],
          granted: true
        }
      ];

      const combined = combinePermissions(rolePermissions, featurePermissions);

      expect(combined).toHaveLength(2);
      expect(combined).toContainEqual(rolePermissions[0]);
      expect(combined).toContainEqual(featurePermissions[0]);
    });

    test('should handle empty arrays', () => {
      const combined = combinePermissions([], []);
      expect(combined).toHaveLength(0);
      expect(combined).toEqual([]);
    });

    test('should handle multiple sets of permissions', () => {
      const set1: TPermission[] = [{ role: ['admin'], subject: ['users'], action: ['create'], granted: true }];
      const set2: TPermission[] = [{ role: ['admin'], subject: ['users'], action: ['delete'], granted: true }];
      const set3: TPermission[] = [{ role: ['admin'], subject: ['users'], action: ['update'], granted: true }];

      const combined = combinePermissions(set1, set2, set3);

      expect(combined).toHaveLength(3);
    });
  });

  describe('createPermission', () => {
    test('should create a permission object with basic properties', () => {
      const permission = createPermission('admin', 'articles', 'read', true);

      expect(permission).toEqual({
        role: ['admin'],
        subject: ['articles'],
        action: ['read'],
        granted: true
      });
    });

    test('should handle array inputs', () => {
      const permission = createPermission(
        ['admin', 'editor'],
        ['articles', 'posts'],
        ['read', 'write'],
        true
      );

      expect(permission).toEqual({
        role: ['admin', 'editor'],
        subject: ['articles', 'posts'],
        action: ['read', 'write'],
        granted: true
      });
    });

    test('should include attributes when provided', () => {
      const permission = createPermission(
        'user',
        'profile',
        'edit',
        true,
        ['own']
      );

      expect(permission).toEqual({
        role: ['user'],
        subject: ['profile'],
        action: ['edit'],
        granted: true,
        attributes: ['own']
      });
    });

    test('should handle array of attributes', () => {
      const permission = createPermission(
        'moderator',
        'comments',
        'moderate',
        true,
        ['reported', 'flagged']
      );

      expect(permission).toEqual({
        role: ['moderator'],
        subject: ['comments'],
        action: ['moderate'],
        granted: true,
        attributes: ['reported', 'flagged']
      });
    });
  });
});