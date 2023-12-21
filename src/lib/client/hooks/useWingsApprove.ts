import { useState, useCallback, useEffect } from "react";
import { useAccount } from "wagmi";
import { maxUint120 } from "viem";

import { notification } from "../../scaffold-lib/utils/scaffold-eth";
import { Address0x } from "../../../app/common/config/Contract-Addresses";

import { useWingsContractWrite } from "./useWingsContractWrite";
import { useWingsContractRead } from "./useWingsContractRead";

const ALWAYS_APPROVE_MAX = false;

export const useWingsApprove = (
  tokenAddress?: Address0x,
  spenderAddress?: Address0x,
  threshold: bigint = BigInt(0)
) => {
  const { address } = useAccount();
  const [isApproved, setIsApproved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { writeAsync: approveToken, isLoading: isApproving } =
    useWingsContractWrite({
      contractName: "MockERC20",
      functionName: "approve",
      overrideContractAddress: { address: tokenAddress },
      args: [spenderAddress, undefined],
    });

  const { data: allowance } = useWingsContractRead({
    contractName: "MockERC20",
    functionName: "allowance",
    overrideContractAddress: { address: tokenAddress },
    args: [address as Address0x, spenderAddress],
  });

  const checkApproval = useCallback(async () => {
    if (allowance && allowance >= threshold) {
      setIsApproved(true);
    } else {
      setIsApproved(false);
    }
  }, [allowance, threshold]);

  useEffect(() => {
    checkApproval();
  }, [checkApproval]);

  const approveAsync = useCallback(
    async (amount: bigint | undefined) => {
      setIsLoading(true);

      const amountToApprove = ALWAYS_APPROVE_MAX
        ? maxUint120
        : (amount || 0n) - (allowance || 0n);

      try {
        await approveToken({
          args: [spenderAddress, amountToApprove],
          onSuccess: () => {
            setIsApproved(true);
            notification.success("Approval Successful");
          },
          onError: (error) => {
            notification.error("Approval Failed");
            console.error(error);
          },
          onSettled: () => {
            setIsLoading(false);
          },
        });
      } catch (e) {
      } finally {
        setIsLoading(false);
      }
    },
    [allowance, approveToken, spenderAddress]
  );

  return {
    isApproved,
    isApproving: isLoading || isApproving,
    approveAsync,
    checkApproval,
  };
};
