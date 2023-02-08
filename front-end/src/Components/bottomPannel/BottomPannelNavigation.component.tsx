import React from "react";
import { VscChevronUp, VscClose, VscEllipsis, VscTrash } from "react-icons/vsc";
import { NavLink } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import {
  setBottomPannelHeight,
  setIsBottomPannelOpen,
  setIsMinimizeBottomPannel,
} from "../../Store/reducres/BottomPannel.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import "./BottomPannelNavigation.component.css";

const HEIGHT_OF_FILENAVIGATION_AND_FOOTER = 56;

const BottomPannelNavigation = () => {
  const dispatch = useAppDispatch();
  const isMinimizeBottomPannel = useAppSelector(
    (state) => state.bottomPannel.isMinimizeBottomPannel
  );
  const minMaxBottomPannelHandler = () => {
    if (!isMinimizeBottomPannel) {
      const maxHeightOfBottomPannel =
        document.body.clientHeight - HEIGHT_OF_FILENAVIGATION_AND_FOOTER;
      dispatch(setBottomPannelHeight(maxHeightOfBottomPannel));
      dispatch(setIsMinimizeBottomPannel(true));
      return;
    }
    dispatch(setBottomPannelHeight(208));
    dispatch(setIsMinimizeBottomPannel(false));
  };

  const hideBottomPannelHandler = () => {
    dispatch(setIsBottomPannelOpen(false));
  };

  return (
    <div className="flex items-center justify-between gap-6 mx-4 my-2 overflow-auto smd:gap-12 hidescrollbar1 hidescrollbar2">
      <div>
        <ul className="flex items-center gap-5 overflow-x-scroll text-sm text-gray-400 justify-evenly">
          <li className="hidden hover:text-white xs:block" title="Input">
            <NavLink to="">INPUT</NavLink>
          </li>
          <li className="hidden hover:text-white sm:block" title="Output">
            <NavLink to="">OUTPUT</NavLink>
          </li>
          <li className="hidden hover:text-white smd:block" title="Terminal">
            <NavLink to="">TERMINAL</NavLink>
          </li>
          <button className="flex items-center justify-center">
            <VscEllipsis className="text-xl text-gray-300 " />
          </button>
        </ul>
      </div>
      <div className="flex items-start gap-4 justify-evenly">
        <button
          className="flex items-center justify-center p-0.5 rounded-lg hover:bg-gray-700"
          onClick={hideBottomPannelHandler}
        >
          <VscTrash className="text-xl text-gray-300 " />
        </button>
        <button className="flex items-center justify-center p-0.5 rounded-lg hover:bg-gray-700">
          <VscChevronUp
            className={twMerge(
              "text-xl text-gray-300  ",
              isMinimizeBottomPannel && "rotate-180"
            )}
            onClick={minMaxBottomPannelHandler}
          />
        </button>
        <button
          className="flex items-center justify-center hover:bg-gray-700"
          onClick={hideBottomPannelHandler}
        >
          <VscClose className="text-xl text-gray-300 " />
        </button>
      </div>
    </div>
  );
};

export default BottomPannelNavigation;
