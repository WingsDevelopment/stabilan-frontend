import { useTargetNetwork } from "../../../../lib/client/hooks/useTargetNetwork";
import { useWingsContractWrite } from "../../../../lib/client/hooks/useWingsContractWrite";
import { getAddressByTokenAndNetwork } from "../../../common/config/tokens";
import { IToken } from "../../../common/types";

export const useMutateErc20Mint = (selectedToken?: IToken) => {
  const { targetNetwork: network } = useTargetNetwork();

  const { writeAsync: mintAsync, isLoading: isMinting } = useWingsContractWrite(
    {
      contractName: "MockERC20",
      functionName: "mint",
      overrideContractAddress: {
        address: selectedToken
          ? getAddressByTokenAndNetwork(
              selectedToken.name,
              network.modifiedName
            )
          : undefined,
      },
      args: [undefined, undefined],
    }
  );

  return {
    mintAsync,
    isMinting,
  };
};
