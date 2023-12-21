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
  downLabel?: ReactNode;
  label?: ReactNode;
  placeholder?: string;
  fullWidth?: boolean;
  errorMessage?: string;
}

export const InputFieldS = React.forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      value,
      onChange,
      name,
      rightLabel,
      downLabel,
      label,
      placeholder,
      fullWidth,
      className,
      errorMessage,
      ...rest
    },
    ref
  ) => {
    const classes = cn(styles.container, { ["w-full"]: fullWidth }, className);

    return (
      <div>
        <div className={`${classes} border focus-within:border-success`}>
          {label && <div className="flex mb-4">{label}</div>}
          <div
            className={`flex flex-row items-center flex-wrap ${
              downLabel ? "" : "mb-[30px]"
            }`}
          >
            <input
              ref={ref}
              className="text-2xl flex-1 outline-none bg-transparent not-italic min-w-0"
              autoComplete="off"
              value={value}
              name={name}
              onChange={onChange}
              placeholder={placeholder}
              {...rest}
            />
            {rightLabel && <div className="flex-shrink-0">{rightLabel}</div>}
          </div>
          {downLabel && <div className="mt-3">{downLabel}</div>}
        </div>
        {errorMessage && (
          <Typography className="text-error">{errorMessage}</Typography>
        )}
      </div>
    );
  }
);

InputFieldS.displayName = "InputFieldS";
