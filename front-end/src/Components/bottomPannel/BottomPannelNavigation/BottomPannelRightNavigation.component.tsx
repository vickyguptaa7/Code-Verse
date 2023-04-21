import React, { useState } from "react";
import { VscChevronUp, VscClose, VscEllipsis, VscTrash } from "react-icons/vsc";
import { mergeClass } from "../../../library/tailwindMerge/tailwindMerge.lib";
import {
  resetBottomPannel,
  setBottomPannelHeight,
  setIsBottomPannelOpen,
  setIsMinimizeBottomPannel,
  setOutputContent,
  setShowInBottomPannel,
} from "../../../Store/reducres/BottomPannel/BottomPannel.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import Backdrop from "../../UI/Backdrop.component";
import DropMenu from "../../UI/DropMenu.component";
import DropMenuButton from "../../UI/DropMenuButton.component";
import {
  HEIGHT_OF_FILENAVIGATION_AND_FOOTER,
  BOTTOM_PANNEL_MIN_SIZE_PX,
} from "../BottomPannel.Constant";
import BottomPannelButton from "../bottomPannelButtons.component";
import { resetTerminal, setTerminalContent } from "../../../Store/reducres/BottomPannel/Terminal/Terminal.reducer";

const BottomPannelRightNavigation = () => {
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);
  const isMinimizeBottomPannel = useAppSelector(
    (state) => state.bottomPannel.isMinimizeBottomPannel
  );
  const dispatch = useAppDispatch();

  const minMaxBottomPannelHandler = () => {
    if (!isMinimizeBottomPannel) {
      const maxHeightOfBottomPannel =
        Math.max(document.body.clientHeight, 480) -
        HEIGHT_OF_FILENAVIGATION_AND_FOOTER;
      dispatch(setBottomPannelHeight(maxHeightOfBottomPannel));
      dispatch(setIsMinimizeBottomPannel(true));
      return;
    }
    dispatch(setBottomPannelHeight(BOTTOM_PANNEL_MIN_SIZE_PX));
    dispatch(setIsMinimizeBottomPannel(false));
  };

  const hideBottomPannelHandler = () => {
    dispatch(setIsBottomPannelOpen(false));
  };

  const resetBottomPannelHandler = () => {
    dispatch(resetTerminal());
    dispatch(resetBottomPannel());
  };

  const closeDropMenuHandler = () => {
    setIsDropMenuOpen(false);
  };

  const openDropMenuHandler = () => {
    setIsDropMenuOpen(true);
  };

  // TODO:Bottom Pannel Icons fixe ui as some icons are cropped on hover

  return (
    <>
      {isDropMenuOpen && (
        <Backdrop onClick={closeDropMenuHandler} className="bg-transparent" />
      )}
      <div className="flex items-start mb-1.5 justify-evenly">
        <BottomPannelButton
          Icon={VscTrash}
          onClickHandler={resetBottomPannelHandler}
        />
        <BottomPannelButton
          className={mergeClass([
            "flex items-start justify-center",
            isDropMenuOpen && "bg-[color:var(--hover-text-color)]",
          ])}
          Icon={VscEllipsis}
          onClickHandler={openDropMenuHandler}
        />
        <div className="relative overflow-visible">
          {isDropMenuOpen ? (
            <DropMenuBottomPannel closeDropMenuHandler={closeDropMenuHandler} />
          ) : null}
        </div>
        <BottomPannelButton
          Icon={VscChevronUp}
          className={mergeClass([isMinimizeBottomPannel && "rotate-180"])}
          onClickHandler={minMaxBottomPannelHandler}
        />
        <BottomPannelButton
          Icon={VscClose}
          onClickHandler={hideBottomPannelHandler}
        />
      </div>
    </>
  );
};

interface IPROPS_DROP_MENU {
  closeDropMenuHandler: React.MouseEventHandler;
}

const DropMenuBottomPannel: React.FC<IPROPS_DROP_MENU> = ({
  closeDropMenuHandler,
}) => {
  const dispatch = useAppDispatch();
  const currentNavFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );
  const clearTerminalHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setTerminalContent(""));
    closeDropMenuHandler(event);
    dispatch(setShowInBottomPannel("terminal"));
  };

  const clearOutputHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    dispatch(setOutputContent(""));
    closeDropMenuHandler(event);
    dispatch(setShowInBottomPannel("output"));
  };
  console.log(currentNavFile);
  
  return (
    <DropMenu className="w-40 -right-0 top-8">
      <DropMenuButton name="Clear Output" onClickHandler={clearOutputHandler} />
      <DropMenuButton
        name="Clear Terminal"
        onClickHandler={clearTerminalHandler}
      />
      {currentNavFile.id !== "null" && currentNavFile.type === "file" ? (
        <DropMenuButton
          name="Run Active File"
          onClickHandler={closeDropMenuHandler}
        />
      ) : null}
    </DropMenu>
  );
};

export default BottomPannelRightNavigation;
