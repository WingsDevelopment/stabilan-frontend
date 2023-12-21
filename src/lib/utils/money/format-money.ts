import { formatWithDynamicPrecision } from "../format/format-with-dynamic-precision";

export type CurrencyPosition = "before" | "after";

export interface FormatMoneyOptions {
  /**
   * The currency symbol or string to be used.
   * Default is "$".
   */
  currency?: string;

  /**
   * Specifies the position of the currency symbol.
   * Default is "before".
   */
  currencyPosition?: CurrencyPosition;

  /**
   * Specifies the character to be used as a decimal separator.
   * Default is ".".
   */
  decimalSeparator?: string;

  /**
   * Specifies the character to be used as a thousands separator.
   * Default is ",".
   */
  thousandSeparator?: string;

  /**
   * Specifies the character to be used as a thousands separator.
   * Default is ",".
   */
  numberOfDecimals?: number;

  /**
   * Specifies the character to be used as a thousands separator.
   * Default is ",".
   */
  maxDecimals?: number;
}

/**
 * `formatMoney` function
 *
 * This function formats a number to represent money, providing several options for customization.
 *
 * @example
 * ```typescript
 * formatMoney(1000.50)                     // $1,000.50
 * formatMoney(1000.50, {currency: '€'})    // €1,000.50
 * formatMoney(1000.50, {currencyPosition: 'after'}) // 1,000.50$
 * formatMoney(1000.50, {decimalSeparator: ',', thousandSeparator: '.'}) // $1.000,50
 * ```
 *
 * @param amount The numerical value to be formatted.
 * @param options Optional configuration for formatting.
 * @returns A formatted money string.
 */
export const formatMoney = (
  amount: number,
  options: FormatMoneyOptions = {}
): string => {
  const {
    currency = "$",
    currencyPosition = "before",
    decimalSeparator = ".",
    thousandSeparator = ",",
    numberOfDecimals = 2,
    maxDecimals,
  } = options;

  // Refactored to use the dynamic precision function
  const formattedAmount = formatWithDynamicPrecision(amount, {
    numberOfDecimals,
    maxDecimals,
  }).replace(".", decimalSeparator);

  // Format the whole part with thousand separators
  const parts = formattedAmount.split(decimalSeparator);
  const integerPart = parts[0].replace(
    /\B(?=(\d{3})+(?!\d))/g,
    thousandSeparator
  );
  const decimalPart = parts[1] ?? "";

  return currencyPosition === "before"
    ? `${currency}${integerPart}${
        decimalPart ? decimalSeparator + decimalPart : ""
      }`
    : `${integerPart}${
        decimalPart ? decimalSeparator + decimalPart : ""
      }${currency}`;
};
