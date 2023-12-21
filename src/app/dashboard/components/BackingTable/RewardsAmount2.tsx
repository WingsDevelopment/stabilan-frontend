import React from "react";

import { Address0x } from "../../../common/config/Contract-Addresses";
import { useWingsContractRead } from "../../../../lib/client/hooks/useWingsContractRead";
import { displayTokens } from "../../../../lib/utils/tokens/display-tokens";
import { Spinner } from "../../../../lib";
import { useMutateStabilanCoreGetRewardsAmount } from "../../../state/backingToken/mutations/useMutate-StabilanCore-GetRewardsAmount";

export const RewardsAmount2: React.FC<{
  contractAddress: Address0x;
  userAddress: Address0x;
}> = ({ contractAddress, userAddress }) => {
  const { getRewardsAmount, isFetchingRewardsAmount } =
    useMutateStabilanCoreGetRewardsAmount(contractAddress, userAddress);

  return (
    <>
      {isFetchingRewardsAmount && <Spinner />}
      {!isFetchingRewardsAmount &&
        displayTokens(getRewardsAmount ? (getRewardsAmount as any)[1] : 0n, {})}
    </>
  );
};
