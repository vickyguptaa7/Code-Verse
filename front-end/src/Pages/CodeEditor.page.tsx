import React, { useEffect, useState } from "react";
import SideDrawer from "../Components/sideDrawer/sideDrawer.component";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../Store/store";
import Main from "../Components/Layout/Main.component";
import { SIDE_PANNEL_WIDTH } from "../Components/sidePannel/SidePannel.constants";

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

  // 60px is for the side pannel and 4  px for the side pannel resizer
  let remainingWidth =
    Math.max(document.body.clientWidth, EDITOR_MIN_WIDTH) - SIDE_PANNEL_WIDTH;
  remainingWidth -= isDrawerOpen ? sideDrawerWidth + 4 : 0;

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
  // TODO:Refactor this to avoid unnecessary rerendering due isBottomPannelOpen and IsSidePannelOpen
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
          <Main />
        </div>
      </div>
      <div className="w-full h-4 bg-[color:var(--accent-color)] "></div>
    </div>
  );
};

export default CodeEditor;
