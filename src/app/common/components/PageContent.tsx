import cn from "classnames";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export const PageContent: React.FC<Props> = ({ children, ...rest }) => {
  const classes = cn("mt-2 mb-10", rest.className);

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};
