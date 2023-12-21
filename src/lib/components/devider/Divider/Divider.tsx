import React, { HTMLAttributes } from "react";

interface DividerProps extends HTMLAttributes<HTMLHRElement> {}

/**
 * Divider Component
 *
 * A simple horizontal rule styled based on the provided color variant.
 *
 * @example
 * <Divider variant="primary" />
 */
export const Divider: React.FC<DividerProps> = ({ ...props }) => {
  return (
    <hr
      {...props}
      className={`h-px divide-dashed border-dashed border-[rgba(145,158,171,0.2)] ${props.className}`}
    />
  );
};
