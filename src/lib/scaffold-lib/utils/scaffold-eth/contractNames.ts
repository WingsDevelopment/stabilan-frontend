import scaffoldConfig from "../../../../../scaffold.config";

import { contracts, ContractName } from "./contract";

export function getContractNames() {
  const contractsData = contracts?.[scaffoldConfig.targetNetworks[0].id];
  return contractsData ? (Object.keys(contractsData) as ContractName[]) : [];
}
