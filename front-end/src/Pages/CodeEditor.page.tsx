import React from "react";
import FileNavigation from "../Components/FileNavigation/FileNavigation.component";
import SideDrawer from "../Components/sideDrawer/sideDrawer.component";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../Store/store";

const CodeEditor = () => {
  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);
  const isSidePannelPositionOnLeft = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  );

  return (
    <div className="w-full h-full flex flex-col">
      <div
        className={twMerge(
          "flex h-full",
          !isSidePannelPositionOnLeft && "flex-row-reverse"
        )}
      >
        <div className="right w-fit">
          <SideDrawer />
        </div>
        <div
          className={twMerge(
            "left flex flex-col justify-between",
            isDrawerOpen ? "w-[calc(100%-270px)]" : "w-[calc(100%-62px)]"
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
