import { MockPriceFeedAggregatorComponent } from "./components/MockPriceFeedAggregatorForm.client";
import { Minterc20 } from "./components/Minterc20Form.client";
import { UpdateEpochButton } from "./components/UpdateEpochButton";

import { FlexCol, Typography } from "lib";

export default function Page() {
  return (
    <div className="flex flex-col gap-5">
      <FlexCol className="mb-12 gap-5">
        <Typography type="h2">Dashboard</Typography>
        <Typography type="meta">
          <strong>This is (admin)dashboard page </strong>
        </Typography>
      </FlexCol>
      <UpdateEpochButton />

      <FlexCol className="gap-10">
        <Minterc20 />
        <MockPriceFeedAggregatorComponent />
      </FlexCol>
    </div>
  );
}
