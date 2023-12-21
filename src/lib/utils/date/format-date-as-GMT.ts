/**
 * Formats a Unix timestamp into a date string of the format 'd/m/y 00:00 GMT'.
 *
 * @param {bigint | number} unixTimestamp - The Unix timestamp to format.
 * @returns {string} - The formatted date string.
 */
export function formatDateAsGMT(unixTimestamp: number) {
  // Create a date object from the Unix timestamp
  const date = new Date(Number(unixTimestamp) * 1000);

  // Extract the date components
  const day = date.getUTCDate();
  const month = date.getUTCMonth() + 1; // getUTCMonth returns 0-11
  const year = date.getUTCFullYear();
  const hours = "00";
  const minutes = "00";

  // Format the date components, ensuring single digits are padded with a leading zero
  const dayPadded = day.toString().padStart(2, "0");
  const monthPadded = month.toString().padStart(2, "0");

  // Construct the formatted date string
  const formattedDate = `${dayPadded}/${monthPadded}/${year} ${hours}:${minutes} GMT`;

  return formattedDate;
}
