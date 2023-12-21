import { ReactNode } from "react";

export interface TabProps {
  name: string;
  icon?: ReactNode;
  children: ReactNode;
}
export const Tab: React.FC<TabProps> = () => {
  return null;
};

export default Tab;
