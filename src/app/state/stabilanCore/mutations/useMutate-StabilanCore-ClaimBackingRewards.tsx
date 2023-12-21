import { useWingsContractWrite } from "../../../../lib/client/hooks/useWingsContractWrite";

export const useFetchStabilanCoreClaimBackingRewards = () => {
  const { writeAsync: claimAsync, isLoading: isClaiming } =
    useWingsContractWrite({
      contractName: "StabilanCore",
      functionName: "claimBackingRewards",
      args: [undefined],
    });

  return {
    claimAsync,
    isClaiming,
  };
};
