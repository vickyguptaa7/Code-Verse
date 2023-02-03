import React from "react";
import FileNavigation from "../Components/FileNavigation/FileNavigation.component";
import SideDrawer from "../Components/sideDrawer/sideDrawer.component";

const CodeEditor = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex h-full w-full">
        <div className="right">
          <SideDrawer />
        </div>
        <div className="left w-full flex flex-col">
          <FileNavigation />
          <div className="code-here bg-gray-200 basis-full h-full"></div>
        </div>
      </div>
      <div className="w-full bg-gray-700 h-4"></div>
    </div>
  );
};

export default CodeEditor;
