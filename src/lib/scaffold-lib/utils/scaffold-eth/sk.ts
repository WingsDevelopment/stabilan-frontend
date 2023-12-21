import { Hex, PrivateKeyAccount } from "viem";
import { generatePrivateKey } from "viem/accounts";
import { WalletClient } from "wagmi";

const burnerStorageKey = "scaffoldEth2.burnerWallet.sk";

/**
 * Is the private key valid
 * @internal
 * @param pk
 * @returns
 */
const isValidSk = (pk: Hex | string | undefined | null): boolean => {
  return pk?.length === 64 || pk?.length === 66;
};

/**
 * If no burner is found in localstorage, we will generate a random private key
 */
const newDefaultPriaveKey = generatePrivateKey();

/**
 * Save the current burner private key from storage
 * Can be used outside of react.  Used by the burnerConnector.
 * @internal
 * @returns
 */
export const saveBurnerSK = (privateKey: Hex): void => {
  if (typeof window != "undefined" && window != null) {
    window?.localStorage?.setItem(burnerStorageKey, privateKey);
  }
};

/**
 * Gets the current burner private key from storage
 * Can be used outside of react.  Used by the burnerConnector.
 * @internal
 * @returns
 */
export const loadBurnerSK = (): Hex => {
  let currentSk: Hex = "0x";
  if (typeof window != "undefined" && window != null) {
    currentSk = (window?.localStorage
      ?.getItem?.(burnerStorageKey)
      ?.replaceAll('"', "") ?? "0x") as Hex;
  }

  if (!!currentSk && isValidSk(currentSk)) {
    return currentSk;
  } else {
    saveBurnerSK(newDefaultPriaveKey);
    return newDefaultPriaveKey;
  }
};

/**
 * #### Summary
 * Return type of useBurnerSigner:
 *
 * ##### ✏️ Notes
 * - provides signer
 * - methods of interacting with burner signer
 * - methods to save and loadd signer from local storage
 *
 * @category Hooks
 */
export type TBurnerSigner = {
  walletClient: WalletClient | undefined;
  account: PrivateKeyAccount | undefined;
  /**
   * create a new burner signer
   */
  generateNewBurner: () => void;
  /**
   * explictly save burner to storage
   */
  saveBurner: () => void;
};
