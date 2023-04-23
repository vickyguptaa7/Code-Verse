import React from "react";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";
import { useAppSelector } from "../../Store/store";
import Button from "../UI/Button.component";

interface IPROPS {
  Icon?: React.ElementType;
  title?: string;
  onClickHandler: React.MouseEventHandler;
  buttonName: string;
  isActive?: boolean;
}

const PannelButtons: React.FC<IPROPS> = ({
  Icon,
  title,
  onClickHandler,
  buttonName,
  isActive = false,
}) => {
  const isSidePannelPositionOnLeft = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  );

  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);

  const showInSideDrawer = useAppSelector(
    (state) => state.sideDrawer.showInSideDrawer
  );

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
          <Icon className="text-2xl" />
        </Button>
      </div>
    );
  return <div></div>;
};

export default PannelButtons;
