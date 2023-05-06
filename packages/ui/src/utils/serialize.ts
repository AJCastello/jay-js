/**
 * Function to normalize and convert a string into a "friendly" format (e.g., for use in URLs)
 * @param {string} str - The string to be normalized and converted
 * @param {string} space - The character to replace spaces and other non-alphanumeric characters (default: ' ')
 * @returns {string} - The normalized and converted string
 */
export const serialize = (str: string, space = " "): string => {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/([^\w]+|\s+)/g, space)
    .replace(/(^-+|-+$)/, "")
    .toLowerCase();
};
