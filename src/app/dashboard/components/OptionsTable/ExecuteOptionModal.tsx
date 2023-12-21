import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { etherUnits, parseUnits } from "viem";

import { notification } from "../../../../lib/scaffold-lib/utils/scaffold-eth";
import { useWingsApprove } from "../../../../lib/client/hooks/useWingsApprove";
import { useFetchStabilanCoreCurrentEpoch } from "../../../state/stabilanCore/queires/useFetch-StabilanCore-CurrentEpoch";
import { useMutateStabilanCoreExecuteOptions } from "../../../state/stabilanCore/mutations/useMutate-StabilanCore-ExecuteOptions";
import { useFetchOptionTokenGetUserTokens } from "../../../state/optionToken/queires/useFetch-OptionToken-GetUserTokens";

import { Address0x } from "app/common/config/Contract-Addresses";
import {
  Button,
  FlexCol,
  GenericModal,
  GenericModalHandles,
  MyFormProvider,
  RHFInputField,
  Typography,
} from "lib";

interface FormData {
  amount: string;
}

export const ExecuteOptionModal: React.FC<{
  stabilanTokenAddress: Address0x;
  endEpoch: bigint | undefined;
}> = ({ stabilanTokenAddress, endEpoch }) => {
  //--LOCAL STATE--//
  const modalRef = useRef<GenericModalHandles>(null);
  const methods = useForm<FormData>({
    defaultValues: {
      amount: "",
    },
  });
  const { handleSubmit, reset, watch } = methods;
  const { amount } = watch();

  //--FETCH--//
  const { currentEpoch } = useFetchStabilanCoreCurrentEpoch();
  const { executeOptionsAsync, isExecutingOptions } =
    useMutateStabilanCoreExecuteOptions();

  const { userTokensAddress } = useFetchOptionTokenGetUserTokens();

  //--MUTATE--//
  const { approveAsync, isApproving, isApproved } = useWingsApprove(
    userTokensAddress,
    stabilanTokenAddress,
    parseUnits(String(amount), etherUnits.wei)
  );

  const onSubmitAsync = async (data: FormData) => {
    const value = parseUnits(String(data.amount), etherUnits.wei);
    if (!isApproved) {
      await approveAsync(value);
      return;
    }
    await executeOptionsAsync({
      args: [stabilanTokenAddress, value],
      onSuccess: () => {
        notification.success("Success");
      },
    });
  };

  //--JSX--//
  const modalContent = (
    <MyFormProvider methods={methods} onSubmit={handleSubmit(onSubmitAsync)}>
      <FlexCol className="gap-8">
        <Typography type="body-bold">Execute option</Typography>
        <FlexCol>
          <RHFInputField<FormData>
            name="amount"
            rightLabel={
              <FlexCol className="items-end content-center justify-center gap-4">
                <div className="flex flex-col items-end content-center justify-center">
                  <Typography type="body-bold">Max</Typography>
                  <Typography type="tiny">MAX: 0</Typography>
                </div>
                <Typography type="body-bold">ETH</Typography>
              </FlexCol>
            }
            placeholder="0"
            type="number"
          />
          <Button
            size="big"
            color="primary"
            className="flex-1 mt-4"
            type="submit"
            disabled={isApproving || isExecutingOptions}
          >
            {isApproved ? "Execute option" : "Approve"}
          </Button>
        </FlexCol>
      </FlexCol>
    </MyFormProvider>
  );

  // Execute option
  if ((currentEpoch || 0) > (endEpoch || 0)) return <span>Expired</span>;

  return (
    <GenericModal
      ref={modalRef}
      buttonProps={{
        color: "primary",
        className: "flex-1",
      }}
      buttonText="Execute option"
      onOpen={reset}
    >
      {modalContent}
    </GenericModal>
  );
};
