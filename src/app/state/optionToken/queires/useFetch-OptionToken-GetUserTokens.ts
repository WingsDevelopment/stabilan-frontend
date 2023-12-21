import { Address0x } from "../../../common/config/Contract-Addresses";

import { useWingsContractRead } from "lib/client/hooks/useWingsContractRead";

export const useFetchOptionTokenGetUserTokens = (
  stabilanTokenAddress?: Address0x
) => {
  const { data: userTokensAddress } = useWingsContractRead({
    contractName: "OptionToken",
    functionName: "underlying",
    overrideContractAddress: {
      address: stabilanTokenAddress,
    },
  });

  return {
    userTokensAddress,
  };
};
