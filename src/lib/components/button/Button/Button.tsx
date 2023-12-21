import cn from "classnames";
import React, { ButtonHTMLAttributes } from "react";

import { getBgVariant, getBorderVariant } from "../../../styles";
import { Color } from "../../../types/colors";
import { Spinner } from "../../loading/Spinner/Spinner";

import style from "./Button.module.css";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Specifies the color variant of the button.
   * @example
   * ```jsx
   * <Button variant="primary">Primary Button</Button>
   * ```
   */
  color?: Color;

  /**
   * Specifies the size of the button.
   * @example
   * ```jsx
   * <Button size="big">Big Button</Button>
   * ```
   */
  size?: "small" | "normal" | "big";

  /**
   * If true, the button will take up the full width of its container.
   * @example
   * ```jsx
   * <Button fullWidth={true}>Full Width Button</Button>
   * ```
   */
  fullWidth?: boolean;

  /**
   * Renders spinners and disables button when set to true.
   * @example
   * ```jsx
   * <Button loading>Big Button</Button>
   * ```
   */
  loading?: boolean;

  /**
   * Specifies the style variant of the button: 'text', 'outlined', or 'contained'.
   * @example
   * ```jsx
   * <Button variant="text">Text Button</Button>
   * ```
   */
  variant?: "text" | "outlined" | "contained";
}

/**
 * Button Component
 *
 * A versatile button component that can be used across the application. This component
 * provides flexibility with different sizes, color variants, and text styles. It also
 * provides an optional loading state which displays a spinner and disables the button.
 *
 * @example
 * ```jsx
 * <Button size="big" variant="primary" loading>
 *   Loading Button
 * </Button>
 * ```
 */

export const Button: React.FC<ButtonProps> = ({
  color = "primary",
  size = "normal",
  variant = "contained",
  fullWidth = false,
  type = "button",
  className = "",
  loading,
  children,
  ...props
}) => {
  const classes = cn(
    style.root,
    style[size],
    {
      [getBgVariant(props.disabled || loading ? "disabled" : color)]:
        variant === "contained",
    },
    {
      [getBorderVariant(props.disabled || loading ? "disabled" : color)]:
        variant === "outlined",
    },
    {
      ["w-full"]: fullWidth,
      ["cursor-default"]: loading,
      ["text-white"]:
        color !== "warning" && color !== "secondary" && variant === "contained",
      ["text-black"]:
        ((color === "warning" || color === "secondary") &&
          variant === "contained") ||
        props.disabled,
    },
    className
  );

  return (
    <button
      className={classes}
      type={type}
      disabled={props.disabled || loading}
      {...props}
    >
      {children}
      {loading && <Spinner className="ml-1.5" />}
    </button>
  );
};
