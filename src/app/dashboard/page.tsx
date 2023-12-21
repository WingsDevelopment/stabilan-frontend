import { OptionsTable } from "./components/OptionsTable/OptionsTable";
import { BackingTable } from "./components/BackingTable/BackingTable";

import { Card, FlexCol, Typography } from "lib";

export default function Page() {
  return (
    <div>
      <FlexCol className="mb-12 gap-5">
        <Typography type="h2">Dashboard</Typography>
        <Typography type="meta">This is dashboard page.</Typography>
      </FlexCol>

      <FlexCol className="gap-8 mb-4">
        <Card size="big">
          <OptionsTable />
        </Card>
        <Card size="big">
          <BackingTable />
        </Card>
      </FlexCol>
    </div>
  );
}
