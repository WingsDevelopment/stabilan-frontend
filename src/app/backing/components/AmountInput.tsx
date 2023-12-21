import React from "react";

import { Typography } from "../../../lib";
import { RHFInputFieldS } from "../../../lib/components/form/rhf/RHFInputFieldS/RHFInputFieldS.client";
import { BackingFormData } from "../types/BackingFormData";

export const AmountInput: React.FC = () => {
  return (
    <RHFInputFieldS<BackingFormData>
      name="amount"
      label={<Typography type="body-bold">Amount</Typography>}
      rightLabel={
        <Typography type="h6" className="text-info">
          WETH
        </Typography>
      }
      placeholder="0.00"
      type="text"
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
