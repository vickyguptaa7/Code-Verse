import React, { useState } from "react";
import { VscChevronUp, VscClose, VscEllipsis, VscTrash } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import {
  resetBottomPannel,
  setBottomPannelHeight,
  setIsBottomPannelOpen,
  setIsMinimizeBottomPannel,
} from "../../../Store/reducres/BottomPannel.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import Backdrop from "../../UI/Backdrop.component";
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
          className={twMerge("flex items-start justify-center",isDropMenuOpen&&"bg-gray-700")}
          Icon={VscEllipsis}
          onClickHandler={openDropMenuHandler}
        />
        <div className="relative overflow-visible">
          {isDropMenuOpen &&
            dropMenu(resetBottomPannelHandler,closeDropMenuHandler)}
        </div>
        <BottomPannelButton
          Icon={VscChevronUp}
          className={isMinimizeBottomPannel ? "rotate-180" : ""}
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
  resetBottomPannelHandler: React.MouseEventHandler,
  closeDropMenuHandler: React.MouseEventHandler
) {
  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    // TODO: Here we have to apply the clear terminal function and also run file function
    resetBottomPannelHandler(event);
    closeDropMenuHandler(event);
  };
  return (
    <div className="absolute z-10 flex flex-col p-1 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg -right-0 top-8 min-w-max">
      <BottomPannelButton
        className=""
        name="Clear Terminal"
        dropMenu={true}
        onClickHandler={onClickHandler}
      />
      <BottomPannelButton
        className=""
        name="Run Active File"
        dropMenu={true}
        onClickHandler={closeDropMenuHandler}
      />
    </div>
  );
}


export default BottomPannelRightNavigation;
