import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
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
} from "../../Store/reducres/SideDrawer/SideDrawer.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import Backdrop from "../UI/Backdrop.component";
import { DropMenuFile } from "./DropMenu/DropMenuFile.component";
import { DropMenuSetting } from "./DropMenu/DropMenuSetting.component";

import PannelButtons from "./pannelButtons.component";

type drawerContent = "file" | "search" | "git" | "debug" | "extensions";

const Pannel = () => {
  const [isDropMenuSettingOpen, setIsDropMenuSettingOpen] = useState(false);
  const [isDropMenuFileOpen, setIsDropMenuFileOpen] = useState(false);
  const dispatch = useAppDispatch();
  const showInSideDrawer = useAppSelector(
    (state) => state.sideDrawer.showInSideDrawer
  );
  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);
  const sideDrawerHandler = (showDrawer: boolean) => {
    if (isDrawerOpen === showDrawer) return;
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

  const closeDropMenuSettingHandler = () => {
    setIsDropMenuSettingOpen(false);
  };

  const openDropMenuSettingHandler = () => {
    setIsDropMenuSettingOpen(true);
  };
  const closeDropMenuFileHandler = () => {
    setIsDropMenuFileOpen(false);
  };

  const openDropMenuFileHandler = () => {
    setIsDropMenuFileOpen(true);
  };

  return (
    <>
      {isDropMenuSettingOpen && (
        <Backdrop
          onClick={closeDropMenuSettingHandler}
          className="bg-transparent"
        />
      )}
      {isDropMenuFileOpen && (
        <Backdrop
          onClick={closeDropMenuFileHandler}
          className="bg-transparent"
        />
      )}
      <div className="flex flex-col justify-between h-full bg-[color:var(--sidepannel-color)] text-[color:var(--primary-text-color)]">
        <nav className="flex flex-col ">
          <PannelButtons
            title="Files Menu"
            Icon={MdMenu}
            buttonName="Menu"
            isActive={isDropMenuFileOpen}
            onClickHandler={openDropMenuFileHandler}
          />
          <div className="relative overflow-visible">
            {isDropMenuFileOpen && (
              <DropMenuFile closeDropMenuHandler={closeDropMenuFileHandler} />
            )}
          </div>
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
            isActive={isDropMenuSettingOpen}
            buttonName="settings"
            onClickHandler={openDropMenuSettingHandler}
          />
          <div className="relative overflow-visible">
            {isDropMenuSettingOpen && (
              <DropMenuSetting
                closeDropMenuHandler={closeDropMenuSettingHandler}
              />
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Pannel;
