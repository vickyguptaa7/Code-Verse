import React, { useState } from "react";
import { VscEllipsis } from "react-icons/vsc";
import { setShowInBottomPannel } from "../../../Store/reducres/BottomPannel.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import Backdrop from "../../UI/Backdrop.component";
import BottomPannelButton from "../bottomPannelButtons.component";

type bottomPannelContent = "input" | "output" | "terminal" | "debug";

const BottomPannelLeftNavigation = () => {
  const dispatch = useAppDispatch();
  const showInBottomPannel = useAppSelector(
    (state) => state.bottomPannel.showInBottomPannel
  );
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);

  const closeDropMenuHandler = () => {
    setIsDropMenuOpen(false);
  };
  const openDropMenuHandler = () => {
    setIsDropMenuOpen(true);
  };
  const showInBottomPannelHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const name = event.currentTarget.getAttribute("data-name")!;
    dispatch(setShowInBottomPannel(name as bottomPannelContent)); // type assertion
  };

  return (
    <>
      {isDropMenuOpen && (
        <Backdrop onClick={closeDropMenuHandler} className="bg-transparent" />
      )}
      <ul className="flex items-center text-sm text-gray-400 justify-evenly mt-0.5">
        <BottomPannelButton
          className={
            showInBottomPannel === "input"
              ? "border-b border-gray-400 text-white"
              : ""
          }
          dataName="input"
          onClickHandler={showInBottomPannelHandler}
        />
        <BottomPannelButton
          className={
            showInBottomPannel === "output"
              ? "border-b border-gray-400 text-white"
              : ""
          }
          dataName="output"
          onClickHandler={showInBottomPannelHandler}
        />
        <BottomPannelButton
          className={
            showInBottomPannel === "debug"
              ? "border-b border-gray-400 text-white"
              : ""
          }
          dataName="debug"
          onClickHandler={showInBottomPannelHandler}
        />
        <BottomPannelButton
          className={
            showInBottomPannel === "terminal"
              ? "border-b border-gray-400 text-white"
              : ""
          }
          dataName="terminal"
          onClickHandler={showInBottomPannelHandler}
        />
        <BottomPannelButton
          className="flex items-start justify-center -translate-y-0.5 ml-0"
          hoverBg={false}
          Icon={VscEllipsis}
          onClickHandler={openDropMenuHandler}
        />
        <div className="relative overflow-visible">
          {isDropMenuOpen &&
            dropMenu(showInBottomPannelHandler, closeDropMenuHandler)}
        </div>
      </ul>
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
  return (
    <div className="absolute z-10 flex flex-col p-1 origin-top-right bg-white border border-gray-100 rounded-md shadow-lg -left-10 top-4 w-fit">
      <BottomPannelButton
        className=""
        dataName="input"
        dropMenu={true}
        onClickHandler={onClickHandler}
      />
      <BottomPannelButton
        className=""
        dataName="output"
        dropMenu={true}
        onClickHandler={onClickHandler}
      />
      <BottomPannelButton
        className=""
        dataName="debug"
        dropMenu={true}
        onClickHandler={onClickHandler}
      />
      <BottomPannelButton
        className=""
        dataName="terminal"
        dropMenu={true}
        onClickHandler={onClickHandler}
      />
    </div>
  );
}

export default BottomPannelLeftNavigation;
