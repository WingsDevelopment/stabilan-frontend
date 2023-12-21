"use client";

import { InputHTMLAttributes } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

import { InputSliderField } from "../../input/InputSliderField/InputSliderField";
import { InputSliderFieldS } from "../../input-stabilan/InputSliderField/InputSliderField";

type IProps<T> = {
  name: keyof T;
  rules?: RegisterOptions;
  min?: number;
  max?: number;
  label?: React.ReactNode;
  rightLabel?: React.ReactNode;
};

type Props<T> = IProps<T> & InputHTMLAttributes<HTMLInputElement>;

export function RHFInputSliderField<T>({
  name,
  rules,
  label,
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
        <InputSliderFieldS
          label={label}
          {...field}
          rightLabel={rightLabel}
          min={min}
          max={max}
          value={field.value || 0}
          {...other}
        />
      )}
    />
  );
}
