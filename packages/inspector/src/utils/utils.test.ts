import { isJayJsComponent, getDebugFunctionName, getLineAndColumn } from './index';

describe('Inspector Utils', () => {
  describe('isJayJsComponent', () => {
    it('should identify Jay JS components', () => {
      expect(isJayJsComponent('Box')).toBe(true);
      expect(isJayJsComponent('Button')).toBe(true);
      expect(isJayJsComponent('Typography')).toBe(true);
      expect(isJayJsComponent('Input')).toBe(true);
    });

    it('should reject non-Jay JS components', () => {
      expect(isJayJsComponent('div')).toBe(false);
      expect(isJayJsComponent('MyComponent')).toBe(false);
      expect(isJayJsComponent('CustomElement')).toBe(false);
      expect(isJayJsComponent('')).toBe(false);
    });
  });

  describe('getDebugFunctionName', () => {
    it('should return consistent debug function name', () => {
      expect(getDebugFunctionName()).toBe('__jayjs_debug__');
    });
  });

  describe('getLineAndColumn', () => {
    it('should calculate correct line and column', () => {
      const source = `line 1
line 2
line 3`;
      
      expect(getLineAndColumn(source, 0)).toEqual({ line: 1, column: 1 });
      expect(getLineAndColumn(source, 7)).toEqual({ line: 2, column: 1 });
      expect(getLineAndColumn(source, 14)).toEqual({ line: 3, column: 1 });
    });

    it('should handle single line', () => {
      const source = 'single line';
      expect(getLineAndColumn(source, 0)).toEqual({ line: 1, column: 1 });
      expect(getLineAndColumn(source, 5)).toEqual({ line: 1, column: 6 });
    });
  });
});