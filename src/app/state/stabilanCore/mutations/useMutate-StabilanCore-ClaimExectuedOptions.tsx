import { useWingsContractWrite } from "lib/client/hooks/useWingsContractWrite";

export const useMutateStabilanCoreClaimExectuedOptions = () => {
  const { writeAsync: claimAsync, isLoading: isClaiming } =
    useWingsContractWrite({
      contractName: "StabilanCore",
      functionName: "claimExectuedOptions",
      args: [undefined],
    });

  return {
    claimAsync,
    isClaiming,
  };
};
