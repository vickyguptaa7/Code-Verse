import React, { Suspense, useRef, useState } from "react";
import { useAppSelector } from "../../../Store/store";
import { ErrorBoundary } from "react-error-boundary";

import DebugContainer from "./Debug/debugContainer.component";
import ExtensionsContainer from "./Extensions/extensionsContainer.component";
import SourceControlContainer from "./SourceControl/SourceControlContainer.component";
import SearchContainer from "./Search/searchContainer.component";

import useSideDrawerResizing from "../hooks/useSideDrawerResizing.hook";
import { ErrorFallback } from "../../ErrorBoundary/ErrorBoundary";

import ExplorerContainer from "./Explorer/ExplorerContainer.component";
import { mergeClass } from "../../../library/tailwindMerge/tailwindMerge.lib";

import { motion } from "framer-motion";

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

  let showComponentInDrawer = <ExplorerContainer />;
  if (showInSideDrawer === "search")
    showComponentInDrawer = <SearchContainer />;
  else if (showInSideDrawer === "git")
    showComponentInDrawer = <SourceControlContainer />;
  else if (showInSideDrawer === "debug")
    showComponentInDrawer = <DebugContainer />;
  else if (showInSideDrawer === "extensions")
    showComponentInDrawer = <ExtensionsContainer />;

  return (
    <>
      <motion.div
        ref={refDrawer}
        className={mergeClass([
          "flex text-white w-52 justify-between bg-[color:var(--sidedrawer-color)]",
          isSidePannelPositionOnLeft && "flex-row-reverse",
        ])}
        // -2 for the border added to the side drawer and the side pannel 1px each
        style={{ width: sideDrawerWidth - 2 }}
        initial={{ x: -10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -10, opacity: 0, transition: { duration: 0.15 } }}
      >
        <div className="flex flex-col w-full">
          {/* on reset will perform some task when there will be some error so we can reload the page or we can change the state that is causing the error or something else */}
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
            <Suspense fallback={<div>Loading...</div>}>
              {showComponentInDrawer}
            </Suspense>
          </ErrorBoundary>
        </div>
      </motion.div>
      <div className="touch-none">
        <div
          ref={refResizer}
          className={mergeClass([
            "w-1 h-full duration-300 bg-[color:var(--sidedrawer-color)] cursor-move hover:bg-[color:var(--primary-color)] resizable-div-left-right",
            isDrawerResizing && "bg-[color:var(--primary-color)]",
            !isSidePannelPositionOnLeft
              ? "flex-row-reverse border-l border-l-[color:var(--border-color)]"
              : "border-r border-r-[color:var(--border-color)]",
          ])}
        ></div>
      </div>
    </>
  );
};

export default Drawer;
