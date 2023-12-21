import { IToken } from "../../../common/types";
import { useTargetNetwork } from "../../../../lib/client/hooks/useTargetNetwork";

import { useWingsContractRead } from "lib/client/hooks/useWingsContractRead";
import { getAddressByTokenAndNetwork } from "app/common/config/tokens";

export const useFetchStabilanCoreAssetsConfig = (token: IToken | undefined) => {
  const { targetNetwork } = useTargetNetwork();

  const { data: assetsConfig, isLoading: isAssetsConfigLoading } =
    useWingsContractRead({
      contractName: "StabilanCore",
      functionName: "assetsConfig",
      args: [
        getAddressByTokenAndNetwork(token?.name, targetNetwork.modifiedName),
      ],
    });

  return {
    assetsConfigAddress: assetsConfig ? (assetsConfig as any)[0] : undefined,
    isAssetsConfigLoading,
  };
};
