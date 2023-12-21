"use client";

import { Address, etherUnits, formatUnits, parseUnits } from "viem";

import { Address0x } from "../../../app/common/config/Contract-Addresses";
import { formatMoney } from "../../utils";

import { useWingsContractRead } from "./useWingsContractRead";

/**
 * Use this custom hook to get the price from the PriceFeedAggregator.
 *
 * @param address - The contract address to query for the price.
 * @returns An object containing price details or undefined if data is not available.
 */
export const useGetPriceByAddress = (address: Address) => {
  const { data, isFetching, refetch } = useWingsContractRead({
    contractName: "PriceFeedAggregator",
    functionName: "peek",
    args: [address as Address0x],
  });

  // Early return if data is undefined
  if (data === undefined) {
    return {
      priceInDollars: undefined,
      originalPrice: undefined,
      formattedPrice: undefined,
      decimals: undefined,
      isLoading: isFetching,
      refetch,
    };
  }

  // Extract originalPrice and decimals from the data
  const originalPrice = data;
  // const decimals = (data as any)[1];
  const decimals = 8;

  // Calculate price in dollars
  const priceInDollars = formatMoney(
    Number(formatUnits(originalPrice || 0n, decimals)),
    {}
  );

  // Format original price
  const formattedPrice = parseFloat(formatUnits(originalPrice, decimals));

  return {
    priceInDollars,
    originalPrice,
    formattedPrice,
    decimals,
    isFetching,
    refetch,
  };
};
