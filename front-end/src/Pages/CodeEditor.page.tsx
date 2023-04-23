import { useEffect, useState } from "react";
import Footer from "../Components/Footer/Footer.component";
import Main from "../Components/Layout/Main.component";
import SideDrawer from "../Components/sideDrawer/sideDrawer.component";
import {
  SIDE_PANNEL_RESIZER_WIDTH,
  SIDE_PANNEL_WIDTH,
} from "../Components/sidePannel/SidePannel.constants";
import {
  setShowInBottomPannel,
  toggleIsBottomPannelOpen,
} from "../Store/reducres/BottomPannel/BottomPannel.reducer";
import { addFileToNavigation } from "../Store/reducres/Navigation/FileNavigation.reducer";
import {
  setShowInSideDrawer,
  toggleIsDrawerOpen,
} from "../Store/reducres/SideDrawer/SideDrawer.reducer";
import { useAppDispatch, useAppSelector } from "../Store/store";
import { mergeClass } from "../library/tailwindMerge/tailwindMerge.lib";

export const CODE_EDITOR_MIN_WIDTH = 320;
export const CODE_EDITOR_MIN_HEIGHT = 480;

const CodeEditor = () => {
  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);
  const isSidePannelPositionOnLeft = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  );
  const sideDrawerWidth = useAppSelector(
    (state) => state.sideDrawer.sideDrawerWidth
  );

  useAppResizer();
  useShortcutKeys();

  /* 
  Total Widht = clientWidth
  Side_Bars = Side_Pannel_Width + Side_Pannel_Resizer_Width + Side_Drawer_Width
  Remaing Width = TotalWidth - Side_Bars
  */

  let remainingWidth =
    Math.max(document.body.clientWidth, CODE_EDITOR_MIN_WIDTH) -
    SIDE_PANNEL_WIDTH;

  remainingWidth -= isDrawerOpen
    ? sideDrawerWidth + SIDE_PANNEL_RESIZER_WIDTH
    : 0;

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

const useAppResizer = () => {
  const [, setWidthChange] = useState(0);
  useEffect(() => {
    const manageEditorWidthAndHeight = () => {
      if (
        document.body.clientWidth > CODE_EDITOR_MIN_WIDTH ||
        document.body.clientHeight > CODE_EDITOR_MIN_HEIGHT
      )
        // just to rerender as reszing done
        setWidthChange(document.body.clientWidth + document.body.clientHeight);
    };
    window.addEventListener("resize", manageEditorWidthAndHeight);
    return () => {
      window.removeEventListener("resize", manageEditorWidthAndHeight);
    };
  }, []);
};

const useShortcutKeys = () => {
  const dispatch = useAppDispatch();
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
};

export default CodeEditor;
