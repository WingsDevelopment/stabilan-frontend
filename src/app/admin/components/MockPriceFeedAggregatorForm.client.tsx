"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { etherUnits, parseUnits } from "viem";

import { useMutateErc20Mint } from "../../state/erc20/mutations/useMutate-erc20-Mint";
import { RHFTokenSelection } from "../../../lib/components/form/rhf/RHFRadioInputField/RHFRadioInputField.client";

import { tokens } from "app/common/config/tokens";
import {
  Button,
  Card,
  FlexCol,
  MyFormProvider,
  RHFInputField,
  Typography,
} from "lib";

interface FormData {
  amount: string;
  selectedToken: string;
}

export const MockPriceFeedAggregatorComponent = () => {
  const methods = useForm<FormData>({
    defaultValues: {
      amount: "",
      selectedToken: "",
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const { selectedToken } = watch();

  const { mintAsync, isMinting } = useMutateErc20Mint(
    tokens.find((x) => x.name === selectedToken)
  );

  const onSubmitAsync = async (data: FormData) => {
    if (data.selectedToken && Number(data.amount) > 0) {
      await mintAsync({
        args: [undefined, parseUnits(data.amount, etherUnits.wei)],
        onSuccess: () => {
          reset();
        },
      });
    }
  };

  return (
    <div>
      <Card>
        <MyFormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmitAsync)}
        >
          <FlexCol className="gap-4 flex-wrap">
            <Typography type="h5">MockPriceFeedAggregator</Typography>
            <RHFTokenSelection<FormData>
              name="selectedToken"
              options={tokens.map((token) => ({
                name: token.name,
                icon: token.icon,
              }))}
            />
            <RHFInputField<FormData>
              name="amount"
              rightLabel="Set price"
              type="number"
              rules={{
                min: {
                  value: 0,
                  message: "Min value is zero",
                },
                required: "Amount is required",
              }}
            />
            <Button
              className="w-48"
              color="error"
              loading={isMinting}
              type="submit"
            >
              Mint
            </Button>
          </FlexCol>
        </MyFormProvider>
      </Card>
    </div>
  );
};
