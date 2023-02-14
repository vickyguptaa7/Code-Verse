import React, { useState } from "react";
import { VscEllipsis } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import { setShowInBottomPannel } from "../../../Store/reducres/BottomPannel.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import Backdrop from "../../UI/Backdrop.component";
import DropMenu from "../../UI/DropMenu.component";
import DropMenuButton from "../../UI/DropMenuButton.component";
import BottomPannelButton from "../bottomPannelButtons.component";

type bottomPannelContent = "input" | "output" | "terminal" | "debug";

const BottomPannelLeftNavigation = () => {
  const dispatch = useAppDispatch();
  const showInBottomPannel = useAppSelector(
    (state) => state.bottomPannel.showInBottomPannel
  );
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);

  const closeDropMenuHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
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
          className={twMerge(
            "hidden xs:block border-b",
            showInBottomPannel === "input"
              ? "border-gray-400 text-white"
              : "border-gray-900"
          )}
          dataName="input"
          onClickHandler={showInBottomPannelHandler}
        />
        <BottomPannelButton
          className={twMerge(
            "hidden sm:block border-b",
            showInBottomPannel === "output"
              ? "border-gray-400 text-white"
              : "border-gray-900"
          )}
          dataName="output"
          onClickHandler={showInBottomPannelHandler}
        />
        <BottomPannelButton
          className={twMerge(
            "hidden md:block border-b",
            showInBottomPannel === "debug"
              ? " border-gray-400 text-white"
              : "border-gray-900"
          )}
          dataName="debug"
          onClickHandler={showInBottomPannelHandler}
        />
        <BottomPannelButton
          className={twMerge(
            "hidden lg:block border-b",
            showInBottomPannel === "terminal"
              ? " border-gray-400 text-white"
              : "border-gray-900"
          )}
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
    <DropMenu className="-left-6 top-4">
      <DropMenuButton name="Input" onClickHandler={onClickHandler} />
      <DropMenuButton name="Output" onClickHandler={onClickHandler} />
      <DropMenuButton name="Debug" onClickHandler={onClickHandler} />
      <DropMenuButton name="Terminal" onClickHandler={onClickHandler} />
    </DropMenu>
  );
}

export default BottomPannelLeftNavigation;
