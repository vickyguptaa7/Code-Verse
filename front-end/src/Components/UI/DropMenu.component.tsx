import React, { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface PROPS_INTEFACE {
  children: ReactNode;
  className: string;
}

const DropMenu: React.FC<PROPS_INTEFACE> = ({ children, className }) => {
  return (
    <div
      className={twMerge(
        "absolute z-10 flex flex-col p-1 overflow-hidden origin-top-right rounded-md shadow-lg w-fit border border-gray-500 bg-slate-900 text-[color:var(--highlight-text-color)]",
        className
      )}
    >
      {children}
    </div>
  );
};

export default DropMenu;
