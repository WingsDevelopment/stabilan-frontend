import { useWingsContractWrite } from "lib/client/hooks/useWingsContractWrite";

export const useMutateStabilanCoreUpdateEpoch = () => {
  const { writeAsync: updateEpochAsync, isLoading: isUpdatingEpoch } =
    useWingsContractWrite({
      contractName: "StabilanCore",
      functionName: "updateEpoch",
    });

  return {
    updateEpochAsync,
    isUpdatingEpoch,
  };
};
