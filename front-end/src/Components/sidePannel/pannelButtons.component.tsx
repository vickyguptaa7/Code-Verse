import React from "react";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../Store/store";

interface IPROPS {
  Icon: React.ElementType;
  title: string;
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

  const basicClassName =
    " flex items-center justify-center p-3 hover:text-white mx-[3px] ";
  let activeClassName = twMerge(
    basicClassName,
    "text-white",
    !isSidePannelPositionOnLeft ? "border-r-[3px] mr-0" : "border-l-[3px] ml-0"
  );
  return (
    <div className="mb-2 text-gray-500 border-gray-700">
      <button
        onClick={onClickHandler}
        className={
          showInSideDrawer === buttonName && isDrawerOpen
            ? activeClassName
            : basicClassName
        }
        title={title}
        data-name={buttonName}
      >
        <Icon className="text-3xl" />
      </button>
    </div>
  );
};
/*
<div
          className={twMerge(
            " border-gray-700 text-gray-300",
            isDrawerOpen && " border-gray-100 text-white",
            !isSidePannelPositionOnLeft
              ? "border-r-[3px] ml-[3px]"
              : "border-l-[3px] mr-[3px]"
          )}
        >
          <button
            className="flex items-center justify-center p-4 hover:text-white"
            title="Explorer"
            onClick={sideDrawerHandler}
          >
            <VscFiles className="" />
          </button>
        </div>
*/

export default PannelButtons;
