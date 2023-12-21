"use client";

import React from "react";
import { useQueryClient } from "wagmi";

import { Button } from "../../../lib";
import { useMutateStabilanCoreUpdateEpoch } from "../../state/stabilanCore/mutations/useMutate-StabilanCore-UpdateEpoch";

export const UpdateEpochButton = () => {
  const queryClient = useQueryClient();

  //--MUTATIONS--//
  const { updateEpochAsync, isUpdatingEpoch } =
    useMutateStabilanCoreUpdateEpoch();

  return (
    <Button
      className="w-48"
      color="error"
      loading={isUpdatingEpoch}
      onClick={async () => {
        await updateEpochAsync({
          onSuccess: () => {
            queryClient.invalidateQueries();
          },
        });
      }}
    >
      Update epoch
    </Button>
  );
};
