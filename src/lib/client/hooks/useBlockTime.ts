import { useCallback, useEffect, useState } from "react";
import { GetBlockReturnType } from "viem";
import { Chain, usePublicClient } from "wagmi";

// Assuming 'publicClient' is a prop or context value
const useBlockTime = () => {
  const publicClient = usePublicClient();
  const [block, setBlock] = useState<
    GetBlockReturnType<Chain, false, "latest"> | undefined
  >(undefined);

  // Fetch block time
  const refetchBlockTime = useCallback(() => {
    setBlock(undefined);
    publicClient
      .getBlock()
      .then((x) => {
        setBlock(x);
      })
      .catch((error) => console.log(error));
  }, [publicClient]);

  // Trigger the fetch when the component mounts or when dependencies change
  useEffect(() => {
    refetchBlockTime();
  }, [refetchBlockTime]);

  return {
    block,
    formmattedBlockDate: block
      ? new Date(Number(block.timestamp) * 1000).toLocaleString()
      : undefined,
    refetchBlockTime,
  };
};

export default useBlockTime;
