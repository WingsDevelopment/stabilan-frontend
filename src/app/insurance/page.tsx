"use client";

import { useMemo } from "react";
import { etherUnits, formatUnits, parseUnits } from "viem";
import { useForm } from "react-hook-form";

import { Card, FlexCol, FlexRow, MyFormProvider, Typography } from "../../lib";
import { TermsAndConditionCard } from "../common/components/TermsAndConditionCard";
import { useFetchStabilanCoreGetOptionsPrice } from "../state/stabilanCore/queires/useFetch-StabilanCore-GetOptionsPrice";
import { useFetchStabilanCoreCurrentEpoch } from "../state/stabilanCore/queires/useFetch-StabilanCore-CurrentEpoch";
import { useFetchStabilanCoreStrikePrice } from "../state/stabilanCore/queires/useFtch-StabilanCore-StrikePrice";
import { useFetchStabilanCoreAssetsConfig } from "../state/stabilanCore/queires/useFetch-StabilanCore-AssetsConfig";
import { useFetchStabilanCoreMaxOptionAmount } from "../state/stabilanCore/queires/useFetch-StabilanCore-MaxOptionAmount";
import { useWingsApprove } from "../../lib/client/hooks/useWingsApprove";
import { useStabilanCoreBuyOptions } from "../state/stabilanCore/mutations/useMutate-StabilanCore-BuyOptions";
import { SummaryComponent } from "../common/components/SummaryComponent";
import { RHFRadioInputCheckmarkField } from "../../lib/components/form/rhf/RHFRadioInputCheckmarkField/RHFRadioInputCheckmarkField.client";

import { DurationInput } from "./components/DurationInput";
import { AmountInput } from "./components/AmountInput";
import { InsuranceFormData } from "./types/InsuranceFormData";

import {
  AvailableChains,
  contractAddressesByChain,
} from "app/common/config/Contract-Addresses";
import { getAddressByTokenAndNetwork, tokens } from "app/common/config/tokens";
import { getDateAsLastDayOfTheMonth } from "lib/utils/date/find-last-day-of-the-month";
import { displayTokens } from "lib/utils/tokens/display-tokens";
import { useTargetNetwork } from "lib/client/hooks/useTargetNetwork";

export default function Page() {
  const { targetNetwork: network } = useTargetNetwork();

  //--LOCAL STATE--/
  const methods = useForm<InsuranceFormData>({
    defaultValues: {
      months: 1,
      amount: "",
      selectedToken: tokens[0].name,
    },
  });
  const { handleSubmit, watch, reset } = methods;
  const { months, amount, selectedToken } = watch();

  const token = useMemo(
    () => tokens.find((x) => x.name === selectedToken),
    [selectedToken]
  );

  //--FETCH--//
  const { currentEpoch, currentTime } = useFetchStabilanCoreCurrentEpoch();
  const { strikePrice } = useFetchStabilanCoreStrikePrice(token, currentEpoch);
  const { assetsConfigAddress } = useFetchStabilanCoreAssetsConfig(token);
  const { getOptionsPriceValue } = useFetchStabilanCoreGetOptionsPrice(
    token,
    amount,
    months,
    assetsConfigAddress
  );
  const { getMaxOptionAmount } = useFetchStabilanCoreMaxOptionAmount(
    token,
    months
  );

  //--MUTATIONS--//
  const { approveAsync, isApproved, isApproving } = useWingsApprove(
    assetsConfigAddress,
    contractAddressesByChain[network.modifiedName as AvailableChains]
      ?.StabilanCore,
    getOptionsPriceValue
  );

  const { buyOptionsAsync, isBuying } = useStabilanCoreBuyOptions();

  const onSubmitAsync = async (data: InsuranceFormData) => {
    if (!isApproved) {
      await approveAsync(getOptionsPriceValue);
      return;
    }

    await buyOptionsAsync({
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
        label: "Strike price",
        value: strikePrice
          ? displayTokens(strikePrice, { tokenLabel: "$" })
          : "/",
      },
      {
        label: "Cost",
        value: formatUnits(getOptionsPriceValue || 0n, etherUnits.wei),
      },
    ],
    [selectedToken, strikePrice, getOptionsPriceValue, months, currentTime]
  );

  return (
    <div className="flex flex-col gap-5">
      <FlexCol className="mb-12 gap-5">
        <Typography type="h2">Buy insurance</Typography>
        <Typography type="meta">
          <strong>Select Token </strong>& Enter the amount you want to cover and
          for how long.
        </Typography>
      </FlexCol>

      <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
        <FlexCol className="gap-3">
          <RHFRadioInputCheckmarkField<InsuranceFormData>
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
            <div className="md:col-span-8 col-span-12 gap-12 flex flex-col">
              <Card size="big">
                <FlexRow className="content-start justify-between">
                  <Typography type="h5">Quote details</Typography>
                </FlexRow>
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
                      <AmountInput
                        selectedTokenName={selectedToken}
                        maxAmount={getMaxOptionAmount}
                      />
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
                isActionLoading={isBuying || isApproving}
              />
            </div>
          </div>
        </FlexCol>
      </MyFormProvider>
    </div>
  );
}
