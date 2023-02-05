import React, { useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import { setIsDrawerOpen } from "../../Store/reducres/SideDrawer.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";

const MIN_DRAWER_SIZE = 15; // percent of the full width of the screen
const MAX_DRAWER_SIZE = 45; // percent of the full width of the screen

const Drawer = () => {
  const refDrawer = useRef<HTMLDivElement>(null);
  const refResizer = useRef<HTMLDivElement>(null);
  const isSidePannelPositionOnLeft = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  );

  const location = useLocation();
  const dispatch = useAppDispatch();

  // initial value set depending on the url parameter
  useEffect(() => {
    if (location.pathname.includes("/side-drawer/")) {
      dispatch(setIsDrawerOpen(true));
    } else {
      dispatch(setIsDrawerOpen(false));
    }
  });
  
  // this is for the resizing of the drawer 
  // TODO Do widht adjustments according to the screen size of the drawer
  useEffect(() => {
    const resizableDrawer = refDrawer.current!;

    // remove the px from the width thats why parseInt(,10)
    let width = parseInt(window.getComputedStyle(resizableDrawer).width, 10);

    let x_cord = 0;
    const onPointerMoveSideResize = (event: PointerEvent) => {
      const change_x = event.clientX - x_cord;
      const percentChange =
        ((change_x + width) / document.body.clientWidth) * 100;

        // if change is in desired percentage then only update
      if (percentChange > MIN_DRAWER_SIZE && MAX_DRAWER_SIZE > percentChange) {
        width = change_x + width;
        x_cord = event.clientX;
        resizableDrawer.style.width = `${width}px`;
      }
    };

    const onPointerUpSideResize = (event: PointerEvent) => {
      document.removeEventListener("pointermove", onPointerMoveSideResize);
    };

    const onPointerDownSideResize = (event: PointerEvent) => {
      x_cord = event.clientX;
      document.addEventListener("pointerup", onPointerUpSideResize);
      document.addEventListener("pointermove", onPointerMoveSideResize);
    };
    const resizerSideDiv = refResizer.current!;
    resizerSideDiv.addEventListener("pointerdown", onPointerDownSideResize);

    return () => {
      resizerSideDiv.removeEventListener("pointerdown", onPointerDownSideResize);
    };
  });

  return (
    <div
      ref={refDrawer}
      className={twMerge(
        "flex text-white bg-black min-w-fit w-52 justify-between overflow-x-scroll touch-none",
        isSidePannelPositionOnLeft && "flex-row-reverse"
      )}
    >
      <div
        ref={refResizer}
        className="w-[5px] h-full hover:bg-white duration-300 cursor-move resizable-div-left-right"
      ></div>
      <div className="flex items-center justify-center w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default Drawer;
