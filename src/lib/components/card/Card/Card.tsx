import cn from "classnames";
import React, { HTMLAttributes } from "react";

import { Color } from "../../../types/colors";

import style from "./Card.module.css";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Specifies the color variant of the card.
   *
   * @default "secondary"
   *
   * @example
   * ```jsx
   * <Card variant="primary">Primary Card</Card>
   * ```
   */
  variant?: Color;

  /**
   * The content of the card.
   */
  children: React.ReactNode;

  /**
   * Additional CSS classes to be applied to the card.
   */
  className?: string;

  /**
   * Specifies the size of the card. Available sizes are "small", "normal", and "big".
   *
   * @default "normal"
   *
   * @example
   * ```jsx
   * <Card size="big">Big Card</Card>
   * ```
   */
  size?: "small" | "normal" | "big";
}

/**
 * Card Component
 *
 * A versatile card component that can be used to display content. This component
 * provides flexibility with different sizes and color variants.
 *
 * @example
 * ```jsx
 * <Card size="big" variant="primary">This is a primary, big-sized card.</Card>
 * ```
 */

export const Card: React.FC<CardProps> = ({
  children,
  variant = "secondary",
  className = "",
  size = "normal",
  ...props
}) => {
  const classes = cn(style.root, style[size], className);

  return (
    <div className={`bg-white ${classes}`} {...props}>
      {children}
    </div>
  );
};
