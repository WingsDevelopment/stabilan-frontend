import { addMonths } from "date-fns";

import { startdAPPDate } from "../../../common/config/date";

import { useWingsContractRead } from "lib/client/hooks/useWingsContractRead";

export const useFetchStabilanCoreCurrentEpoch = () => {
  const { data: currentEpoch, isLoading: isEpochLoading } =
    useWingsContractRead({
      contractName: "StabilanCore",
      functionName: "currentEpoch",
    });

  const currentTime = currentEpoch
    ? addMonths(startdAPPDate, Number(currentEpoch))
    : undefined;

  return {
    currentTime,
    currentEpoch,
    isEpochLoading,
  };
};
