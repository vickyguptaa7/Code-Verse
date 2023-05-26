import { motion } from "framer-motion";
import { Suspense, useRef, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAppSelector } from "../../../Store/store";
import { mergeClass } from "../../../library/tailwindMerge/tailwindMerge.lib";
import { ErrorFallback } from "../../ErrorBoundary/ErrorBoundary";
import useSideDrawerResizing from "../hooks/useSideDrawerResizing.hook";
import DebugContainer from "./Debug/debugContainer.component";
import ExplorerContainer from "./Explorer/ExplorerContainer.component";
import ExtensionsContainer from "./Extensions/extensionsContainer.component";
import SearchContainer from "./Search/searchContainer.component";
import SourceControlContainer from "./SourceControl/SourceControlContainer.component";

const Drawer = () => {
  const [isDrawerResizing, setIsDrawerResizing] = useState(false);
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

  // this hook is used to resize the side drawer
  useSideDrawerResizing(setIsDrawerResizing, refResizer, refDrawer);

  // this is the component that will be shown in the side drawer
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
          "flex text-white  justify-between bg-[color:var(--sidedrawer-color)]",
          isSidePannelPositionOnLeft && "flex-row-reverse",
        ])}
        style={{ width: sideDrawerWidth }}
        initial={{ x: isSidePannelPositionOnLeft ? -10 : 10, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{
          x: isSidePannelPositionOnLeft ? -10 : 10,
          opacity: 0,
          transition: { duration: 0.15 },
        }}
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
            "w-[5px] h-full duration-300 bg-[color:var(--sidedrawer-color)] cursor-move hover:bg-[color:var(--primary-color)] resizable-div-left-right",
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
