import React from "react";

import { Typography, TypographyProps } from "../Typography/Typography";

interface GradiantTypographyProps extends TypographyProps {}

/**
 * GradiantTypography Component
 *
 * Renders text with the specified typography style.
 *
 * @example
 * ```jsx
 * <GradiantTypography type="h2">This is a Heading 2</GradiantTypography>
 * ```
 */
export const GradiantTypography: React.FC<GradiantTypographyProps> = ({
  children,
  ...rest
}) => {
  return (
    <Typography
      {...rest}
      className="bg-gradient-to-r from-[#000F7A] to-[#59C7F6] text-transparent bg-clip-text"
    >
      {children}
    </Typography>
  );
};
