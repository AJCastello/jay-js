/**
 * Performs a deep comparison between two values to determine if they are equal.
 * This function handles various data types, including primitives, arrays, objects,
 * Maps, Sets, Dates, and RegExps. It also accounts for circular references.
 * 
 * @param a - The first value to compare.
 * @param b - The second value to compare.
 * @param visited - A Map used to track visited objects for circular reference detection.
 * @returns `true` if the values are deeply equal, `false` otherwise.
 */
export function isEqual(a: unknown, b: unknown, visited = new Map<object, Set<object>>()): boolean {
  // Handle primitive types and referential equality
  if (a === b) {
    return true;
  }
  
  // Special case: NaN values should be considered equal
  if (typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b)) {
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
    
    // Check for circular references in arrays
    if (a !== null && typeof a === 'object') {
      if (!visited.has(a as object)) {
        visited.set(a as object, new Set());
      }
      if (visited.get(a as object)?.has(b as object)) {
        return true;  // We've seen this pair before, consider them equal
      }
      visited.get(a as object)?.add(b as object);
    }
    
    for (let i = 0; i < a.length; i++) {
      if (!isEqual(a[i], b[i], visited)) {
        return false;
      }
    }
    
    return true;
  }
  
  // Handle Objects (including Maps and Sets)
  if (typeA === 'object') {
    // Handle circular references
    if (a !== null && b !== null) {
      if (!visited.has(a as object)) {
        visited.set(a as object, new Set());
      }
      if (visited.get(a as object)?.has(b as object)) {
        return true;  // We've seen this pair before, consider them equal
      }
      visited.get(a as object)?.add(b as object);
    }
    
    // Handle Map
    if (a instanceof Map && b instanceof Map) {
      if (a.size !== b.size) {
        return false;
      }
      
      for (const [key, value] of a.entries()) {
        if (!b.has(key) || !isEqual(value, b.get(key), visited)) {
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
          if (isEqual(value, bValue, visited)) {
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
      if (!isEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key], visited)) {
        return false;
      }
    }
    
    return true;
  }
  
  // Handle other cases (functions, symbols, etc.)
  return false;
}