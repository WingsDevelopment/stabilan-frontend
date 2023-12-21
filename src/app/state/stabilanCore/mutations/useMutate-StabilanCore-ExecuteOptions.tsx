import { useWingsContractWrite } from "lib/client/hooks/useWingsContractWrite";

export const useMutateStabilanCoreExecuteOptions = () => {
  const { writeAsync: executeOptionsAsync, isLoading: isExecutingOptions } =
    useWingsContractWrite({
      contractName: "StabilanCore",
      functionName: "executeOptions",
      args: [undefined, undefined],
    });

  return {
    executeOptionsAsync,
    isExecutingOptions,
  };
};
