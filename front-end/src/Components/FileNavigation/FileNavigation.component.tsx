import React from "react";
import "./FileNavigation.css";
import FileContainer from "./FileContainer";
import { VscDebugStart, VscEllipsis } from "react-icons/vsc";

const FileNavigation = () => {
  // remove the file from the list of created files show in file navigation

  return (
    <div className="flex justify-between bg-gray-900">
      <FileContainer />
      <div className="flex items-center justify-center gap-4 p-2 mr-2.5">
        <button className="flex items-center justify-center rounded-lg hover:bg-gray-700">
          <VscDebugStart className="text-2xl text-gray-300 p-0.5" />
        </button>
        <button className="flex items-center justify-center rounded-lg p-0.5 hover:bg-gray-700">
          <VscEllipsis className="text-xl text-gray-300 " />
        </button>
      </div>
    </div>
  );
};

export default FileNavigation;
