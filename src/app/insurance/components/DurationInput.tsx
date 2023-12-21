import React from "react";

import { RHFInputSliderField, Typography } from "../../../lib";
import { InsuranceFormData } from "../types/InsuranceFormData";

export const DurationInput = () => {
  return (
    <RHFInputSliderField<InsuranceFormData>
      label={<Typography type="body-bold">Duration</Typography>}
      rightLabel={
        <Typography type="h6" className="text-info">
          Months
        </Typography>
      }
      name="months"
      min={1}
      max={6}
    />
  );
};
