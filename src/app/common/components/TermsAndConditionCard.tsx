import { Card, Typography } from "../../../lib";

export const TermsAndConditionCard = () => {
  return (
    <Card size="big" className="mb-0 md:mb-10">
      <Typography type="h5">Terms and Conditions</Typography>
      <br />
      <br />
      <Typography type="body-bold">Premium Calculation:</Typography>
      <Typography type="body-regular">
        Insurees pay a premium based on the current utilization of the pool,
        similar to variable rates in lending protocols. The premium is
        calculated dynamically and is lower when the utilization is low, while
        it’s higher when utilization is high.
      </Typography>
      <br />
      <Typography type="body-bold">Collateralization:</Typography>
      <Typography type="body-regular">
        Backers provide collateral to back specific assets. The entire premium
        paid by insurees is automatically staked as new collateral.
      </Typography>
      <br />
      <Typography type="body-bold">Option Tokens:</Typography>
      <Typography type="body-regular">
        Insurees receive option tokens in their wallet. Option tokens are liquid
        and transferable.
      </Typography>
      <br />
      <Typography type="body-bold">Backing Tokens: </Typography>
      <Typography type="body-regular">
        Backers receive backing tokens in their wallet. Backing tokens are
        transferable, allowing Backers to sell their position while retaining a
        portion of earned premiums.
      </Typography>
      <br />
      <Typography type="body-bold">Exercise of Options: </Typography>
      <Typography type="body-regular">
        Insurees can exercise their options at any time before the expiration
        date. To exercise, insurees burn the option token, send the specified
        asset amount to the protocol, and receive back collateral at the
        predetermined strike price. The only condition for executing options is
        the expiration date.
      </Typography>
      <br />
      <Typography type="body-bold">Premium Distribution: </Typography>
      <Typography type="body-regular">
        The entire premium paid by insurees is split between Backers as a
        reward. Backers also earn premiums during their backing duration, and
        assets obtained when options are executed. Premium can be claimed only
        when the Backing period ends.
      </Typography>
      <br />
      <Typography type="body-bold">Price Oracle: </Typography>
      <Typography type="body-regular">
        The price of the collateral asset is obtained from an external oracle
        (Chainlink).
      </Typography>
      <br />
      <Typography type="body-bold">Solvency and Commission: </Typography>
      <Typography type="body-regular">
        Full solvency is ensured, and insurees can always execute their options
        at the strike price. No commissions are charged for the protocol, and
        there are no additional conditions beyond the expiration date of options
        and backing tokens.
      </Typography>
      <br />
    </Card>
  );
};
