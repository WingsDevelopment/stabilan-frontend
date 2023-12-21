"use client";

import { InputHTMLAttributes } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

import { InputSwitchField } from "../../input/InputSwitchField/InputSwitchField";

type IProps<T> = {
  name: keyof T;
  rules?: RegisterOptions;
  min?: number;
  max?: number;
  leftLabel?: string;
  rightLabel?: string;
};

type Props<T> = IProps<T> & InputHTMLAttributes<HTMLInputElement>;

export function RHFInputSwitchField<T>({
  name,
  rules,
  leftLabel,
  rightLabel,
  min = 0,
  max = 100,
  ...other
}: Props<T>) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) => (
        <InputSwitchField
          leftLabel={leftLabel}
          rightLabel={rightLabel}
          {...field}
          min={min}
          max={max}
          value={field.value || 0}
          {...other}
        />
      )}
    />
  );
}
