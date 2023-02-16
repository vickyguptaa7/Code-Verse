import React from "react";
import { twMerge } from "tailwind-merge";

interface PROPS_INTERFACE {
  onClickHandler: React.MouseEventHandler;
  className?: string;
  name: string;
}

const DropMenuButton: React.FC<PROPS_INTERFACE> = ({
  className,
  onClickHandler,
  name,
}) => {
  return (
    <button
      className={twMerge(
        "whitespace-nowrap block px-4 py-0.5 text-sm text-start rounded-md hover:bg-gray-700",
        className
      )}
      onClick={onClickHandler}
      data-name={name.toLowerCase()}
    >
      {name}
    </button>
  );
};

export default DropMenuButton;
