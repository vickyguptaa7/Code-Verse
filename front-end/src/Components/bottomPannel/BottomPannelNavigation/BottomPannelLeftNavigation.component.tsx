import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { VscEllipsis } from "react-icons/vsc";
import { setShowInBottomPannel } from "../../../Store/reducres/BottomPannel/BottomPannel.reducer";
import { useAppDispatch } from "../../../Store/store";
import Backdrop from "../../UI/Backdrop.component";
import DropMenu from "../../UI/DropMenu.component";
import DropMenuButton from "../../UI/DropMenuButton.component";
import BottomPannelButton from "../bottomPannelButtons.component";

type bottomPannelContent = "input" | "output" | "terminal" | "debug";

const BottomPannelLeftNavigation = () => {
  const dispatch = useAppDispatch();
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
      <ul className="flex items-center text-sm text-[color:var(--primary-text-color)] justify-evenly mt-0.5">
        <BottomPannelButton
          className="hidden xs:block "
          dataName="input"
          onClickHandler={showInBottomPannelHandler}
        />
        <BottomPannelButton
          className="hidden sm:block"
          dataName="output"
          onClickHandler={showInBottomPannelHandler}
        />
        <BottomPannelButton
          className="hidden md:block "
          dataName="debug"
          onClickHandler={showInBottomPannelHandler}
        />
        <BottomPannelButton
          className="hidden lg:block "
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
          <AnimatePresence>
            {isDropMenuOpen && (
              <DropMenuBottomLeft
                showInBottomPannelHandler={showInBottomPannelHandler}
                closeDropMenuHandler={closeDropMenuHandler}
              />
            )}
          </AnimatePresence>
        </div>
      </ul>
    </>
  );
};

interface IPROPS_Drop_Menu {
  showInBottomPannelHandler: React.MouseEventHandler;
  closeDropMenuHandler: React.MouseEventHandler;
}

const DropMenuBottomLeft: React.FC<IPROPS_Drop_Menu> = ({
  showInBottomPannelHandler,
  closeDropMenuHandler,
}) => {
  const onClickHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    showInBottomPannelHandler(event);
    closeDropMenuHandler(event);
  };

  return (
    <DropMenu className="-left-6 top-4 w-28" initialX={-105} initialY={-10}>
      <DropMenuButton name="Input" onClickHandler={onClickHandler} />
      <DropMenuButton name="Output" onClickHandler={onClickHandler} />
      <DropMenuButton name="Debug" onClickHandler={onClickHandler} />
      <DropMenuButton name="Terminal" onClickHandler={onClickHandler} />
    </DropMenu>
  );
};

export default BottomPannelLeftNavigation;
