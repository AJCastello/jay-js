/**
 * Gera uma chave única com caracteres aleatórios
 */
export function uniKey(length = 10): string {
  let key = "";
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < length; i++) {
    key += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return key;
}

/**
 * Gera um UUID v4
 */
export function uuid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

/**
 * Gera uma chave com prefixo
 */
export function prefixedKey(prefix: string, length = 6): string {
  return `${prefix}-${uniKey(length)}`;
}

/**
 * Gera uma chave com timestamp
 */
export function timeKey(prefix = ""): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 6);
  return prefix ? `${prefix}-${timestamp}-${random}` : `${timestamp}-${random}`;
}