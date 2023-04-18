import React, { useEffect, useState } from "react";
import SideDrawer from "../Components/sideDrawer/sideDrawer.component";
import { useAppDispatch, useAppSelector } from "../Store/store";
import Main from "../Components/Layout/Main.component";
import { SIDE_PANNEL_WIDTH } from "../Components/sidePannel/SidePannel.constants";
import { mergeClass } from "../library/tailwindMerge/tailwindMerge.lib";
import {
  setShowInBottomPannel,
  toggleIsBottomPannelOpen,
} from "../Store/reducres/BottomPannel/BottomPannel.reducer";
import {
  setShowInSideDrawer,
  toggleIsDrawerOpen,
} from "../Store/reducres/SideDrawer/SideDrawer.reducer";
import { addFileToNavigation } from "../Store/reducres/Navigation/FileNavigation.reducer";
import Footer from "../Components/Footer/Footer.component";

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
  const dispatch = useAppDispatch();
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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      // toggle Bottom Pannel
      if (e.key === "`" && e.ctrlKey) {
        dispatch(toggleIsBottomPannelOpen());
        dispatch(setShowInBottomPannel("terminal"));
        return;
      }

      // toggle Side Drawer
      if (e.key === "b" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        dispatch(toggleIsDrawerOpen());
        return;
      }

      // toggle file directory side Drawer
      if (e.key === "p" && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        dispatch(toggleIsDrawerOpen());
        dispatch(setShowInSideDrawer("file"));
        return;
      }

      // open setting
      if (e.key === "," && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        dispatch(addFileToNavigation({ id: "setting", type: "setting" }));
        return;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch]);

  return (
    <div className="flex flex-col w-full h-full">
      <div
        className={mergeClass([
          "flex h-full",
          !isSidePannelPositionOnLeft && "flex-row-reverse",
        ])}
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
      <Footer />
    </div>
  );
};

export default CodeEditor;
