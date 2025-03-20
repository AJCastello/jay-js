/**
 * Generates a unique and random string using cryptographically secure values.
 * @param length Desired length of the string (default: 10)
 * @returns A unique alphanumeric string
 * @throws {Error} If the length is not a positive integer
 * @note Uniqueness is not mathematically guaranteed; use longer lengths to reduce the probability of collisions.
 */
export function uniKey(length = 10, chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789"): string {
  if (!Number.isInteger(length) || length <= 0) {
    throw new Error("O comprimento deve ser um número inteiro positivo");
  }
  if (chars.length === 0) {
    throw new Error("O conjunto de caracteres não pode ser vazio");
  }
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array)
    .map(x => chars[x % chars.length])
    .join("");
}