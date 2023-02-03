import React from "react";
import "./FileNavigation.css";
import FileContainer from "./FileContainer";
import { VscDebugStart } from "react-icons/vsc";

const FileNavigation = () => {
  // remove the file from the list of created files show in file navigation

  return (
    <div className=" bg-slate-700 flex justify-between">
      <FileContainer />
      <div className="flex justify-center items-center p-2">
        <button className="">
          <VscDebugStart className="text-gray-300 text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default FileNavigation;
