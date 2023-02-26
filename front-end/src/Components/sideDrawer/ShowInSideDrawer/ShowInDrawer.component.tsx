import React, { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { setSideDrawerWidth } from "../../../Store/reducres/SideDrawer.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import DebugDrawer from "./debugDrawer.component";
import ExtensionsDrawer from "./extensionsDrawer.component";
import FileDrawer from "./fileDrawer.component";
import GitDrawer from "./gitDrawer.component";
import SearchDrawer from "./searchDrawer.component";

// constant
import { MIN_DRAWER_SIZE_PX } from "../sideDrawer.Constant";
import { MAX_DRAWER_SIZE_IN_PERCENT } from "../sideDrawer.Constant";
import { SIDE_PANNEL_WIDTH } from "../../sidePannel/SidePannel.constants";

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

function useSideDrawerResizing(
  setIsDrawerResizing: Function,
  refResizer: React.RefObject<HTMLDivElement>,
  refDrawer: React.RefObject<HTMLDivElement>
) {
  const dispatch = useAppDispatch();
  const sideDrawerWidth = useAppSelector(
    (state) => state.sideDrawer.sideDrawerWidth
  );
  useEffect(() => {
    // when the screen size changes it manages the drawer size such that drawer is not on the full screen
    const manageDrawerWidth = () => {
      const percentChange = (sideDrawerWidth / document.body.clientWidth) * 100;
      const newWidth =
        (document.body.clientWidth * MAX_DRAWER_SIZE_IN_PERCENT) / 100;
      if (
        percentChange > MAX_DRAWER_SIZE_IN_PERCENT &&
        newWidth > MIN_DRAWER_SIZE_PX
      ) {
        dispatch(setSideDrawerWidth(newWidth));
      }
    };
    window.addEventListener("resize", manageDrawerWidth);
    return () => {
      window.removeEventListener("resize", manageDrawerWidth);
    };
  }, [dispatch, sideDrawerWidth]);

  // this is for the resizing of the drawer
  useEffect(() => {
    const resizableDrawer = refDrawer.current!;

    // remove the px from the width thats why parseInt(,10)
    let width: number = parseFloat(
      window.getComputedStyle(resizableDrawer).width
    );

    let x_cord = 0;
    const onPointerMoveSideResize = (event: PointerEvent) => {
      const change_x = event.clientX - x_cord;
      const percentChange =
        ((change_x + width) / document.body.clientWidth) * 100;

      // if change is in desired percentage then only update
      if (
        change_x + width > MIN_DRAWER_SIZE_PX &&
        MAX_DRAWER_SIZE_IN_PERCENT > percentChange
      ) {
        width = change_x + width;
        x_cord = event.clientX;
      } else if (change_x + width < MIN_DRAWER_SIZE_PX) {
        width = MIN_DRAWER_SIZE_PX;
        x_cord = SIDE_PANNEL_WIDTH + MIN_DRAWER_SIZE_PX;
      } else if (MAX_DRAWER_SIZE_IN_PERCENT < percentChange) {
        width = (document.body.clientWidth * MAX_DRAWER_SIZE_IN_PERCENT) / 100;
        x_cord = SIDE_PANNEL_WIDTH + width;
      }

      resizableDrawer.style.width = `${width}px`;
      // update the new widht in the store so that we open the drawer again we get the prev width
      dispatch(setSideDrawerWidth(width));
    };

    const onPointerUpSideResize = (event: PointerEvent) => {
      document.removeEventListener("pointermove", onPointerMoveSideResize);
      document.removeEventListener("pointerup", onPointerUpSideResize);
      setIsDrawerResizing(false);
    };

    const onPointerDownSideResize = (event: PointerEvent) => {
      x_cord = event.clientX;
      document.addEventListener("pointerup", onPointerUpSideResize);
      document.addEventListener("pointermove", onPointerMoveSideResize);
      setIsDrawerResizing(true);
    };
    const resizerSideDiv = refResizer.current!;
    resizerSideDiv.addEventListener("pointerdown", onPointerDownSideResize);

    return () => {
      resizerSideDiv.removeEventListener(
        "pointerdown",
        onPointerDownSideResize
      );
    };
  }, [dispatch, refDrawer, refResizer, setIsDrawerResizing]);
}

export default Drawer;
