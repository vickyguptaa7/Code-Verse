import React from "react";
import { twMerge } from "tailwind-merge";

interface PROPS_INTERFACE {
  Icon?: React.ElementType;
  onClickHandler: React.MouseEventHandler;
  className?: string;
  dataName?: "input" | "output" | "terminal";
  hoverBg?: boolean;
}

const BottomPannelButton: React.FC<PROPS_INTERFACE> = ({
  Icon,
  onClickHandler,
  className,
  dataName,
  hoverBg,
}) => {
  const isHover = hoverBg === undefined;
  if (Icon)
    return (
      <button
        className={twMerge(
          "flex items-start mb-0.5 justify-center p-0.5 rounded-lg",
          isHover && " hover:bg-gray-700"
        )}
        onClick={onClickHandler}
      >
        <Icon className={twMerge("text-xl text-gray-300 ", className)} />
      </button>
    );

  return (
    <li className={twMerge("hidden hover:text-white xs:block", className)}>
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
