import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { VscEllipsis } from "react-icons/vsc";
import {
  setIsBottomPannelOpen,
  setShowInBottomPannel,
} from "../../Store/reducres/BottomPannel/BottomPannel.reducer";
import { removeAllFilesFromNavigation } from "../../Store/reducres/Navigation/FileNavigation.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";
import Backdrop from "../UI/Backdrop.component";
import Button from "../UI/Button.component";
import DropMenu from "../UI/DropMenu.component";
import DropMenuButton from "../UI/DropMenuButton.component";
import FileContainer from "./FileContainer";
import ExecuteButton from "./ExecuteButton";

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
      <div className="flex justify-between bg-[color:var(--sidedrawer-color)] border-b border-[color:var(--border-color)]">
        <FileContainer navFilesList={navFilesList} />
        <div className="flex items-center justify-center p-2 text-[color:var(--highlight-text-color)]">
          {isCurrentNavFileIsExecutable ? (
            <ExecuteButton/>
          ) : null}
          <Button
            className={mergeClass([
              "flex items-center justify-center rounded-lg p-0.5 hover:bg-[color:var(--hover-text-color)] mr-2",
              isDropMenuOpen && "bg-[color:var(--hover-text-color)]",
            ])}
            onClick={openDropMenuHandler}
          >
            <VscEllipsis className="text-xl" />
          </Button>
          <div className="relative overflow-visible">
            <AnimatePresence>
              {isDropMenuOpen && (
                <DropMenuFileNavigation
                  isBottomPannelOpen={isBottomPannelOpen}
                  closeDropMenuHandler={closeDropMenuHandler}
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </>
  );
};

interface IPROPS_DropMenu {
  isBottomPannelOpen: boolean;
  closeDropMenuHandler: React.MouseEventHandler;
}

const DropMenuFileNavigation: React.FC<IPROPS_DropMenu> = ({
  isBottomPannelOpen,
  closeDropMenuHandler,
}) => {
  const dispatch = useAppDispatch();
  const currentNavFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );
  const closeAllFilesHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(removeAllFilesFromNavigation());
    closeDropMenuHandler(event);
  };

  const toggleBottomPannelHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    dispatch(setIsBottomPannelOpen(!isBottomPannelOpen));
    dispatch(setShowInBottomPannel("terminal"));
    closeDropMenuHandler(event);
  };

  return (
    <DropMenu className="right-2.5 top-5 w-40" initialX={0} initialY={-5}>
      <DropMenuButton name="Close All" onClickHandler={closeAllFilesHandler} />
      {currentNavFile.id !== "null" && currentNavFile.type === "file" ? (
        <DropMenuButton
          name="Run Active File"
          onClickHandler={closeDropMenuHandler}
        />
      ) : null}
      <DropMenuButton
        name={`${!isBottomPannelOpen ? "Open" : "Close"} Terminal`}
        onClickHandler={toggleBottomPannelHandler}
      />
    </DropMenu>
  );
};

export default FileNavigation;
