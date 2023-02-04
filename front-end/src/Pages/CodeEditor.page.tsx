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
    <div className="flex flex-col w-full h-full">
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
            isDrawerOpen ? "w-[calc(100%-276px)]" : "w-[calc(100%-68px)]"
          )}
        >
          <FileNavigation />
          <div className="h-full bg-gray-900 code-here grow"></div>
        </div>
      </div>
      <div className="w-full h-4 bg-gray-700 "></div>
    </div>
  );
};

export default CodeEditor;
