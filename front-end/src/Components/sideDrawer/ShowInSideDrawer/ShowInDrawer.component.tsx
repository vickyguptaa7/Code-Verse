import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../../Store/store";
import DebugDrawer from "./debugDrawer.component";
import ExtensionsDrawer from "./extensionsDrawer.component";
import FileDrawer from "./fileDrawer.component";
import GitDrawer from "./gitDrawer.component";
import SearchDrawer from "./searchDrawer.component";

import useSideDrawerResizing from "../../../hooks/useSideDrawerResizing.hook";

const Drawer = () => {
  const refDrawer = useRef<HTMLDivElement>(null);
  const refResizer = useRef<HTMLDivElement>(null);
  const isSidePannelPositionOnLeft = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  );
  const sideDrawerWidth = useAppSelector(
    (state) => state.sideDrawer.sideDrawerWidth
  );
  const showInSideDrawer = useAppSelector(
    (state) => state.sideDrawer.showInSideDrawer
  );
  const [isDrawerResizing, setIsDrawerResizing] = useState(false);
  
  useSideDrawerResizing(setIsDrawerResizing, refResizer, refDrawer);

  let showComponentInDrawer = <FileDrawer />;
  if (showInSideDrawer === "search") showComponentInDrawer = <SearchDrawer />;
  else if (showInSideDrawer === "git") showComponentInDrawer = <GitDrawer />;
  else if (showInSideDrawer === "debug")
    showComponentInDrawer = <DebugDrawer />;
  else if (showInSideDrawer === "extensions")
    showComponentInDrawer = <ExtensionsDrawer />;

  return (
    <div
      ref={refDrawer}
      className={twMerge(
        "flex text-white w-52 justify-between overflow-x-scroll touch-none",
        isSidePannelPositionOnLeft && "flex-row-reverse"
      )}
      style={{ width: sideDrawerWidth }}
    >
      <div
        ref={refResizer}
        className={twMerge(
          "w-1 h-full duration-300 cursor-move hover:bg-[color:var(--accent-color)] resizable-div-left-right",
          isDrawerResizing && "bg-[color:var(--accent-color)]"
        )}
      ></div>
      <div className="flex flex-col items-center justify-center w-full">
        {sideDrawerWidth}
        {showComponentInDrawer}
      </div>
    </div>
  );
};

export default Drawer;
