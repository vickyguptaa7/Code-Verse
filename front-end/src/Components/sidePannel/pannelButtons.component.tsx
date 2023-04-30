import React from "react";
import { useAppSelector } from "../../Store/store";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";
import Button from "../UI/Button.component";

interface IPROPS {
  Icon?: React.ElementType;
  title?: string;
  onClickHandler: React.MouseEventHandler;
  buttonName: string;
  isActive?: boolean;
  isRotate?: boolean;
}

const PannelButtons: React.FC<IPROPS> = ({
  Icon,
  title,
  onClickHandler,
  buttonName,
  isActive = false,
  isRotate = false,
}) => {
  const isSidePannelPositionOnLeft = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  );

  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);

  const showInSideDrawer = useAppSelector(
    (state) => state.sideDrawer.showInSideDrawer
  );

  /*
  isActive is for the buttons that does not open the side drawer but are still in the side pannel
  they are here to show the drop menu when clicked and to show that they are active
  
  activeClassName is for the buttons that open the side drawer
  */

  let activeClassName = mergeClass([
    "text-[color:var(--highlight-text-color)] border-[color:var(--primary-color)]",
    !isSidePannelPositionOnLeft ? "border-r-[4px] mr-0" : "border-l-[4px] ml-0",
  ]);

  if (Icon)
    return (
      <div className="mb-2">
        <Button
          onClick={onClickHandler}
          className={mergeClass([
            "flex items-center justify-center p-3 hover:text-[color:var(--highlight-text-color)] mx-[3px]",
            showInSideDrawer === buttonName && isDrawerOpen
              ? activeClassName
              : isActive
              ? "text-[color:var(--highlight-text-color)]"
              : "",
          ])}
          title={title}
          data-name={buttonName}
        >
          <Icon
            className={mergeClass([
              "text-2xl",
              isRotate &&isActive? "-rotate-90 duration-200":"rotate-0 duration-200",
            ])}
          />
        </Button>
      </div>
    );
  return <div></div>;
};

export default PannelButtons;
