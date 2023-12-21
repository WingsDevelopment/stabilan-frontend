"use client";

import { InputHTMLAttributes, ReactNode } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

import { InputField } from "../../input/InputField/InputField";

type IProps<T> = {
  name: keyof T;
  rightLabel?: ReactNode;
  leftLabel?: ReactNode;
  rules?: RegisterOptions;
  fullWidth?: boolean;
};

type Props<T> = IProps<T> & InputHTMLAttributes<HTMLInputElement>;

export function RHFInputField<T>({
  name,
  rules,
  rightLabel,
  leftLabel,
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
        <InputField
          {...field}
          fullWidth={fullWidth}
          rightLabel={rightLabel}
          leftLabel={leftLabel}
          value={field.value || ""}
          errorMessage={error?.message}
          {...other}
        />
      )}
    />
  );
}
