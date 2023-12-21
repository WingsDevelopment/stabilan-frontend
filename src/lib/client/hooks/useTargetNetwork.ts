"use client";

import { useEffect } from "react";
import { useNetwork } from "wagmi";

import scaffoldConfig from "../../../../scaffold.config";

import {
  ModifiedNetwork,
  modifyNetworkName,
} from "lib/scaffold-lib/utils/scaffold-eth";
import { useGlobalState } from "lib/scaffold-lib/services/store/store";

/**
 * @returns The target network with the modified network name.
 */
export function useTargetNetwork(): { targetNetwork: ModifiedNetwork } {
  const { chain } = useNetwork();
  const targetNetwork = useGlobalState(({ targetNetwork }) => targetNetwork);
  const setTargetNetwork = useGlobalState(
    ({ setTargetNetwork }) => setTargetNetwork
  );

  useEffect(() => {
    const newSelectedNetwork = scaffoldConfig.targetNetworks.find(
      (targetNetwork) => targetNetwork.id === chain?.id
    );
    if (newSelectedNetwork && newSelectedNetwork.id !== targetNetwork.id) {
      setTargetNetwork(newSelectedNetwork);
    }
  }, [chain?.id, setTargetNetwork, targetNetwork.id]);

  return {
    targetNetwork: modifyNetworkName(targetNetwork),
  };
}
