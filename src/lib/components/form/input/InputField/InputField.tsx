import cn from "classnames";
import React, {
  ChangeEventHandler,
  InputHTMLAttributes,
  ReactNode,
} from "react";

import { Typography } from "../../../text/Typography/Typography";

import styles from "./InputField.module.css";

interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  value?: string | number | readonly string[] | undefined;
  onChange: ChangeEventHandler<HTMLInputElement> | undefined;
  rightLabel?: ReactNode;
  leftLabel?: ReactNode;
  placeholder?: string;
  fullWidth?: boolean;
  errorMessage?: string | undefined;
}

export const InputField = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value,
      onChange,
      name,
      rightLabel,
      leftLabel,
      placeholder,
      fullWidth,
      className,
      errorMessage,
      ...rest
    },
    ref
  ) => {
    const classes = cn(styles.container, { ["w-full"]: fullWidth }, className);
    const inputClasses = cn(styles.inputFont, styles.inputRoot);

    return (
      <div>
        <div className={classes}>
          {leftLabel && <span className="inline-block w-32">{leftLabel}</span>}
          <input
            ref={ref}
            className={inputClasses}
            autoComplete="off"
            value={value}
            name={name}
            onChange={onChange}
            placeholder={placeholder}
            // todo: review this
            min={0}
            {...rest}
          />
          {rightLabel && <span>{rightLabel}</span>}
        </div>
        {errorMessage && (
          <Typography className="text-error">{errorMessage}</Typography>
        )}
      </div>
    );
  }
);

InputField.displayName = "InputField";
