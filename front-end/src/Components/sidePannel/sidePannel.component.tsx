import { AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import { MdMenu } from "react-icons/md";
import {
  VscAccount,
  VscDebugAlt,
  VscExtensions,
  VscFiles,
  VscGitMerge,
  VscSearch,
  VscSettingsGear,
} from "react-icons/vsc";
import { TDrawerContent } from "../../Interface/Types";
import {
  setIsDrawerOpen,
  setShowInSideDrawer,
} from "../../Store/reducres/SideDrawer/SideDrawer.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";
import Backdrop from "../UI/Backdrop.component";
import DeveloperInfo from "../UI/DeveloperInfo.component";
import { DropMenuFile } from "./DropMenu/DropMenuFile.component";
import { DropMenuSetting } from "./DropMenu/DropMenuSetting.component";
import FileFolderInput from "./FileFolderInput.component";
import PannelButtons from "./pannelButtons.component";

const Pannel = () => {
  const [isDropMenuSettingOpen, setIsDropMenuSettingOpen] = useState(false);
  const [isDropMenuFileOpen, setIsDropMenuFileOpen] = useState(false);
  const [isDeveloperInfoOpen, setIsDeveloperInfoOpen] = useState(false);

  const dispatch = useAppDispatch();
  const showInSideDrawer = useAppSelector(
    (state) => state.sideDrawer.showInSideDrawer
  );
  const isSidePannelPositionOnLeft = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  );
  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);

  /* 
  this is a handler for the side pannel buttons that open the side drawer and set the content of the side drawer depending on what button was clicked.
  if same button is clicked twice it will close the side drawer
  else it will open the side drawer and set the content of the side drawer
  */
  const showInSideDrawerHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const name = event.currentTarget.getAttribute("data-name");

    // if its already open we just close the drawer
    if (showInSideDrawer === name && isDrawerOpen) {
      dispatch(setIsDrawerOpen(false));
      return;
    }
    // otherwise we open the drawer and set the content of the drawer
    dispatch(setIsDrawerOpen(true));
    dispatch(setShowInSideDrawer(name as TDrawerContent));
  };

  const openDropMenuSettingHandler = () => {
    setIsDropMenuSettingOpen(true);
  };
  const closeDropMenuSettingHandler = () => {
    setIsDropMenuSettingOpen(false);
  };

  const openDropMenuFileHandler = () => {
    setIsDropMenuFileOpen(true);
  };
  const closeDropMenuFileHandler = () => {
    setIsDropMenuFileOpen(false);
  };

  const openDeveloperInfoHandler = () => {
    setIsDeveloperInfoOpen(true);
  };
  const closeDeveloperInfoHandler = () => {
    setIsDeveloperInfoOpen(false);
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
      {isDeveloperInfoOpen && (
        <Backdrop
          onClick={closeDeveloperInfoHandler}
          className="bg-opacity-10"
        />
      )}
      <FileFolderInput />
      <div
        className={mergeClass([
          "flex flex-col justify-between h-full  bg-[color:var(--sidepannel-color)] text-[color:var(--primary-text-color)] pr-[1px] ",
          isSidePannelPositionOnLeft
            ? "border-r border-r-[color:var(--border-color)] "
            : "border-l border-l-[color:var(--border-color)] ",
        ])}
      >
        <nav className="flex flex-col ">
          <PannelButtons
            title="Files Menu"
            Icon={MdMenu}
            buttonName="Menu"
            isActive={isDropMenuFileOpen}
            onClickHandler={openDropMenuFileHandler}
          />
          <div className="relative overflow-visible">
            <AnimatePresence>
              {isDropMenuFileOpen && (
                <DropMenuFile closeDropMenuHandler={closeDropMenuFileHandler} />
              )}
            </AnimatePresence>
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
            isActive={isDeveloperInfoOpen}
            onClickHandler={openDeveloperInfoHandler}
          />
          <PannelButtons
            title="Settings"
            Icon={VscSettingsGear}
            isActive={isDropMenuSettingOpen}
            buttonName="settings"
            onClickHandler={openDropMenuSettingHandler}
          />
          <div className="relative overflow-visible">
            <AnimatePresence>
              {isDeveloperInfoOpen && <DeveloperInfo />}
              {isDropMenuSettingOpen && (
                <DropMenuSetting
                  closeDropMenuHandler={closeDropMenuSettingHandler}
                />
              )}
            </AnimatePresence>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Pannel;
