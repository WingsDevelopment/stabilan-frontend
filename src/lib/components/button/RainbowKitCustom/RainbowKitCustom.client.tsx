"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import { useAccount } from "wagmi";

import { Button } from "../..";
import { useAutoConnect } from "../../../client/hooks/useAutoConnect";
import { useWingsContractRead } from "../../../client/hooks/useWingsContractRead";
import { Address0x } from "../../../../app/common/config/Contract-Addresses";
import { displayTokens } from "../../../utils/tokens/display-tokens";

export const RainbowKitCustom = () => {
  useAutoConnect();
  const { address } = useAccount();

  const { data: daoToken } = useWingsContractRead({
    contractName: "StabilanCore",
    functionName: "daoToken",
  });

  const { data: daoTokenBalance } = useWingsContractRead({
    contractName: "MockERC20",
    functionName: "balanceOf",
    enabled: !!daoToken,
    overrideContractAddress: {
      address: daoToken,
    },
    args: [address as Address0x],
  });

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button size="big" color="success" onClick={openConnectModal}>
                    Connect wallet
                  </Button>
                );
              }
              if (chain.unsupported) {
                return (
                  <Button size="big" color="warning" onClick={openChainModal}>
                    Wrong network
                  </Button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                            width={12}
                            height={12}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>
                  <Button onClick={openAccountModal} size="big" color="success">
                    {`(${displayTokens(daoTokenBalance, {
                      tokenLabel: "DAO",
                    })})`}

                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </Button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
