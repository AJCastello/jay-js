/**
 * Compares two values deeply to check if they are equal
 * Used to avoid unnecessary state updates
 * 
 * @param a First value to compare
 * @param b Second value to compare
 * @returns True if values are equal, false otherwise
 */
export function isEqual(a: unknown, b: unknown): boolean {
  // Handle primitive types and referential equality
  if (a === b) {
    return true;
  }

  // Handle null and undefined
  if (a === null || b === null || a === undefined || b === undefined) {
    return false;
  }

  // Handle different types
  const typeA = typeof a;
  const typeB = typeof b;
  if (typeA !== typeB) {
    return false;
  }

  // Handle Dates
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // Handle RegExp
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.toString() === b.toString();
  }

  // Handle Arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i])) {
        return false;
      }
    }
    
    return true;
  }

  // Handle Objects (including Maps and Sets)
  if (typeA === 'object') {
    // Handle Map
    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) {
        return false;
      }
      
      for (const [key, value] of a.entries()) {
        if (!b.has(key) || !isEqual(value, b.get(key))) {
          return false;
        }
      }
      
      return true;
    }
    
    // Handle Set
    if (a instanceof Set && b instanceof Set) {
      if (a.size !== b.size) {
        return false;
      }
      
      for (const value of a.values()) {
        let found = false;
        for (const bValue of b.values()) {
          if (isEqual(value, bValue)) {
            found = true;
            break;
          }
        }
        if (!found) {
          return false;
        }
      }
      
      return true;
    }
    
    // Handle plain objects
    const keysA = Object.keys(a as object);
    const keysB = Object.keys(b as object);
    
    if (keysA.length !== keysB.length) {
      return false;
    }
    
    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) {
        return false;
      }
      if (!isEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key])) {
        return false;
      }
    }
    
    return true;
  }
  
  // Handle other cases (functions, symbols, etc.)
  return false;
}