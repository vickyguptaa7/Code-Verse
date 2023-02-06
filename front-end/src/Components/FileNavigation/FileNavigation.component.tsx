import React from "react";
import "./FileNavigation.css";
import FileContainer from "./FileContainer";
import { VscDebugStart, VscEllipsis } from "react-icons/vsc";

const FileNavigation = () => {
  // remove the file from the list of created files show in file navigation

  return (
    <div className="flex justify-between bg-slate-700">
      <FileContainer />
      <div className="flex items-center justify-center gap-4 p-2">
        <button className="">
          <VscDebugStart className="text-2xl text-gray-300" />
        </button>
        <button>
          <VscEllipsis className="text-lg text-gray-300 " />
        </button>
      </div>
    </div>
  );
};

export default FileNavigation;
