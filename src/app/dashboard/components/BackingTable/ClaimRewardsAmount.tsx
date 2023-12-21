import React from "react";

import { Address0x } from "../../../common/config/Contract-Addresses";
import { Button } from "../../../../lib";
import { useWingsContractWrite } from "../../../../lib/client/hooks/useWingsContractWrite";
import { useWingsContractRead } from "../../../../lib/client/hooks/useWingsContractRead";
import { useFetchStabilanCoreCurrentEpoch } from "../../../state/stabilanCore/queires/useFetch-StabilanCore-CurrentEpoch";
import { useFetchStabilanCoreClaimBackingRewards } from "../../../state/stabilanCore/mutations/useMutate-StabilanCore-ClaimBackingRewards";

export const ClaimRewardsAmount: React.FC<{
  contractAddress: Address0x;
  endEpoch: bigint | undefined;
}> = ({ contractAddress, endEpoch }) => {
  //--FETCH--//
  const { currentEpoch } = useFetchStabilanCoreCurrentEpoch();

  //--MUTATIONS--//
  const { claimAsync, isClaiming } = useFetchStabilanCoreClaimBackingRewards();

  //--JSX--//
  if ((currentEpoch || 0) <= (endEpoch || 0)) return null;

  return (
    <Button
      disabled={isClaiming}
      onClick={async () => {
        await claimAsync({
          args: [contractAddress],
        });
      }}
    >
      Claim Rewards Amount
    </Button>
  );
};
