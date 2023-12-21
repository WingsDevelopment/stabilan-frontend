import cn from "classnames";
import React from "react";

import styles from "./Typography.module.css";

export type TypographyType =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body-bold"
  | "body-regular"
  | "meta"
  | "tiny";

export interface TypographyProps {
  /**
   * The type of typography to render. Can be one of the headings (h1 to h6),
   * body (bold or regular), meta, or tiny.
   *
   * @example
   * ```jsx
   * <Typography type="h1">This is a Heading 1</Typography>
   * ```
   */
  type?: TypographyType;

  /**
   * Additional CSS classes to be applied to the typography.
   */
  className?: string;

  /**
   * The content of the typography.
   */
  children: React.ReactNode;
}

const ComponentMap: { [key in TypographyType]: React.ElementType } = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  "body-bold": "p",
  "body-regular": "p",
  meta: "p",
  tiny: "p",
};

/**
 * Typography Component
 *
 * Renders text with the specified typography style.
 *
 * @example
 * ```jsx
 * <Typography type="h2">This is a Heading 2</Typography>
 * ```
 */
export const Typography: React.FC<TypographyProps> = ({
  type = "body-regular",
  className = "",
  children,
}) => {
  const Tag = ComponentMap[type];
  const classes = cn(styles.root, styles[type], className);

  return <Tag className={classes}>{children}</Tag>;
};
