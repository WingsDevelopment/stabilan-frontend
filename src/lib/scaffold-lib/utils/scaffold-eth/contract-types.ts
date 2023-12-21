import { Abi } from "viem";

import { Address0x } from "app/common/config/Contract-Addresses";

export type InheritedFunctions = { readonly [key: string]: string };

export type GenericContract = {
  address: Address0x;
  abi: Abi;
  inheritedFunctions?: InheritedFunctions;
};

export type GenericContractsDeclaration = {
  [chainId: number]: {
    [contractName: string]: GenericContract;
  };
};
