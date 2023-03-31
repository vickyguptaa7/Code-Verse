import React, { ReactNode } from "react";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";

interface PROPS_INTEFACE {
  children: ReactNode;
  className: string;
}

const DropMenu: React.FC<PROPS_INTEFACE> = ({ children, className }) => {
  return (
    <div
      className={mergeClass([
        "absolute z-10 flex flex-col py-1 overflow-hidden origin-top-right rounded-md shadow-lg w-fit border-[0.5px] border-[color:var(--primary-text-color)] bg-slate-900 text-[color:var(--highlight-text-color)]",
        className
      ])}
    >
      {children}
    </div>
  );
};

export default DropMenu;
