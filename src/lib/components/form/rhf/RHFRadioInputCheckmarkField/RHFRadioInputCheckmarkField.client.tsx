"use client";
import React, { InputHTMLAttributes } from "react";
import { Controller, RegisterOptions, useFormContext } from "react-hook-form";

import { Typography } from "../../../text/Typography/Typography";
import { RadioInputCheckmarkField } from "../../input-stabilan/RadioInputCheckmarkField/RadioInputCheckmarkField.client";

type IProps<T> = {
  name: keyof T;
  rules?: RegisterOptions;
  options: { name: string; icon: string }[];
};

type Props<T> = IProps<T> & InputHTMLAttributes<HTMLInputElement>;

export const RHFRadioInputCheckmarkField = <T extends Record<string, any>>({
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
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
            {options.map((option, index) => (
              <RadioInputCheckmarkField
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
