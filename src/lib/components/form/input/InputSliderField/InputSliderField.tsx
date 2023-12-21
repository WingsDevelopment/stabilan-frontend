import cn from "classnames";
import React, { ChangeEventHandler, InputHTMLAttributes } from "react";

import { Icon } from "../../../icon/Icon/Icon";
import { Typography } from "../../../text/Typography/Typography";
import { Icons } from "../../../../meta";

import styles from "./InputSliderField.module.css";

interface InputSliderFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  min: number;
  max: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[] | undefined;
  label?: string;
  valueLabel?: string;
}

export const InputSliderField = React.forwardRef<
  HTMLInputElement,
  InputSliderFieldProps
>(({ min, max, value, label, valueLabel, onChange, ...rest }, ref) => {
  const classes = cn(styles.sliderContainer);
  const sliderClasses = cn(styles.sliderInput);

  const increment = () => {
    if (Number(value) < max) {
      const event = {
        target: {
          value: (Number(value) + 1).toString(),
          name: rest.name || "",
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const decrement = () => {
    if (Number(value) > min) {
      const event = {
        target: {
          value: (Number(value) - 1).toString(),
          name: rest.name || "",
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className={classes}>
      <div className="flex flex-row items-center justify-between">
        <Typography type="meta">{label}</Typography>
        <div className="flex flex-row items-center gap-3">
          <button type="button" onClick={decrement}>
            <Icon src={Icons.mingcute_minimize} width={16} height={16} />
          </button>
          <Typography type="meta">
            {value} {valueLabel}
          </Typography>
          <button type="button" onClick={increment}>
            <Icon src={Icons.mingcute_add} width={16} height={16} />
          </button>
        </div>
      </div>
      <input
        ref={ref}
        className={sliderClasses}
        type="range"
        title={label || ""}
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </div>
  );
});

InputSliderField.displayName = "InputSliderField";
