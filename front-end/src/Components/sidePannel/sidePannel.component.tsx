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
        <PannelButtons title="Files Explorer" Icon={VscFiles} to="side-drawer/files" />
        <PannelButtons title="Search" Icon={VscSearch}  to="side-drawer/search" />
        <PannelButtons title="Git" Icon={VscGitMerge} to="side-drawer/git" />
        <PannelButtons title="Debug" Icon={VscDebugAlt} to="side-drawer/debug" />
        <PannelButtons title="Extensions" Icon={VscExtensions} to="side-drawer/extensions" />
      </nav>
      <nav className="flex flex-col">
        <PannelButtons title="Accounts" Icon={VscAccount}/>
        <PannelButtons title="Settings" Icon={VscSettingsGear} />
      </nav>
    </div>
  );
};

export default Pannel;
