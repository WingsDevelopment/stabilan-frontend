/**
 * `calculatePercentage` function
 *
 * This function calculates the percentage ratio between two numbers.
 *
 * @example
 * ```typescript
 * calculatePercentage(50, 200)                     // 25.00%
 * calculatePercentage("50", "200")                 // 25.00%
 * calculatePercentage(0, 200)                      // 0.00%
 * calculatePercentage(200, 0)                      // undefined.
 * ```
 *
 * @param first - The numerator value, which can be a number or a string representing a number.
 * @param second - The denominator value, which can be a number or a string representing a number.
 * @throws Will throw an error if `second` is zero.
 * @returns A string representing the percentage ratio, formatted to two decimal places.
 */
export const calculatePercentage = (
  first: string | number,
  second: string | number
): string | undefined => {
  const firstNum = Number(first);
  const secondNum = Number(second);

  if (secondNum === 0) {
    return undefined;
  }

  const ratio = firstNum / secondNum;
  return `${(ratio * 100).toFixed(2)}%`;
};
