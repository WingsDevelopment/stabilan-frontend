import { IToken } from "../../../common/types";
import { useTargetNetwork } from "../../../../lib/client/hooks/useTargetNetwork";

import { useWingsContractRead } from "lib/client/hooks/useWingsContractRead";
import { getAddressByTokenAndNetwork } from "app/common/config/tokens";

export const useFetchStabilanCoreGetAssetAPY = (token: IToken | undefined) => {
  const { targetNetwork } = useTargetNetwork();

  const { data: getAssetAPY, isLoading: isAssetsConfigLoading } =
    useWingsContractRead({
      contractName: "StabilanCore",
      functionName: "getAssetAPY",
      args: [
        getAddressByTokenAndNetwork(token?.name, targetNetwork.modifiedName),
      ],
    });

  return {
    getAssetAPY,
    isAssetsConfigLoading,
  };
};
