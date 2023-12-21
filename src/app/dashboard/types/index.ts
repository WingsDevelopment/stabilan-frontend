import { Address0x } from "app/common/config/Contract-Addresses";

export enum TokenType {
  OPTION = 0,
  BACKING = 1,
}

export interface UserToken {
  tokenType: TokenType;
  stabilanTokenAddress: Address0x;
  undelyingAssetAddress: Address0x;
  backedAsset: Address0x;
  endEpoch: number;
  balance: number;
}
