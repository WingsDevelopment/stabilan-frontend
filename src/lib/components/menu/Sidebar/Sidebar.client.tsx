"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { SidebarSection } from "../../../types";
import { FlexCol } from "../../container/FlexCol/FlexCol";
import { Icon } from "../../icon/Icon/Icon";
import { Typography } from "../../text/Typography/Typography";
import { MenuItem } from "../MenuItem/MenuItem";
import { Icons } from "../../../meta";

interface SidebarProps {
  sections: SidebarSection[];
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ sections, className }) => {
  const pathname = usePathname();
  const { push } = useRouter();

  return (
    <div className={className}>
      <FlexCol className="items-start gap-7 flex-shrink-0">
        <div className="min-h-[88px] cursor-pointer">
          <Icon
            src={Icons.chi62Full}
            width={86}
            className="py-4 pr-4"
            onClick={() => {
              push("/");
            }}
          />
        </div>
        {sections.map((section, index) => (
          <FlexCol
            key={index}
            className="self-stretch justify-center items-start gap-4 pr-6"
          >
            <Typography type="body-bold">{section.subheader}</Typography>
            {section.items.map((item, itemIndex) => (
              <MenuItem
                key={itemIndex}
                iconName={
                  item.path === pathname ? item.activeIconName : item.iconName
                }
                path={item.path}
                isActive={item.path === pathname}
              >
                {item.title}
              </MenuItem>
            ))}
          </FlexCol>
        ))}
      </FlexCol>
    </div>
  );
};
