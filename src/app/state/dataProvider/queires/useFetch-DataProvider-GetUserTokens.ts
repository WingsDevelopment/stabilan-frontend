import { useAccount } from "wagmi";

import { IToken } from "../../../common/types";
import { useTargetNetwork } from "../../../../lib/client/hooks/useTargetNetwork";
import {
  contractAddressesByChain,
  AvailableChains,
  Address0x,
} from "../../../common/config/Contract-Addresses";

import { useWingsContractRead } from "lib/client/hooks/useWingsContractRead";

export const useFetchDataProviderGetUserTokens = () => {
  const { address } = useAccount();
  const { targetNetwork: network } = useTargetNetwork();

  const { data: userTokens } = useWingsContractRead({
    contractName: "DataProvider",
    functionName: "getUserTokens",
    args: [
      contractAddressesByChain[network.modifiedName as AvailableChains]
        ?.StabilanCore,
      address as Address0x,
    ],
  });

  return {
    userTokens,
  };
};
