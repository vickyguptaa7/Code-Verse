import React, { useEffect, useState } from "react";
import FileNavigation from "../Components/FileNavigation/FileNavigation.component";
import SideDrawer from "../Components/sideDrawer/sideDrawer.component";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../Store/store";
import BottomPannelContainer from "../Components/BottomPannel/BottomPannelContainer.component";
import Editor from "../Components/Editor/editor.component";

const MIN_WIDTH_OF_EDITOR = 320;

const CodeEditor = () => {
  const [, setWidthChangee] = useState(0);
  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);
  const isSidePannelPositionOnLeft = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  );
  const sideDrawerWidth = useAppSelector(
    (state) => state.sideDrawer.sideDrawerWidth
  );
  const isBottomPannelOpen = useAppSelector(
    (state) => state.bottomPannel.isBottomPannelOpen
  );

  // 68px is for the side pannel 
  const remainingWidth =
    document.body.clientWidth - (isDrawerOpen ? sideDrawerWidth : 0) - 60;

  useEffect(() => {
    const manageEditorWidth = () => {
      if (document.body.clientWidth > MIN_WIDTH_OF_EDITOR)
        setWidthChangee(document.body.clientWidth);
    };
    window.addEventListener("resize", manageEditorWidth);
    return () => {
      window.removeEventListener("resize", manageEditorWidth);
    };
  });

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
          className="flex flex-col justify-between h-full left"
          style={{ width: remainingWidth }}
        >
          <FileNavigation />
          <Editor />
         {isBottomPannelOpen&& <BottomPannelContainer/>}
        </div>
      </div>
      <div className="w-full h-4 bg-blue-500 "></div>
    </div>
  );
};

export default CodeEditor;
