import React, { useState } from "react";
import FileNavigation from "../Components/FileNavigation/FileNavigation.component";
import SideDrawer from "../Components/sideDrawer/sideDrawer.component";
import { twMerge } from "tailwind-merge";

const CodeEditor = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const drawerHandler = () => {
    console.log("click");
    setDrawerVisible((isDrawerVisible) => !isDrawerVisible);
  };
  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex h-full">
        <div className="right w-fit">
          <SideDrawer drawerHandler={drawerHandler} isDrawerVisible={isDrawerVisible} />
        </div>
        <div
          className={twMerge(
            "left flex flex-col justify-between",
            isDrawerVisible ? "w-[calc(100%-270px)]" : "w-[calc(100%-62px)]"
          )}
        >
          <FileNavigation />
          <div className="code-here bg-gray-200  h-full grow"></div>
        </div>
      </div>
      <div className=" bg-gray-700 h-4"></div>
    </div>
  );
};

export default CodeEditor;
