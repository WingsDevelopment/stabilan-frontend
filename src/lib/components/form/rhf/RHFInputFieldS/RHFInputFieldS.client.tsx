"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

import { InputFieldS } from "../../input-stabilan/InputFieldS/InputFieldS";

type IProps<T> = {
  name: keyof T;
  rightLabel?: ReactNode;
  label?: ReactNode;
  leftLabel?: ReactNode;
  downLabel?: ReactNode;
  rules?: RegisterOptions;
  fullWidth?: boolean;
};

type Props<T> = IProps<T> & InputHTMLAttributes<HTMLInputElement>;

export function RHFInputFieldS<T>({
  name,
  rules,
  label,
  rightLabel,
  leftLabel,
  downLabel,
  fullWidth = true,
  ...other
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <InputFieldS
          {...field}
          fullWidth={fullWidth}
          label={label}
          rightLabel={rightLabel}
          downLabel={downLabel}
          value={field.value || ""}
          errorMessage={error?.message}
          {...other}
        />
      )}
    />
  );
}
