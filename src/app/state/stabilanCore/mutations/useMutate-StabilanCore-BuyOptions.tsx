import { useWingsContractWrite } from "lib/client/hooks/useWingsContractWrite";

export const useStabilanCoreBuyOptions = () => {
  const { writeAsync: buyOptionsAsync, isLoading: isBuying } =
    useWingsContractWrite({
      contractName: "StabilanCore",
      functionName: "buyOptions",
      args: [undefined, undefined, undefined],
    });

  return {
    buyOptionsAsync,
    isBuying,
  };
};
