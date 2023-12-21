import { parseUnits, etherUnits } from "viem";

import { useWingsContractRead } from "../../../../lib/client/hooks/useWingsContractRead";
import { getAddressByTokenAndNetwork } from "../../../common/config/tokens";
import { Address0x } from "../../../common/config/Contract-Addresses";
import { IToken } from "../../../common/types";
import { useTargetNetwork } from "../../../../lib/client/hooks/useTargetNetwork";

export const useFetchStabilanCoreGetOptionsPrice = (
  token: IToken | undefined,
  amount: string,
  months: number,
  assetsConfig?: Address0x
): {
  getOptionsPriceValue: bigint | undefined;
  isFetched: boolean;
} => {
  const { targetNetwork } = useTargetNetwork();

  const { data: getOptionsPrice, isFetched } = useWingsContractRead({
    contractName: "StabilanCore",
    functionName: "getOptionsPrice",
    args: [
      getAddressByTokenAndNetwork(token?.name, targetNetwork.modifiedName),
      parseUnits(String(amount), etherUnits.wei),
      BigInt(months),
      assetsConfig,
    ],
  });

  return {
    getOptionsPriceValue: getOptionsPrice
      ? (getOptionsPrice as any)[0]
      : undefined,
    isFetched,
  };
};
