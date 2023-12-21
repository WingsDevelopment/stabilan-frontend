/**
 * Formats a given Date object into a string representing the date and time in GMT.
 *
 * @param {Date} date - The Date object to format.
 * @returns {string} A string representing the formatted date and time in GMT.
 *
 * @example
 * ```javascript
 * const currentDate = new Date();
 * const gmtString = formatGMTDateToString(currentDate);
 * // gmtString would be in the format "dd/mm/yyyy hh:mm GMT"
 * ```
 */
export function formatGMTDateToString(date: Date) {
  const pad = (num: number) => num.toString().padStart(2, "0");

  const day = pad(date.getUTCDate());
  const month = pad(date.getUTCMonth() + 1); // getUTCMonth() returns 0-11
  const year = date.getUTCFullYear();
  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());

  return `${day}/${month}/${year} ${hours}:${minutes} GMT`;
}
