import React, { useState } from "react";
import "./FileNavigation.css";
import FileContainer from "./FileContainer";
import { VscDebugStart, VscEllipsis } from "react-icons/vsc";
import DropMenuButton from "../UI/DropMenuButton.component";
import { twMerge } from "tailwind-merge";
import Backdrop from "../UI/Backdrop.component";

const FileNavigation = () => {
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);

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
          <button className="flex items-center justify-center rounded-lg hover:bg-gray-700">
            <VscDebugStart className="text-2xl text-gray-300 p-0.5 mr-4" />
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
            {isDropMenuOpen && dropMenu(() => {}, closeDropMenuHandler)}
          </div>
        </div>
      </div>
    </>
  );
};

function dropMenu(
  showInBottomPannelHandler: React.MouseEventHandler,
  closeDropMenuHandler: React.MouseEventHandler
) {
  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    showInBottomPannelHandler(event);
    closeDropMenuHandler(event);
  };
  // TODO: fix the horizontal scrolling issue of the drop down menu
  return (
    <div className="absolute z-10 flex flex-col p-1 overflow-hidden origin-top-right bg-white border border-gray-100 rounded-md shadow-lg right-4 top-5 w-fit">
      <DropMenuButton name="Close All" onClickHandler={onClickHandler} />
      <DropMenuButton name="Run Active File" onClickHandler={onClickHandler} />
    </div>
  );
}

export default FileNavigation;
