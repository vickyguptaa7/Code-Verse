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
import PannelButtons from "./pannelButtons.component";

const Pannel = () => {


  return (
    <div className="flex flex-col justify-between h-full bg-gray-700">
      <nav className="flex flex-col">
        <PannelButtons Icon={VscFiles} to="side-drawer/files" />
        <PannelButtons Icon={VscSearch}  to="side-drawer/search" />
        <PannelButtons Icon={VscGitMerge} to="side-drawer/git" />
        <PannelButtons Icon={VscDebugAlt} to="side-drawer/debug" />
        <PannelButtons Icon={VscExtensions} to="side-drawer/extensions" />
      </nav>
      <nav className="flex flex-col">
        <PannelButtons Icon={VscAccount}/>
        <PannelButtons Icon={VscSettingsGear} />
      </nav>
    </div>
  );
};

export default Pannel;
