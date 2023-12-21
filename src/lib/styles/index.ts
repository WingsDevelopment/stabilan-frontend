import cn from "classnames";

import { Color } from "../types/colors";

import styles from "./styles.module.css";

export const rootStyles = styles;

export const getBgVariant = (variant: Color): string => {
  return cn(rootStyles[`${variant}-bg`]);
};

export const getBorderVariant = (variant: Color): string => {
  return cn(rootStyles[`${variant}-border`]);
};
