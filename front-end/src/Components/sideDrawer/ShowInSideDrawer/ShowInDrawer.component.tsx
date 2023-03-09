import React, { lazy, Suspense, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../../Store/store";
import { ErrorBoundary } from "react-error-boundary";

import useSideDrawerResizing from "../../../hooks/useSideDrawerResizing.hook";
import { ErrorFallback } from "../../ErrorBoundary/ErrorBoundary";

const DebugContainer = lazy(() => import("./Debug/debugContainer.component"));
const ExtensionsContainer = lazy(
  () => import("./Extensions/extensionsContainer.component")
);
const ExplorerContainer = lazy(
  () => import("./Explorer/ExplorerContainer.component")
);
const SourceControlContainer = lazy(
  () => import("./SourceControl/SourceControlContainer.component")
);
const SearchDrawer = lazy(() => import("./Search/searchDrawer.component"));

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
  if (showInSideDrawer === "search") showComponentInDrawer = <SearchDrawer />;
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
        className={twMerge(
          "flex text-white w-52 justify-between",
          isSidePannelPositionOnLeft && "flex-row-reverse"
        )}
        style={{ width: sideDrawerWidth }}
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
          className={twMerge(
            "w-1 h-full duration-300 cursor-move hover:bg-[color:var(--accent-color)] resizable-div-left-right",
            isDrawerResizing && "bg-[color:var(--accent-color)]"
          )}
        ></div>
      </div>
    </>
  );
};

export default Drawer;
