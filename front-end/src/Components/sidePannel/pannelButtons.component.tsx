import React from "react";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../Store/store";

interface IPROPS {
  Icon?: React.ElementType;
  title?: string;
  onClickHandler: React.MouseEventHandler;
  buttonName: string;
  dropMenu?: boolean;
  className?: string;
}

const PannelButtons: React.FC<IPROPS> = ({
  Icon,
  title,
  onClickHandler,
  buttonName,
  dropMenu,
  className
}) => {

  const isSidePannelPositionOnLeft = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  );

  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);

  const showInSideDrawer = useAppSelector(
    (state) => state.sideDrawer.showInSideDrawer
  );

  if(dropMenu)
  {
    return (
      <button
        className={twMerge(
          "block px-4 py-0.5 text-sm text-start text-gray-500 rounded-lg hover:bg-gray-100 hover:text-gray-700",
          className
        )}
        onClick={onClickHandler}
      >
        {buttonName?.charAt(0).toUpperCase() + buttonName?.substring(1).toLowerCase()}
      </button>
    );
  }

  let activeClassName = twMerge(
    "text-white",
    !isSidePannelPositionOnLeft ? "border-r-[3px] mr-0" : "border-l-[3px] ml-0"
  );
  if(Icon)
  return (
    <div className="mb-2 text-gray-500 border-gray-700">
      <button
        onClick={onClickHandler}
        className={twMerge(
          "flex items-center justify-center p-3 hover:text-white mx-[3px]",
          showInSideDrawer === buttonName && isDrawerOpen ? activeClassName : ""
        )}
        title={title}
        data-name={buttonName}
      >
        <Icon className="text-3xl" />
      </button>
    </div>
  );
  return <div></div>
};

export default PannelButtons;
