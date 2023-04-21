import React, { lazy, Suspense, useRef, useState } from "react";
import { useAppSelector } from "../../../Store/store";
import { ErrorBoundary } from "react-error-boundary";

import useSideDrawerResizing from "../hooks/useSideDrawerResizing.hook";
import { ErrorFallback } from "../../ErrorBoundary/ErrorBoundary";

import ExplorerContainer from "./Explorer/ExplorerContainer.component";
import { mergeClass } from "../../../library/tailwindMerge/tailwindMerge.lib";

const DebugContainer = lazy(() => import("./Debug/debugContainer.component"));

const ExtensionsContainer = lazy(
  () => import("./Extensions/extensionsContainer.component")
);

const SourceControlContainer = lazy(
  () => import("./SourceControl/SourceControlContainer.component")
);
const SearchContainer = lazy(
  () => import("./Search/searchContainer.component")
);

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
      <div
        ref={refDrawer}
        className={mergeClass([
          "flex text-white w-52 justify-between bg-[color:var(--sidedrawer-color)]",
          isSidePannelPositionOnLeft && "flex-row-reverse",
        ])}
        // -2 for the border added to the side drawer and the side pannel 1px each
        style={{ width: sideDrawerWidth - 2 }}
      >
        <div className="flex flex-col w-full">
          {/* on reset will perform some task when there will be some error so we can reload the page or we can change the state that is causing the error or something else */}
          <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => {}}>
            <Suspense fallback={<div>Loading...</div>}>
              {showComponentInDrawer}
            </Suspense>
          </ErrorBoundary>
        </div>
      </div>
      <div className="touch-none">
        <div
          ref={refResizer}
          className={mergeClass([
            "w-1 h-full duration-300 bg-[color:var(--sidedrawer-color)] cursor-move hover:bg-[color:var(--accent-color)] resizable-div-left-right",
            isDrawerResizing && "bg-[color:var(--accent-color)]",
          ])}
        ></div>
      </div>
    </>
  );
};

export default Drawer;
