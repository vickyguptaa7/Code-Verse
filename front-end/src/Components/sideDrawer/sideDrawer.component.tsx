import React from "react";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../Store/store";
import Drawer from "./drawer.component";
import Pannel from "./sidePannel.component";

const SideDrawer = () => {
  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);
  const isDrawerOpenSideIsLeft = useAppSelector(
    (state) => state.sideDrawer.isDrawerOpenSideIsLeft
  );
  return (
    <div
      className={twMerge(
        "flex h-full ",
        isDrawerOpenSideIsLeft && "flex-row-reverse"
      )}
    >
      <Pannel />
      {isDrawerOpen && <Drawer />}
    </div>
  );
};

export default SideDrawer;
