import React, { useState } from "react";

import { twMerge } from "tailwind-merge";
import { VscDebugStart, VscEllipsis } from "react-icons/vsc";

import FileContainer from "./FileContainer";
import DropMenuButton from "../UI/DropMenuButton.component";
import Backdrop from "../UI/Backdrop.component";
import DropMenu from "../UI/DropMenu.component";
import Button from "../UI/Button.component";

import { useAppDispatch, useAppSelector } from "../../Store/store";
import { removeAllFilesFromNavigation } from "../../Store/reducres/Navigation/FileNavigation.reducer";
import { setIsBottomPannelOpen } from "../../Store/reducres/BottomPannel/BottomPannel.reducer";

const FileNavigation = () => {
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);
  const isBottomPannelOpen = useAppSelector(
    (state) => state.bottomPannel.isBottomPannelOpen
  );
  const navFilesList = useAppSelector(
    (state) => state.fileNavigation.navFilesList
  );
  const currentNavFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );
  const isNavListEmpty = navFilesList.length === 0;
  const dispatch = useAppDispatch();

  const closeDropMenuHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsDropMenuOpen(false);
  };

  const openDropMenuHandler = () => {
    setIsDropMenuOpen(true);
  };

  const isCurrentNavFileIsExecutable = currentNavFile.type === "file";
  if (isNavListEmpty) {
    return <></>;
  }

  return (
    <>
      {isDropMenuOpen && (
        <Backdrop onClick={closeDropMenuHandler} className="bg-transparent" />
      )}
      <div className="flex justify-between bg-[color:var(--sidepannel-color)]">
        <FileContainer navFilesList={navFilesList} />
        <div className="flex items-center justify-center p-2 text-[color:var(--highlight-text-color)]">
          {isCurrentNavFileIsExecutable ? (
            <Button className="flex items-center justify-center mr-4 rounded-lg hover:bg-[color:var(--hover-text-color)]">
              <VscDebugStart className="text-2xl p-0.5" />
            </Button>
          ) : null}
          <Button
            className={twMerge(
              "flex items-center justify-center rounded-lg p-0.5 hover:bg-[color:var(--hover-text-color)] mr-2",
              isDropMenuOpen && "bg-[color:var(--hover-text-color)]"
            )}
            onClick={openDropMenuHandler}
          >
            <VscEllipsis className="text-xl" />
          </Button>
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
    <DropMenu className="right-2.5 top-6 w-36">
      <DropMenuButton name="Close All" onClickHandler={closeAllFilesHandler} />
      <DropMenuButton
        name="Run Active File"
        onClickHandler={closeDropMenuHandler}
      />
      <DropMenuButton
        name={`${!isBottomPannelOpen ? "Open" : "Close"} Terminal`}
        onClickHandler={toggleBottomPannelHandler}
      />
    </DropMenu>
  );
}

export default FileNavigation;
