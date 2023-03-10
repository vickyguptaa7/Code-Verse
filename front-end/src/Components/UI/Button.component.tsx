import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface IPROPS extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className: string;
  children?: ReactNode;
  dataNode?:string;
}

const Button: React.FC<IPROPS> = ({ className, children,dataNode, ...props }) => {
  return (
    <button className={twMerge("", className)} data-node={dataNode} {...props}>
      {children}
    </button>
  );
};

export default Button;
