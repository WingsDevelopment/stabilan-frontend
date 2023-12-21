"use client";
import React, { InputHTMLAttributes } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

import { RadioInputField } from "../../input-stabilan/RadioInputField/RadioInputField.client";
import { Typography } from "../../../text/Typography/Typography";

type IProps<T> = {
  name: keyof T;
  rules?: RegisterOptions;
  options: { name: string; icon: string }[];
};

type Props<T> = IProps<T> & InputHTMLAttributes<HTMLInputElement>;

export const RHFTokenSelection = <T extends Record<string, any>>({
  name,
  options,
  rules,
  ...other
}: Props<T>) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          <div className="flex gap-3">
            {options.map((option, index) => (
              <RadioInputField
                key={index}
                option={option}
                {...other}
                isSelected={option.name === value}
                onSelect={() => onChange(option.name)}
              />
            ))}
          </div>
          {error && (
            <Typography className="text-error">{error?.message}</Typography>
          )}
        </div>
      )}
    />
  );
};
