import React from "react";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../Store/store";
import Button from "../UI/Button.component";

interface IPROPS {
  Icon?: React.ElementType;
  title?: string;
  onClickHandler: React.MouseEventHandler;
  buttonName: string;
}

const PannelButtons: React.FC<IPROPS> = ({
  Icon,
  title,
  onClickHandler,
  buttonName,
}) => {

  const isSidePannelPositionOnLeft = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  );

  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);

  const showInSideDrawer = useAppSelector(
    (state) => state.sideDrawer.showInSideDrawer
  );

  let activeClassName = twMerge(
    "text-[color:var(--highlight-text-color)] border-[color:var(--highlight-text-color)]",
    !isSidePannelPositionOnLeft ? "border-r-[3px] mr-0" : "border-l-[3px] ml-0"
  );
  if(Icon)
  return (
    <div className="mb-2">
      <Button
        onClick={onClickHandler}
        className={twMerge(
          "flex items-center justify-center p-3 hover:text-[color:var(--highlight-text-color)] mx-[3px]",
          showInSideDrawer === buttonName && isDrawerOpen ? activeClassName : ""
        )}
        title={title}
        data-name={buttonName}
      >
        <Icon className="text-3xl" />
      </Button>
    </div>
  );
  return <div></div>
};

export default PannelButtons;
