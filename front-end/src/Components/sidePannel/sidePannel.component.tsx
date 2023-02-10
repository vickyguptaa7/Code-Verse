import React from "react";
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
import PannelButtons from "./pannelButtons.component";


type drawerContent = "file" | "search" | "git" | "debug" | "extensions";


const Pannel = () => {
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
    console.log(name);
    sideDrawerHandler(true);
    dispatch(setShowInSideDrawer(name as drawerContent));
  };
  return (
    <div className="flex flex-col justify-between h-full bg-gray-900">
      <nav className="flex flex-col">
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
          onClickHandler={()=>{}}
        />
        <PannelButtons
          title="Settings"
          Icon={VscSettingsGear}
          buttonName="settings"
          onClickHandler={()=>{}}
        />
      </nav>
    </div>
  );
};

export default Pannel;
