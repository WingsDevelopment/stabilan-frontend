import Link from "next/link";
import React from "react";

import { getBgVariant } from "../../../styles";
import { Icon } from "../../icon/Icon/Icon";
import { Typography } from "../../text/Typography/Typography";

interface Props {
  /**
   * The content of the item.
   */
  children: React.ReactNode;
  /**
   * Specifies the state of the item.
   * @example
   * ```jsx
   * <MenuItem isActive>Active item</MenuItem>
   * ```
   */
  isActive?: boolean;
  /**
   * An optional icon to be displayed alongside the menu item.
   */
  iconName?: string;
  /**
   * Specifies the navigation path for the menu item. This determines
   * where the user will be redirected when they click on the item.
   */
  path: string;

  /**
   * Styles override
   */
  className?: string;
}

/**
 * MenuItem Component
 *
 * A navigational menu item for a sidebar or navbar. Can be used with or without an icon.
 *
 * @example
 * ```jsx
 * <MenuItem path="/home" icon={<HomeIcon />}>Home</MenuItem>
 * ```
 */

export const MenuItem: React.FC<Props> = ({
  children,
  isActive,
  iconName,
  path,
  className = "",
}) => {
  const activeClass = isActive ? "bg-primary text-white" : "bg-secondary";
  const iconColor = isActive
    ? getBgVariant("primary")
    : getBgVariant("secondary");

  return (
    <Link
      href={path}
      className={`flex items-center no-underline w-full
      gap-3 px-3 py-2 cursor-pointer ${className} ${activeClass}`}
    >
      {iconName ? (
        <Icon src={iconName} color={iconColor} />
      ) : (
        <span className="mr-5" />
      )}
      <Typography type="body-regular">{children}</Typography>
    </Link>
  );
};
