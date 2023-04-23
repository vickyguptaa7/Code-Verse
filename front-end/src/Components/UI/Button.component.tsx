import React, { ReactNode } from "react";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";

interface IPROPS extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  children?: ReactNode;
  dataNode?: string;
}

const Button: React.FC<IPROPS> = ({
  className,
  children,
  dataNode,
  ...props
}) => {
  return (
    <button
      className={mergeClass(["", className])}
      data-node={dataNode}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
