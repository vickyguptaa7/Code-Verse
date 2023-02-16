import React, { useState } from "react";
import {
  VscFiles,
  VscSettingsGear,
  VscAccount,
  VscSearch,
  VscGitMerge,
  VscDebugAlt,
  VscExtensions,
} from "react-icons/vsc";
import {
  setIsDrawerOpen,
  setShowInSideDrawer,
} from "../../Store/reducres/SideDrawer.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import Backdrop from "../UI/Backdrop.component";
import DropMenu from "../UI/DropMenu.component";
import DropMenuButton from "../UI/DropMenuButton.component";
import PannelButtons from "./pannelButtons.component";

type drawerContent = "file" | "search" | "git" | "debug" | "extensions";

const Pannel = () => {
  const [isDropMenuOpen, setIsDropMenuOpen] = useState(false);
  const dispatch = useAppDispatch();
  const showInSideDrawer = useAppSelector(
    (state) => state.sideDrawer.showInSideDrawer
  );
  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);
  const sideDrawerHandler = (showDrawer: boolean) => {
    dispatch(setIsDrawerOpen(showDrawer));
  };

  // manages the side drawer content and logic to show the side drawer content and the drawer itself
  const showInSideDrawerHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const name = event.currentTarget.getAttribute("data-name");
    // if its already open we just close the drawer
    if (showInSideDrawer === name && isDrawerOpen) {
      sideDrawerHandler(false);
      return;
    }
    sideDrawerHandler(true);
    dispatch(setShowInSideDrawer(name as drawerContent));
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
      <div className="flex flex-col justify-between h-full bg-gray-900">
        <nav className="flex flex-col text-[color:var(--primary-text-color)]">
          <PannelButtons
            title="Files Explorer"
            Icon={VscFiles}
            buttonName="file"
            onClickHandler={showInSideDrawerHandler}
          />
          <PannelButtons
            title="Search"
            Icon={VscSearch}
            buttonName="search"
            onClickHandler={showInSideDrawerHandler}
          />
          <PannelButtons
            title="Git"
            Icon={VscGitMerge}
            buttonName="git"
            onClickHandler={showInSideDrawerHandler}
          />
          <PannelButtons
            title="Debug"
            Icon={VscDebugAlt}
            buttonName="debug"
            onClickHandler={showInSideDrawerHandler}
          />
          <PannelButtons
            title="Extensions"
            Icon={VscExtensions}
            buttonName="extensions"
            onClickHandler={showInSideDrawerHandler}
          />
        </nav>
        <nav className="flex flex-col">
          <PannelButtons
            title="Accounts"
            Icon={VscAccount}
            buttonName="accounts"
            onClickHandler={() => {}}
          />
          <PannelButtons
            title="Settings"
            Icon={VscSettingsGear}
            buttonName="settings"
            onClickHandler={openDropMenuHandler}
          />
          <div className="relative overflow-visible">
            {isDropMenuOpen && dropMenu(() => {}, closeDropMenuHandler)}
          </div>
        </nav>
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
  // TODO: Add the functionality of each buttons
  return (
    <DropMenu className=" bottom-5 left-14">
      <DropMenuButton name="Setting" onClickHandler={onClickHandler} />
      <DropMenuButton name="Extensions" onClickHandler={onClickHandler} />
      <DropMenuButton name="Themes" onClickHandler={onClickHandler} />
      <DropMenuButton name="White Board" onClickHandler={onClickHandler} />
    </DropMenu>
  );
}

export default Pannel;
