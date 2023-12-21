import { IToken } from "../../../common/types"; // Adjust the path as needed
import { useTargetNetwork } from "../../../../lib/client/hooks/useTargetNetwork"; // Adjust the path as needed

import { useWingsContractRead } from "lib/client/hooks/useWingsContractRead";
import { getAddressByTokenAndNetwork } from "app/common/config/tokens";

export const useFetchStabilanCoreMaxOptionAmount = (
  selectedToken: IToken | undefined,
  months: number
) => {
  const { targetNetwork } = useTargetNetwork();

  const { data: getMaxOptionAmount, isLoading: isMaxOptionAmountLoading } =
    useWingsContractRead({
      contractName: "StabilanCore",
      functionName: "getMaxOptionAmount",
      args: [
        getAddressByTokenAndNetwork(
          selectedToken?.name,
          targetNetwork.modifiedName
        ),
        BigInt(months),
      ],
    });

  return {
    getMaxOptionAmount,
    isMaxOptionAmountLoading,
  };
};
