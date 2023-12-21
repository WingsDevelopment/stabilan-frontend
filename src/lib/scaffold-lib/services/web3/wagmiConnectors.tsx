import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  braveWallet,
  coinbaseWallet,
  ledgerWallet,
  metaMaskWallet,
  rainbowWallet,
  safeWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { configureChains } from "wagmi";
import * as chains from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import scaffoldConfig from "../../../../../scaffold.config";
import { getTargetNetwork } from "../../utils/scaffold-eth";

import { burnerWalletConfig } from "./wagmi-burner/burnerWalletConfig";

/**
 * Chains for the app
 */

const configuredNetwork = getTargetNetwork();
const { onlyLocalBurnerWallet } = scaffoldConfig;

// We always want to have mainnet enabled (ENS resolution, ETH price, etc). But only once.
const enabledChains = [...scaffoldConfig.targetNetworks];

export const appChains = configureChains(enabledChains, [publicProvider()], {
  stallTimeout: 3_000,
  ...(configuredNetwork.id !== chains.hardhat.id
    ? {
        pollingInterval: scaffoldConfig.pollingInterval,
      }
    : {}),
});

const walletsOptions = {
  chains: appChains.chains,
  projectId: scaffoldConfig.walletConnectProjectId,
};
const wallets = [
  metaMaskWallet({ ...walletsOptions, shimDisconnect: true }),
  walletConnectWallet(walletsOptions),
  ledgerWallet(walletsOptions),
  braveWallet(walletsOptions),
  coinbaseWallet({ ...walletsOptions, appName: "chi-protocol" }),
  rainbowWallet(walletsOptions),
  ...(configuredNetwork.id === chains.hardhat.id || !onlyLocalBurnerWallet
    ? [burnerWalletConfig({ chains: [appChains.chains[0]] })]
    : []),
  safeWallet({
    ...walletsOptions,
    debug: false,
    allowedDomains: [/gnosis-safe.io$/, /app.safe.global$/],
  }),
];

/**
 * wagmi connectors for the wagmi context
 */
export const wagmiConnectors = connectorsForWallets([
  {
    groupName: "Supported Wallets",
    wallets,
  },
]);
