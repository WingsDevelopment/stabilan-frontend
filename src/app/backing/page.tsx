"use client";

import { useMemo } from "react";
import { etherUnits, formatUnits, parseUnits } from "viem";
import { useForm } from "react-hook-form";

import { Card, FlexCol, MyFormProvider, Typography } from "../../lib";
import { TermsAndConditionCard } from "../common/components/TermsAndConditionCard";
import { SummaryComponent } from "../common/components/SummaryComponent";
import { useFetchStabilanCoreGetAssetAPY } from "../state/stabilanCore/queires/useFetch-StabilanCore-GetAssetAPY";
import { useFetchStabilanCoreAssetsConfig } from "../state/stabilanCore/queires/useFetch-StabilanCore-AssetsConfig";
import { useWingsApprove } from "../../lib/client/hooks/useWingsApprove";
import { useMutateStabilanCoreBacking } from "../state/stabilanCore/mutations/useMutate-StabilanCore-Backing";
import { useFetchStabilanCoreCurrentEpoch } from "../state/stabilanCore/queires/useFetch-StabilanCore-CurrentEpoch";
import { RHFRadioInputCheckmarkField } from "../../lib/components/form/rhf/RHFRadioInputCheckmarkField/RHFRadioInputCheckmarkField.client";

import { AmountInput } from "./components/AmountInput";
import { DurationInput } from "./components/DurationInput";
import { BackingFormData } from "./types/BackingFormData";

import {
  AvailableChains,
  contractAddressesByChain,
} from "app/common/config/Contract-Addresses";
import { getAddressByTokenAndNetwork, tokens } from "app/common/config/tokens";
import { getDateAsLastDayOfTheMonth } from "lib/utils/date/find-last-day-of-the-month";
import { useTargetNetwork } from "lib/client/hooks/useTargetNetwork";

export default function Page() {
  const { targetNetwork: network } = useTargetNetwork();

  //--LOCAL STATE--//
  const methods = useForm<BackingFormData>({
    defaultValues: {
      amount: "",
      months: 1,
      selectedToken: tokens[0].name,
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const { amount, months, selectedToken } = watch();

  const token = useMemo(
    () => tokens.find((x) => x.name === selectedToken),
    [selectedToken]
  );

  //--FETCH--//
  const { getAssetAPY } = useFetchStabilanCoreGetAssetAPY(token);
  const { assetsConfigAddress } = useFetchStabilanCoreAssetsConfig(token);
  const { currentTime } = useFetchStabilanCoreCurrentEpoch();

  //--MUTATIONS--//
  const { approveAsync, isApproved, isApproving } = useWingsApprove(
    assetsConfigAddress,
    contractAddressesByChain[network.modifiedName as AvailableChains]
      ?.StabilanCore,
    parseUnits(String(amount), etherUnits.wei)
  );

  const { backAsync, isBacking } = useMutateStabilanCoreBacking();

  const onSubmitAsync = async (data: BackingFormData) => {
    if (!isApproved) {
      await approveAsync(parseUnits(String(data.amount), etherUnits.wei));
      return;
    }

    await backAsync({
      args: [
        getAddressByTokenAndNetwork(data.selectedToken, network.modifiedName),
        parseUnits(String(data.amount), etherUnits.wei),
        BigInt(data.months),
      ],
      onSuccess: () => reset(),
    });
  };

  //--JSX--//
  const summaryBody = useMemo(
    () => [
      { label: "Pay in", value: selectedToken },
      {
        label: "Until",
        value: getDateAsLastDayOfTheMonth({
          numberOfMonths: months - 1,
          dateFrom: currentTime,
        })?.toDateString(),
      },
      {
        label: "Cost",
        value: `${amount} ${selectedToken || ""}`,
      },
      {
        label: "APY",
        value: getAssetAPY
          ? `${(Number(formatUnits(getAssetAPY, etherUnits.wei)) * 100).toFixed(
              2
            )}%`
          : "/",
      },
    ],
    [selectedToken, months, currentTime, amount, getAssetAPY]
  );

  return (
    <div className="flex flex-col gap-5">
      <FlexCol className="mb-12 gap-5">
        <Typography type="h2">Back asset</Typography>
        <Typography type="meta">
          <strong>Select Token </strong>& Enter the amount you want to cover and
          for how long.
        </Typography>
      </FlexCol>

      <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
        <FlexCol className="gap-3">
          <RHFRadioInputCheckmarkField<BackingFormData>
            name="selectedToken"
            options={tokens.map((token) => ({
              name: token.name,
              icon: token.icon,
            }))}
            rules={{
              required: "Required",
            }}
          />

          <div className="grid grid-cols-12 gap-4">
            <div className="md:col-span-8 col-span-12 gap-12 flex flex-col mb-0 md:mb-10">
              <Card size="big">
                <Typography type="h5">Quote details</Typography>
                <br />
                <div className="flex flex-col gap-12">
                  <Typography type="body-regular">
                    This product covers any token or combination of tokens you
                    have in the Protocol. In case of a claim, you`ll receive the
                    equivalent of your lost funds in ETH up to the covered
                    amount.
                  </Typography>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="col-span-1">
                      <DurationInput />
                    </div>
                    <div className="col-span-1">
                      <AmountInput />
                    </div>
                  </div>
                </div>
              </Card>

              <TermsAndConditionCard />
            </div>
            <div className="md:col-span-4 col-span-12">
              <SummaryComponent
                selectedToken={token}
                body={summaryBody}
                actionLabel={isApproved ? "Pay" : "Approve"}
                isActionLoading={isBacking || isApproving}
              />
            </div>
          </div>
        </FlexCol>
      </MyFormProvider>
    </div>
  );
}
