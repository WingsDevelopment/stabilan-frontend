import { IToken } from "../../../common/types";
import { useTargetNetwork } from "../../../../lib/client/hooks/useTargetNetwork";

import { useWingsContractRead } from "lib/client/hooks/useWingsContractRead";
import { getAddressByTokenAndNetwork } from "app/common/config/tokens";

export const useFetchStabilanCoreStrikePrice = (
  token: IToken | undefined,
  currentEpoch: any
) => {
  const { targetNetwork } = useTargetNetwork();

  const { data: strikePrice, isLoading: isStrikePriceLoading } =
    useWingsContractRead({
      contractName: "StabilanCore",
      functionName: "assetsData",
      args: [
        getAddressByTokenAndNetwork(token?.name, targetNetwork.modifiedName),
        currentEpoch,
      ],
    });

  return {
    strikePrice,
    isStrikePriceLoading,
  };
};
