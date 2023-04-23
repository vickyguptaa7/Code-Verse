import React from "react";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";
import Button from "./Button.component";

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
    <Button
      className={mergeClass([
        "whitespace-nowrap block mx-1 my-0.5 px-4 py-0.5 text-sm text-start rounded-md hover:bg-[color:var(--hover-text-color)]",
        className,
      ])}
      onClick={onClickHandler}
      data-name={name.toLowerCase()}
    >
      {name}
    </Button>
  );
};

export default DropMenuButton;
