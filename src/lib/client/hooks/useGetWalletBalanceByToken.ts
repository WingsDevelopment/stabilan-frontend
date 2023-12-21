// "use client";
export const useGetWalletBalanceByToken = () => {};
// import { Address, etherUnits, formatUnits } from "viem";
// import { useAccount } from "wagmi";

// import { Address0x } from "../../../app/config/Contract-Addresses";
// import { formatUnitsToMoney } from "../../utils/money/format-units-to-money";

// import { useWingsContractRead } from "./useWingsContractRead";

// /**
//  * Use this custom hook to get the price from the PriceFeedAggregator.
//  *
//  * @param token - The token to query for the balance.
//  * @returns An object containing price details or undefined if data is not available.
//  */
// export const useGetWalletBalanceByToken = (token: any) => {
//   const { address } = useAccount();

//   const { data, isFetching, refetch } = useWingsContractRead({
//     contractName: token,
//     functionName: "balanceOf",
//     args: [address as Address0x],
//   });

//   if (data === undefined) {
//     return {
//       balance: undefined,
//       isFetching: undefined,
//       refetch,
//     };
//   }

//   return {
//     balance: data,
//     isFetching,
//     refetch,
//   };
// };
