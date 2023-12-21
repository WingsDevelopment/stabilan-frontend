interface FormatOptions {
  numberOfDecimals?: number;
  maxDecimals?: number;
  thereIsDigitIndicator?: string;
}

/**
 * Formats a number with a specified fixed number of decimal places.
 * If `maxDecimals` is provided, it allows for dynamic precision up to `maxDecimals` based on the value's actual decimals.
 *
 * @param value The numerical value to be formatted.
 * @param options An object containing options for the number of decimal places, maximum decimals, and indicator for additional non-zero digits.
 * @returns A string representing the formatted number.
 *
 * @example
 * ```typescript
 * formatWithDynamicPrecision(50.50, { maxDecimals: 5 })                    // "50.5"
 * formatWithDynamicPrecision(1234.5678, { numberOfDecimals: 2, maxDecimals: 4 }) // "1234.56"
 * formatWithDynamicPrecision(1234.0005678, { numberOfDecimals: 2, maxDecimals: 4 }) // "1234.0005"
 * formatWithDynamicPrecision(1234.5, { numberOfDecimals: 2 })                       // "1234.50"
 * ```
 */
export function formatWithDynamicPrecision(
  value: number,
  options: FormatOptions = {}
): string {
  // Destructure with default values
  const {
    numberOfDecimals = 2,
    maxDecimals,
    thereIsDigitIndicator = "..",
  } = options;

  // Begin with the full precision of the value or up to the maxDecimals
  const fullPrecisionValue = value.toString();
  const splitValue = fullPrecisionValue.split(".");
  const wholePart = splitValue[0];
  const decimalPart = splitValue[1] || "";

  // Start with the basic fixed decimal precision
  let formattedValue = value.toFixed(numberOfDecimals);

  // If there's a maxDecimals, we need to consider it for additional precision
  if (maxDecimals !== undefined) {
    // Find out if there are additional non-zero decimals beyond numberOfDecimals
    const nonZeroIndex = decimalPart.slice(numberOfDecimals).search(/[^0]/);

    if (nonZeroIndex !== -1) {
      // If there is a non-zero digit within maxDecimals, extend to it
      if (nonZeroIndex < maxDecimals - numberOfDecimals) {
        formattedValue =
          wholePart +
          "." +
          decimalPart.substring(0, numberOfDecimals + nonZeroIndex + 1);
      } else {
        // If the first non-zero digit is beyond maxDecimals, truncate and append with thereIsDigitIndicator
        formattedValue =
          wholePart +
          "." +
          decimalPart.substring(0, maxDecimals) +
          thereIsDigitIndicator;
      }
    }
    // If there are no non-zero digits beyond numberOfDecimals up to maxDecimals, do nothing
  }

  return formattedValue;
}
