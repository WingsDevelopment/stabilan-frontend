import { MainContent } from "./home/components/MainContent/MainContent";

import { Icons, ImageWrapper, Typography } from "lib";

const features = [
  {
    title: "Trustless and Decentralized",
    icon: Icons.logo,
    description:
      "All smart contracts are open-sourced and verified on the blockchain. There are no owners of the protocol, and no one takes fees, besides Backers who provide liquidity.",
  },
  {
    title: "Full Solvency, No Commission, No Jury",
    icon: Icons.logo,
    description:
      "Insurees are always able to execute their options at the strike price. There is no condition other than the expiration date.",
  },
  {
    title: "Fair Insurance Price",
    icon: Icons.logo,
    description:
      "The price is calculated based on the current utilization of the collateral. If utilization is low, the insurance price is low, encouraging users to buy it and giving the opportunity to resell for a higher price. If utilization is high, indicating high demand, there is an opportunity for Backers to provide more collateral, earning more rewards.",
  },
  {
    title: "Maximal Collateral Usage",
    icon: Icons.logo,
    description:
      "The premium paid by users is given in the collateral token and automatically staked to cover new insurances.",
  },
  {
    title: "DAO Governance",
    icon: Icons.logo,
    description:
      "Protocol is fully owned by the DAO, utilizing the STB_DAO tokens which can be obtained by backing assets. There is no other protocol owners, and DAO has the power to change asset parameters or to add new assets.",
  },
  {
    title: "Asset Agnostic",
    icon: Icons.logo,
    description:
      "The protocol works with any ERC20 token. It will be up to the Backers (future DAO token holders) to determine the risk of an asset, which will determine the striking price.",
  },
];

export default function Home() {
  return (
    <div>
      <MainContent />
      <div className="my-48">
        <div className="w-full text-center">
          <Typography type="h2">Stabilan - features</Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:mx-20 mt-20">
          {features.map((feature, index) => (
            <div key={index} className="bg-white shadow-sm rounded-3xl p-4">
              <div className="flex flex-col gap-4 p-4 items-center text-center">
                <ImageWrapper
                  src={feature.icon}
                  width={50}
                  height={50}
                  alt={`${feature.title} icon`}
                  className="w-12 h-12 mb-4"
                />
                <Typography type="h5" className="font-bold mb-2">
                  {feature.title}
                </Typography>
                <Typography type="body-regular">
                  {feature.description}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
