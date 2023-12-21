import { Icons } from "../../../lib";

import {
  Address0x,
  AvailableChains,
  contractAddressesByChain,
} from "./Contract-Addresses";

export type AvailableTokens = "USDC" | "USDT" | "Gho" | "WBTC" | "INSRD";

export const tokens = [
  {
    name: "USDC",
    icon: Icons.tokenUsdc,
    avalancheFuji: { address: contractAddressesByChain.avalancheFuji.USDC },
    polygonZkevmTestnet: {
      address: contractAddressesByChain.polygonZkevmTestnet.USDC,
    },
    baseGoerli: { address: contractAddressesByChain.baseGoerli.USDC },
  },
  {
    name: "USDT",
    icon: Icons.tokenUsdt,
    avalancheFuji: { address: contractAddressesByChain.avalancheFuji.USDT },
    baseGoerli: { address: contractAddressesByChain.baseGoerli.USDT },
    polygonZkevmTestnet: {
      address: contractAddressesByChain.polygonZkevmTestnet.USDT,
    },
  },
  {
    name: "Gho",
    icon: Icons.tokenGho,
    avalancheFuji: { address: contractAddressesByChain.avalancheFuji.GHO },
    baseGoerli: { address: contractAddressesByChain.baseGoerli.GHO },
    polygonZkevmTestnet: {
      address: contractAddressesByChain.polygonZkevmTestnet.GHO,
    },
  },
  {
    name: "WBTC",
    icon: Icons.tokenWBTC,
    avalancheFuji: { address: contractAddressesByChain.avalancheFuji.WBTC },
    baseGoerli: { address: contractAddressesByChain.baseGoerli.WBTC },
    polygonZkevmTestnet: {
      address: contractAddressesByChain.polygonZkevmTestnet.WBTC,
    },
  },
  {
    name: "INSRD",
    icon: Icons.tokenINSRD,
    avalancheFuji: { address: contractAddressesByChain.avalancheFuji.INSRD },
    baseGoerli: { address: contractAddressesByChain.baseGoerli.INSRD },
    polygonZkevmTestnet: {
      address: contractAddressesByChain.polygonZkevmTestnet.INSRD,
    },
  },
];

export const allTokens = [
  {
    name: "USDC",
    icon: Icons.tokenUsdc,
    avalancheFuji: { address: contractAddressesByChain.avalancheFuji.USDC },
    polygonZkevmTestnet: {
      address: contractAddressesByChain.polygonZkevmTestnet.USDC,
    },
    baseGoerli: { address: contractAddressesByChain.baseGoerli.USDC },
  },
  {
    name: "USDT",
    icon: Icons.tokenUsdt,
    avalancheFuji: { address: contractAddressesByChain.avalancheFuji.USDT },
    baseGoerli: { address: contractAddressesByChain.baseGoerli.USDT },
    polygonZkevmTestnet: {
      address: contractAddressesByChain.polygonZkevmTestnet.USDT,
    },
  },
  {
    name: "Gho",
    icon: Icons.tokenGho,
    avalancheFuji: { address: contractAddressesByChain.avalancheFuji.GHO },
    baseGoerli: { address: contractAddressesByChain.baseGoerli.GHO },
    polygonZkevmTestnet: {
      address: contractAddressesByChain.polygonZkevmTestnet.GHO,
    },
  },
  {
    name: "WBTC",
    icon: Icons.tokenWBTC,
    avalancheFuji: { address: contractAddressesByChain.avalancheFuji.WBTC },
    baseGoerli: { address: contractAddressesByChain.baseGoerli.WBTC },
    polygonZkevmTestnet: {
      address: contractAddressesByChain.polygonZkevmTestnet.WBTC,
    },
  },
  {
    name: "INSRD",
    icon: Icons.tokenINSRD,
    avalancheFuji: { address: contractAddressesByChain.avalancheFuji.INSRD },
    baseGoerli: { address: contractAddressesByChain.baseGoerli.INSRD },
    polygonZkevmTestnet: {
      address: contractAddressesByChain.polygonZkevmTestnet.INSRD,
    },
  },
  {
    name: "WETH",
    icon: Icons.tokenWETH,
    avalancheFuji: { address: contractAddressesByChain.avalancheFuji.WETH },
    polygonZkevmTestnet: {
      address: contractAddressesByChain.polygonZkevmTestnet.WETH,
    },
    baseGoerli: { address: contractAddressesByChain.baseGoerli.WETH },
  },
];

/**
 * Retrieves the contract address for a given token and network.
 *
 * @param {string} tokenName - The name of the token.
 * @param {string} networkName - The name of the network.
 * @returns {string | undefined} The contract address of the token on the specified network, or undefined if not found.
 *
 * @example
 * // Assuming 'USDC' token and 'sepolia' network are valid and exist in the tokens array
 * getAddressByTokenAndNetwork('USDC', 'sepolia'); // returns the contract address of USDC on the Sepolia network
 *
 * @example
 * // Returns undefined if the token or network name is not found
 * getAddressByTokenAndNetwork('NonExistentToken', 'sepolia'); // undefined
 * getAddressByTokenAndNetwork('USDC', 'NonExistentNetwork'); // undefined
 */
export function getAddressByTokenAndNetwork(
  tokenName: string | undefined,
  networkName: string | undefined
): Address0x | undefined {
  // Find the token in the array
  const token = tokens.find((token) => token.name === tokenName);

  if (!token) {
    console.error(`Token ${tokenName} not found.`);
    return undefined;
  }

  // Extract the address for the specified network
  const address = token[networkName as AvailableChains]?.address;

  if (!address) {
    console.error(
      `Address for ${networkName} not found for token ${tokenName}.`
    );
    return undefined;
  }

  return address;
}

export function findTokenByAddress(
  address: Address0x,
  networkName: string
): { name: string; icon: string } | undefined {
  const networkKey = networkName as AvailableChains; // Cast to AvailableChains type
  return tokens.find((token) => token[networkKey]?.address === address);
}

export function findContractKeyByAddress(
  address: Address0x,
  networkName: string
): string | undefined {
  const networkKey = networkName as AvailableChains;
  const networkContracts = contractAddressesByChain[networkKey];

  for (const contractKey in networkContracts) {
    if ((networkContracts as any)[contractKey] === address) {
      return contractKey;
    }
  }

  return undefined;
}
