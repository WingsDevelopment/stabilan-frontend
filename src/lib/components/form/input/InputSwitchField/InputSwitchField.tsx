import cn from "classnames";
import React, { ChangeEventHandler, InputHTMLAttributes } from "react";

import { Typography } from "../../../text/Typography/Typography";

import styles from "./InputSwitchField.module.css";

interface InputSwitchFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  min: number;
  max: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[] | undefined;
  leftLabel?: string;
  rightLabel?: string;
  valueLabel?: string;
}

export const InputSwitchField = React.forwardRef<
  HTMLInputElement,
  InputSwitchFieldProps
>(({ min, max, value, leftLabel, rightLabel, onChange, ...rest }, ref) => {
  const classes = cn(styles.sliderContainer);

  return (
    <div className={classes}>
      <label className="relative inline-flex items-center cursor-pointer gap-3">
        {leftLabel && <Typography type="meta">{leftLabel}</Typography>}
        <div className="relative inline-flex items-center">
          <input
            ref={ref}
            title={leftLabel || ""}
            min={min}
            max={max}
            value={value}
            onChange={onChange}
            {...rest}
            type="checkbox"
            className="sr-only peer"
          />
          <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        </div>
        {rightLabel && <Typography type="meta">{rightLabel}</Typography>}
      </label>
    </div>
  );
});

InputSwitchField.displayName = "InputSwitchField";
