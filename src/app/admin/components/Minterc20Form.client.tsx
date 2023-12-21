"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";
import { etherUnits, parseUnits } from "viem";

import { useMutateErc20Mint } from "../../state/erc20/mutations/useMutate-erc20-Mint";
import { RHFTokenSelection } from "../../../lib/components/form/rhf/RHFRadioInputField/RHFRadioInputField.client";
import { Address0x } from "../../common/config/Contract-Addresses";
import { allTokens } from "../../common/config/tokens";

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

export const Minterc20 = () => {
  const { address } = useAccount();
  const methods = useForm<FormData>({
    defaultValues: {
      amount: "",
      selectedToken: allTokens[0].name,
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const { amount, selectedToken } = watch();

  const { mintAsync, isMinting } = useMutateErc20Mint(
    allTokens.find((x) => x.name === selectedToken)
  );

  const onSubmitAsync = async (data: FormData) => {
    if (data.selectedToken && Number(data.amount) > 0) {
      await mintAsync({
        args: [address as Address0x, parseUnits(data.amount, etherUnits.wei)],
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
            <Typography type="h5">minterc20</Typography>
            <RHFTokenSelection<FormData>
              name="selectedToken"
              options={allTokens.map((token) => ({
                name: token.name,
                icon: token.icon,
              }))}
              rules={{
                required: "Required",
              }}
            />
            <RHFInputField<FormData>
              name="amount"
              rightLabel="Amount"
              value={amount}
              placeholder="0.00"
              type="text"
              rules={{
                min: {
                  value: 0,
                  message: "Min value is zero",
                },
                required: "Required",
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
