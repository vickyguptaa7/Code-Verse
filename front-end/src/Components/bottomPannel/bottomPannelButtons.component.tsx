import React from "react";
import { twMerge } from "tailwind-merge";

interface PROPS_INTERFACE {
  Icon?: React.ElementType;
  onClickHandler: React.MouseEventHandler;
  className?: string;
  dataName?: "input" | "output" | "terminal" | "debug";
  hoverBg?: boolean;
  dropMenu?: boolean;
  name?: string;
}

const BottomPannelButton: React.FC<PROPS_INTERFACE> = ({
  Icon,
  onClickHandler,
  className,
  dataName,
  hoverBg,
  dropMenu,
  name,
}) => {
  const isHover = hoverBg === undefined;

  // icons button
  if (Icon)
    return (
      <button
        className={twMerge(
          "flex items-start mb-0.5 justify-center p-0.5 rounded-lg ml-4",
          isHover && " hover:bg-gray-700",className
        )}
        onClick={onClickHandler}
      >
        <Icon className={twMerge("text-xl text-gray-300 ", className)} />
      </button>
    );

  if (dropMenu) {
    return (
      <button
        className={twMerge(
          "block px-4 py-0.5 text-sm text-start text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700",
          className
        )}
        data-name={dataName ? dataName : name}
        onClick={onClickHandler}
      >
        {dataName
          ? dataName?.charAt(0).toUpperCase() + dataName?.substring(1)
          : name}
      </button>
    );
  }

  // text buttons
  return (
    <li className={twMerge("hover:text-white mr-4", className)}>
      <button
        className="px-1 pb-1 mb-0.5"
        data-name={dataName}
        onClick={onClickHandler}
      >
        {dataName?.toLocaleUpperCase()}
      </button>
    </li>
  );
};

export default BottomPannelButton;
