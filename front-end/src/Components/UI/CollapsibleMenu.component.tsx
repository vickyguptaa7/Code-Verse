import React, { useState } from "react";
import { VscChevronRight } from "react-icons/vsc";
import { useAppDispatch } from "../../Store/store";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";

interface IPROPS {
  menuName: string;
  children: React.ReactNode;
  initialState?: boolean;
  sibbling?: React.ReactNode;
  setIsCollpaisibleHandler?: Function;
}

const CollapsibleMenu: React.FC<IPROPS> = ({
  menuName,
  children,
  initialState = false,
  sibbling,
  setIsCollpaisibleHandler,
}) => {
  const dispatch = useAppDispatch();
  const [isCollapsibleMenuOpen, setIsCollapsibleMenuOpen] =
    useState(initialState);

  const toggleCollapsibleMenuHandler = () => {
    setIsCollapsibleMenuOpen(!isCollapsibleMenuOpen);
    if (setIsCollpaisibleHandler)
      dispatch(setIsCollpaisibleHandler(!isCollapsibleMenuOpen));
  };

  return (
    <>
      <div
        className="flex cursor-pointer bg-[color:var(--sidepannel-color)] py-0.5 justify-between"
        onClick={toggleCollapsibleMenuHandler}
      >
        <div className="flex">
          <div className="flex items-center justify-center p-1">
            <VscChevronRight
              className={mergeClass([isCollapsibleMenuOpen ? "rotate-90" : "","duration-200"])}
            />
          </div>
          <div className="flex items-center justify-center">
            <h3 className="font-semibold">{menuName}</h3>
          </div>
        </div>
        {sibbling}
      </div>
      {isCollapsibleMenuOpen ? children : null}
    </>
  );
};

export default CollapsibleMenu;
