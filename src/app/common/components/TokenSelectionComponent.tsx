import React from "react";

import { IToken } from "../types";

import TokenCard from "./TokenCard";

interface TokenSelectionProps {
  tokens: IToken[];
  selectedToken: IToken | undefined;
  onSelectToken: (token: IToken) => void;
}

/**
 * TokenSelectionComponent
 *
 * Displays a grid of tokens allowing the user to select one.
 *
 * @param {TokenSelectionProps} props The props for the component.
 */
export const TokenSelectionComponent: React.FC<TokenSelectionProps> = ({
  tokens,
  selectedToken,
  onSelectToken,
}) => (
  <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
    {tokens.map((token, index) => (
      <TokenCard
        key={index}
        token={token}
        isSelected={selectedToken?.name === token.name}
        onSelect={() => onSelectToken(token)}
      />
    ))}
  </div>
);
