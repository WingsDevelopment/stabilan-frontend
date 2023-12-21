"use client";

import Link from "next/link";
import { useState } from "react";

import { Typography } from "../../../lib";
import { getAddressByTokenAndNetwork } from "../config/tokens";
import { ModifiedNetwork } from "../../../lib/scaffold-lib/utils/scaffold-eth";

export const buildTokenUrl = (network: ModifiedNetwork, tokenName?: string) => {
  return `${
    network.blockExplorers?.default.url
  }/token/${getAddressByTokenAndNetwork(tokenName, network.modifiedName)}`;
};

export const DisplayAddress: React.FC<{
  address?: string;
}> = ({ address }) => {
  const [isHidden, setIsHidden] = useState(true);

  return (
    <>
      <span
        onClick={() => {
          setIsHidden(!isHidden);
        }}
      >
        <Typography type="meta" className="text-primary cursor-pointer">
          🚿 {isHidden ? "Display" : "Hide"} address
        </Typography>
      </span>
      {!isHidden && (
        <Link href={address || "#"} target="_blank">
          <Typography type="meta" className="break-words">
            {address}
          </Typography>
        </Link>
      )}
    </>
  );
};
