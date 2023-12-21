import { formatUnits } from "viem";

import { formatMoney } from "../money/format-money";

export interface DisplayTokensOptions {
  formattedPrice?: number; // The price used to calculate the equivalent dollar value.
  displayInDollars?: boolean; // Flag to determine if dollar value should be displayed.
  hideTokenAmount?: boolean; // Flag to determine if dollar value should be displayed.
  numberOfDecimals?: number; // The number of decimal places for the token amount.
  maxDecimals?: number; // The number of max decimal places for the token amount.
  tokenDecimals?: number; // The number of decimal places to format units.
  tokenLabel?: string; // The label to be added after the token amount.
  currencyPosition?: "before" | "after"; // Position of the currency symbol.
}

/**
 * Formats the token amount to a specified number of decimal places, appending
 * a label and its equivalent in dollars if required.
 *
 * The function ensures that if `maxDecimals` is not specified, it will display
 * up to the first non-zero digit in the decimal places if the initial decimals are zero.
 *
 * @param tokens - The token amount as a bigint.
 * @param options - Configuration for formatting the display of the token amount.
 * @returns A string formatted according to the specified options.
 *
 * @example
 * ```typescript
 * const tokensDisplay = displayTokens(BigInt('1234500000000000000'), {
 *   formattedPrice: 2000,
 *   displayInDollars: true,
 *   numberOfDecimals: 3,
 *   tokenDecimals: 18,
 *   tokenLabel: 'ETH',
 * });
 * // Returns: "1.234 ETH ($2468.000)"
 * ```
 */
export function displayTokens(
  tokens: bigint | undefined,
  {
    formattedPrice,
    displayInDollars = false,
    hideTokenAmount = false,
    numberOfDecimals = 2,
    maxDecimals,
    tokenDecimals = 18,
    currencyPosition = "after", // Default to 'after'
    tokenLabel,
  }: DisplayTokensOptions
): string {
  let tokenAmount = parseFloat(formatUnits(tokens || BigInt(0), tokenDecimals));

  let formattedTokens = "";
  if (!hideTokenAmount) {
    formattedTokens = formatMoney(tokenAmount, {
      currency: tokenLabel || "",
      numberOfDecimals,
      maxDecimals,
      currencyPosition,
    });
  }

  let formattedDollars = "";
  if (formattedPrice && displayInDollars) {
    const dollarAmount = tokenAmount * formattedPrice;
    formattedDollars = formatMoney(dollarAmount, {
      currency: "$",
      numberOfDecimals,
      maxDecimals,
    });
  }

  // Choose what to return based on the flags
  if (!hideTokenAmount && displayInDollars) {
    if (formattedDollars) {
      return `${formattedTokens} (${formattedDollars})`;
    }
    return `${formattedTokens}`;
  } else if (!hideTokenAmount) {
    return formattedTokens;
  } else if (displayInDollars) {
    return formattedDollars;
  } else {
    return "";
  }
}
