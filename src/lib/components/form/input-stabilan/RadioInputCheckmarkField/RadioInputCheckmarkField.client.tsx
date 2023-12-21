"use client";

import React from "react";
import { CheckmarkIcon } from "react-hot-toast";

import { Icon, Typography } from "lib"; // Adjust the import path as needed

interface RadioButtonProps {
  option: { name: string; icon: string };
  isSelected: boolean;
  onSelect: () => void;
}

export const RadioInputCheckmarkField: React.FC<RadioButtonProps> = ({
  option: token,
  isSelected,
  onSelect,
}) => (
  <div
    className={`cursor-pointer flex flex-col items-center rounded-2xl p-4 border border-dashed border-[rgba(145,158,171,0.2)] relative ${
      isSelected ? "border-primary" : ""
    }`}
    onClick={onSelect}
  >
    {isSelected && (
      <CheckmarkIcon className=" text-primary z-10 left-8 top-12 absolute" />
    )}
    <div className="min-h-[70px]">
      <Icon className="rounded-full" src={token.icon} width={55} height={55} />
    </div>
    <div className="flex flex-col gap-3 text-center">
      <Typography type="body-bold">{token.name}</Typography>
      <Typography type="meta">
        {token.name === "WBTC" ? <>Bitcoin</> : <>Stablecoin</>}
      </Typography>
    </div>
  </div>
);
