import React from "react";

import { Address0x } from "../../../common/config/Contract-Addresses";
import { Button } from "../../../../lib";
import { useMutateStabilanCoreClaimExectuedOptions } from "../../../state/stabilanCore/mutations/useMutate-StabilanCore-ClaimExectuedOptions";

export const ExecuteOptions: React.FC<{
  contractAddress: Address0x;
}> = ({ contractAddress }) => {
  //--MUTATE--//
  const { claimAsync, isClaiming } =
    useMutateStabilanCoreClaimExectuedOptions();

  return (
    <Button
      disabled={isClaiming}
      onClick={async () => {
        await claimAsync({
          args: [contractAddress],
        });
      }}
    >
      Claim Assets
    </Button>
  );
};
