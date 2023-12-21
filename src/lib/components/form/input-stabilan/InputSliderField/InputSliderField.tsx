import cn from "classnames";
import React, { ChangeEventHandler, InputHTMLAttributes } from "react";

import styles from "./InputSliderField.module.css";

interface InputSliderFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  min: number;
  max: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[] | undefined;
  label?: React.ReactNode;
  rightLabel?: React.ReactNode;
}

export const InputSliderFieldS = React.forwardRef<
  HTMLInputElement,
  InputSliderFieldProps
>(({ min, max, value, label, onChange, rightLabel, ...rest }, ref) => {
  const classes = cn(styles.sliderContainer);
  const sliderClasses = cn(styles.sliderInput);

  return (
    <div className={`${classes} border focus-within:border-success`}>
      {label && <div className="flex mb-4">{label}</div>}
      <div className="flex flex-row items-center flex-wrap">
        <input
          ref={ref}
          className="text-2xl flex-1 outline-none bg-transparent not-italic min-w-0"
          autoComplete="off"
          value={value}
          name={rest.name}
          onChange={onChange}
          placeholder={rest.placeholder}
          min={min}
          max={max}
          {...rest}
        />
        {rightLabel && <span>{rightLabel}</span>}
      </div>
      <div className="mt-2">
        <input
          ref={ref}
          className={sliderClasses}
          type="range"
          title={rest.name || ""}
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          {...rest}
        />
      </div>
    </div>
  );
});

InputSliderFieldS.displayName = "InputSliderFieldS";
