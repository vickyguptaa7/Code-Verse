import React, { useState } from "react";
import { VscChevronUp, VscClose, VscEllipsis, VscTrash } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import {
  resetBottomPannel,
  setBottomPannelHeight,
  setIsBottomPannelOpen,
  setIsMinimizeBottomPannel,
  setOutputContent,
  setShowInBottomPannel,
  setTerminalContent,
} from "../../../Store/reducres/BottomPannel.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import Backdrop from "../../UI/Backdrop.component";
import DropMenu from "../../UI/DropMenu.component";
import DropMenuButton from "../../UI/DropMenuButton.component";
import { HEIGHT_OF_FILENAVIGATION_AND_FOOTER } from "../BottomPannel.Constant";
import BottomPannelButton from "../bottomPannelButtons.component";

const BottomPannelRightNavigation = () => {
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);
  const isMinimizeBottomPannel = useAppSelector(
    (state) => state.bottomPannel.isMinimizeBottomPannel
  );
  const dispatch = useAppDispatch();

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

  const resetBottomPannelHandler = () => {
    dispatch(resetBottomPannel());
  };

  const closeDropMenuHandler = () => {
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
      <div className="flex items-start mb-1.5 justify-evenly">
        <BottomPannelButton
          Icon={VscTrash}
          onClickHandler={resetBottomPannelHandler}
        />
        <BottomPannelButton
          className={twMerge(
            "flex items-start justify-center",
            isDropMenuOpen && "bg-[color:var(--hover-text-color)]"
          )}
          Icon={VscEllipsis}
          onClickHandler={openDropMenuHandler}
        />
        <div className="relative overflow-visible">
          {isDropMenuOpen && dropMenu(dispatch, closeDropMenuHandler)}
        </div>
        <BottomPannelButton
          Icon={VscChevronUp}
          className={twMerge(isMinimizeBottomPannel && "rotate-180")}
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

function dropMenu(
  dispatch: Function,
  closeDropMenuHandler: React.MouseEventHandler
) {
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

  return (
    <DropMenu className="-right-0 top-8">
      <DropMenuButton name="Clear Output" onClickHandler={clearOutputHandler} />
      <DropMenuButton
        name="Clear Terminal"
        onClickHandler={clearTerminalHandler}
      />
      <DropMenuButton
        name="Run Active File"
        onClickHandler={closeDropMenuHandler}
      />
    </DropMenu>
  );
}

export default BottomPannelRightNavigation;
