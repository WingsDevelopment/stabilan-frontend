import { useWingsContractRead } from "../../../../lib/client/hooks/useWingsContractRead";
import { Address0x } from "../../../common/config/Contract-Addresses";

export const useMutateStabilanCoreGetRewardsAmount = (
  contractAddress: Address0x,
  userAddress: Address0x
) => {
  const {
    data: getRewardsAmount,
    isLoading: isLoadingRewardsAmount,
    isFetching: isFetchingRewardsAmount,
  } = useWingsContractRead({
    contractName: "BackingToken",
    functionName: "getRewardsAmount",
    overrideContractAddress: {
      address: contractAddress,
    },
    args: [userAddress],
  });

  return {
    getRewardsAmount,
    isLoadingRewardsAmount,
    isFetchingRewardsAmount,
  };
};
