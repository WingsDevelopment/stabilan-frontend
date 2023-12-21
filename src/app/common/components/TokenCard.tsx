// TokenCard.tsx
import { CheckmarkIcon } from "react-hot-toast";

import { Icon, Typography } from "../../../lib";

interface Token {
  name: string;
  icon: string;
}

// Define the props interface
interface TokenCardProps {
  token: Token;
  isSelected: boolean;
  onSelect: (token: Token) => void;
}

const TokenCard: React.FC<TokenCardProps> = ({
  token,
  isSelected,
  onSelect,
}) => {
  return (
    <div
      className={`cursor-pointer flex flex-col items-center rounded-2xl p-4 border border-dashed border-[rgba(145,158,171,0.2)] relative ${
        isSelected ? "border-primary" : ""
      }`}
      onClick={() => onSelect(token)}
    >
      {isSelected && (
        <CheckmarkIcon className=" text-primary z-10 left-8 top-12 absolute" />
      )}
      <div className="min-h-[70px]">
        <Icon
          className="rounded-full"
          src={token.icon}
          width={55}
          height={55}
        />
      </div>
      <div className="flex flex-col gap-3 text-center">
        <Typography type="body-bold">{token.name}</Typography>
        <Typography type="meta">
          {token.name === "WBTC" ? <>Bitcoin</> : <>Stablecoin</>}
        </Typography>
      </div>
    </div>
  );
};

export default TokenCard;
