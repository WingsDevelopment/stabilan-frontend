import { useWingsContractWrite } from "lib/client/hooks/useWingsContractWrite";

export const useMutateStabilanCoreBacking = () => {
  const { writeAsync: backAsync, isLoading: isBacking } = useWingsContractWrite(
    {
      contractName: "StabilanCore",
      functionName: "backing",
      args: [undefined, undefined, undefined],
    }
  );

  return {
    backAsync,
    isBacking,
  };
};
