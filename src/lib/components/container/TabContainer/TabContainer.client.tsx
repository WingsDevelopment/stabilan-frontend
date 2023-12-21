"use client";

import React, { ReactNode, useState } from "react";

import { Button } from "../../button/Button/Button";

import { Tab, TabProps } from "./Tab.client";

interface TabContainerProps {
  children: ReactNode;
  className?: string;
}

export const TabContainer: React.FC<TabContainerProps> = ({
  className,
  children,
}) => {
  const tabs = React.Children.toArray(children)
    .filter((child) => React.isValidElement(child) && child.type === Tab)
    .map((child) => ({
      name: (child as React.ReactElement<TabProps>).props.name,
      icon: (child as React.ReactElement<TabProps>).props.icon,
      content: (child as React.ReactElement<TabProps>).props.children,
    }));

  const [currentTab, setCurrentTab] = useState(tabs[0]?.name || "");

  return (
    <div className={className}>
      <div className="flex flex-row">
        {tabs.map((tab) => (
          <Button
            key={tab.name}
            onClick={() => setCurrentTab(tab.name)}
            // if active set color to secondary
            variant={currentTab === tab.name ? "contained" : "outlined"}
            color={currentTab === tab.name ? "primary" : "disabled"}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.name}
          </Button>
        ))}
      </div>
      <div className="mt-2">
        {tabs.map(
          (tab) =>
            currentTab === tab.name && <div key={tab.name}>{tab.content}</div>
        )}
      </div>
    </div>
  );
};

export default TabContainer;
