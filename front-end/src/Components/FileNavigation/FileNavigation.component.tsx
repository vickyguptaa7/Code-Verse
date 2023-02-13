import React, { useState } from "react";
import "./FileNavigation.css";
import FileContainer from "./FileContainer";
import { VscDebugStart, VscEllipsis } from "react-icons/vsc";
import DropMenuButton from "../UI/DropMenuButton.component";
import { twMerge } from "tailwind-merge";
import Backdrop from "../UI/Backdrop.component";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { removeAllFilesFromNavigation } from "../../Store/reducres/FileNavigation.reducer";
import { setIsBottomPannelOpen } from "../../Store/reducres/BottomPannel.reducer";

const FileNavigation = () => {
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);
  const isBottomPannelOpen = useAppSelector(
    (state) => state.bottomPannel.isBottomPannelOpen
  );
  const dispatch = useAppDispatch();

  const closeDropMenuHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsDropMenuOpen(false);
  };
  const openDropMenuHandler = () => {
    setIsDropMenuOpen(true);
  };
  return (
    <>
      {isDropMenuOpen && (
        <Backdrop onClick={closeDropMenuHandler} className="bg-transparent" />
      )}
      <div className="flex justify-between bg-gray-900">
        <FileContainer />
        <div className="flex items-center justify-center p-2">
          <button className="flex items-center justify-center mr-4 rounded-lg hover:bg-gray-700">
            <VscDebugStart className="text-2xl text-gray-300 p-0.5" />
          </button>
          <button
            className={twMerge(
              "flex items-center justify-center rounded-lg p-0.5 hover:bg-gray-700 mr-2",
              isDropMenuOpen && "bg-gray-700"
            )}
            onClick={openDropMenuHandler}
          >
            <VscEllipsis className="text-xl text-gray-300 " />
          </button>
          <div className="relative overflow-visible">
            {isDropMenuOpen &&
              dropMenu(isBottomPannelOpen, dispatch, closeDropMenuHandler)}
          </div>
        </div>
      </div>
    </>
  );
};

function dropMenu(
  isBottomPannelOpen: boolean,
  dispatch: Function,
  closeDropMenuHandler: React.MouseEventHandler
) {
  const closeAllFilesHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeAllFilesFromNavigation());
    closeDropMenuHandler(event);
  };

  const toggleBottomPannelHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(setIsBottomPannelOpen(!isBottomPannelOpen));
    closeDropMenuHandler(event);
  };
  // TODO: fix the horizontal scrolling issue of the drop down menu
  return (
    <div className="absolute z-10 flex flex-col p-1 overflow-hidden origin-top-right bg-white border border-gray-100 rounded-md shadow-lg right-2.5 top-6 w-fit">
      <DropMenuButton name="Close All" onClickHandler={closeAllFilesHandler} />
      <DropMenuButton
        name="Run Active File"
        onClickHandler={closeDropMenuHandler}
      />
      <DropMenuButton
        name={`${!isBottomPannelOpen ? "Open" : "Close"} Terminal`}
        onClickHandler={toggleBottomPannelHandler}
      />
    </div>
  );
}

export default FileNavigation;
