import React from "react";

import { Typography } from "../../../lib";
import { RHFInputFieldS } from "../../../lib/components/form/rhf/RHFInputFieldS/RHFInputFieldS.client";
import { InsuranceFormData } from "../types/InsuranceFormData";
import { displayTokens } from "../../../lib/utils/tokens/display-tokens";

export const AmountInput: React.FC<{
  selectedTokenName?: string;
  maxAmount?: bigint | undefined;
}> = ({ selectedTokenName, maxAmount }) => {
  return (
    <RHFInputFieldS<InsuranceFormData>
      name="amount"
      label={<Typography type="body-bold">Amount</Typography>}
      rightLabel={
        <Typography type="h6" className="text-info">
          {selectedTokenName || "/"}
        </Typography>
      }
      placeholder="0.00"
      type="text"
      downLabel={
        <Typography type="body-bold">
          Max: <>{displayTokens(maxAmount, {}) || "/"}</>
        </Typography>
      }
      rules={{
        min: {
          value: 0,
          message: "Min value is zero",
        },
        required: "Required",
      }}
    />
  );
};
