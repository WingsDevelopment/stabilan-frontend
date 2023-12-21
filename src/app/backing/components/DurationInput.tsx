import React from "react";

import { RHFInputSliderField, Typography } from "../../../lib";
import { BackingFormData } from "../types/BackingFormData";

export const DurationInput = () => {
  return (
    <RHFInputSliderField<BackingFormData>
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
