import React from "react";

import {
  Button,
  Card,
  Divider,
  FlexCol,
  FlexRow,
  Icon,
  Icons,
  Typography,
} from "../../../lib";
import { IToken } from "../types";
import { useTargetNetwork } from "../../../lib/client/hooks/useTargetNetwork";

import { DisplayAddress, buildTokenUrl } from "./DisplayAddress";

interface SummaryRow {
  label: string;
  value: React.ReactNode;
}

interface SummaryComponentProps {
  selectedToken: IToken | undefined;
  body: SummaryRow[];
  actionLabel: string;
  isActionLoading: boolean;
}

/**
 * SummaryComponent
 *
 * Provides a summary of the selected options including the token details and payment information.
 *
 * @param {SummaryComponentProps} props The props for the component.
 */
export const SummaryComponent: React.FC<SummaryComponentProps> = ({
  selectedToken,
  body,
  actionLabel,
  isActionLoading,
}) => {
  const { targetNetwork: network } = useTargetNetwork();

  return (
    <Card size="big">
      {selectedToken === undefined && (
        <FlexCol className="gap-6">
          <Typography type="h5">Summary</Typography>
          <Typography type="meta">Please select token</Typography>
        </FlexCol>
      )}
      {selectedToken && (
        <FlexCol className="gap-6">
          <Typography type="h5">Summary</Typography>
          <FlexRow className="gap-3 items-center">
            <Icon
              className="rounded-full"
              src={selectedToken.icon}
              width={64}
              height={64}
            />
            <FlexCol className="gap-3">
              <Typography type="body-bold">{selectedToken.name}</Typography>
              <Typography type="meta">
                {selectedToken.name === "WBTC" ? <>Bitcoin</> : <>Stablecoin</>}
              </Typography>
            </FlexCol>
          </FlexRow>

          <DisplayAddress
            address={buildTokenUrl(network, selectedToken?.name)}
          />

          <Divider />

          {body.map((row, index) => (
            <FlexRow key={index} className="justify-between">
              <FlexRow className="gap-2 items-center">
                <Typography>{row.label}</Typography>
                <Icon src={Icons.SolarInfoCircleBold} />
              </FlexRow>
              <Typography type="body-bold" className="text-info">
                {row.value}
              </Typography>
            </FlexRow>
          ))}

          <Divider />

          <Button
            color="success"
            size="big"
            type="submit"
            loading={isActionLoading}
          >
            {actionLabel}
          </Button>
        </FlexCol>
      )}
    </Card>
  );
};
