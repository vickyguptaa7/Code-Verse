import React from "react";
import { useAppSelector } from "../../Store/store";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";
import Button from "../UI/Button.component";

interface PROPS_INTERFACE {
  Icon?: React.ElementType;
  onClickHandler: React.MouseEventHandler;
  className?: string;
  dataName?: "input" | "output" | "terminal" | "debug";
  hoverBg?: boolean;
}

const BottomPannelButton: React.FC<PROPS_INTERFACE> = ({
  Icon,
  onClickHandler,
  className,
  dataName,
  hoverBg,
}) => {
  const showInBottomPannel = useAppSelector(
    (state) => state.bottomPannel.showInBottomPannel
  );
  const avtiveClassName =
    showInBottomPannel === dataName
      ? "border-[color:var(--primary-text-color)] text-[color:var(--highlight-text-color)]"
      : "border-[color:var(--bottompannel-color)]";
  const isHover = hoverBg === undefined;

  // icons button
  if (Icon)
    return (
      <Button
        className={mergeClass([
          "flex items-start mb-0.5 justify-center p-0.5 rounded-lg ml-4",
          isHover && " hover:bg-[color:var(--hover-text-color)]",
          className,
        ])}
        onClick={onClickHandler}
      >
        <Icon
          className={mergeClass([
            "text-xl text-[color:var(--highlight-text-color)] ",
          ])}
        />
      </Button>
    );

  // text buttons
  return (
    <li
      className={mergeClass([
        "hover:text-[color:var(--highlight-text-color)] mr-4 border-b-[1.5px]",
        className,
        avtiveClassName,
      ])}
    >
      <Button
        className={mergeClass(["px-1 pb-1 mb-0.5"])}
        data-name={dataName}
        onClick={onClickHandler}
      >
        {dataName?.toLocaleUpperCase()}
      </Button>
    </li>
  );
};

export default BottomPannelButton;
