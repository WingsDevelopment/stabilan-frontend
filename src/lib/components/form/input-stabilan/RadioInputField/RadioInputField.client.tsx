"use client";

import React from "react";

import { Icon, Typography } from "lib"; // Adjust the import path as needed

interface RadioButtonProps {
  option: { name: string; icon: string };
  isSelected: boolean;
  onSelect: () => void;
}

export const RadioInputField: React.FC<RadioButtonProps> = ({
  option: token,
  isSelected,
  onSelect,
}) => (
  <div
    className={`cursor-pointer flex flex-col items-center rounded-2xl p-4 border border-dashed 
                ${
                  isSelected
                    ? "border-primary"
                    : "border-[rgba(145,158,171,0.2)]"
                }`}
    onClick={onSelect}
  >
    <Icon className="rounded-full" src={token.icon} width={55} height={55} />
    <Typography type="body-bold">{token.name}</Typography>
    <Typography type="meta">
      {token.name === "WBTC" ? <>Bitcoin</> : <>Stablecoin</>}
    </Typography>
  </div>
);
