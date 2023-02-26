import React, { useEffect, useState } from "react";
import FileNavigation from "../Components/FileNavigation/FileNavigation.component";
import SideDrawer from "../Components/sideDrawer/sideDrawer.component";
import BottomPannelContainer from "../Components/bottomPannel/BottomPannelContainer.component";
import Editor from "../Components/Editor/editor.component";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../Store/store";

const EDITOR_MIN_WIDTH = 320;
const EDITOR_MIN_HEIGHT = 480;

const CodeEditor = () => {
  const [, setWidthChange] = useState(0);
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

  // 60px is for the side pannel
  let remainingWidth =
    Math.max(document.body.clientWidth, EDITOR_MIN_WIDTH) - 60;
  remainingWidth -= isDrawerOpen ? sideDrawerWidth : 0;

  useEffect(() => {
    const manageEditorWidthAndHeight = () => {
      if (
        document.body.clientWidth > EDITOR_MIN_WIDTH ||
        document.body.clientHeight > EDITOR_MIN_HEIGHT
      )
        // just to rerender as reszing done
        setWidthChange(document.body.clientWidth + document.body.clientHeight);
    };
    window.addEventListener("resize", manageEditorWidthAndHeight);
    return () => {
      window.removeEventListener("resize", manageEditorWidthAndHeight);
    };
  }, []);

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
          className="flex flex-col justify-between h-full left bg-[color:var(--codeeditor-color)]"
          style={{ width: remainingWidth }}
        >
          <FileNavigation />
          <Editor />
          {isBottomPannelOpen && <BottomPannelContainer />}
        </div>
      </div>
      <div className="w-full h-4 bg-[color:var(--accent-color)] "></div>
    </div>
  );
};

export default CodeEditor;
