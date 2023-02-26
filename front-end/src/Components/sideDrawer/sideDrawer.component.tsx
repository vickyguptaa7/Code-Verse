import React from "react";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../Store/store";
import Drawer from "./ShowInSideDrawer/ShowInDrawer.component";
import Pannel from "../sidePannel/sidePannel.component";

const SideDrawer = () => {
  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);
  const isDrawerOpenSideIsLeft = useAppSelector(
    (state) => state.sideDrawer.isDrawerOpenSideIsLeft
  );
  
  return (
    <div
      className={twMerge(
        "flex h-full bg-[color:var(--sidedrawer-color)]",
        isDrawerOpenSideIsLeft && "flex-row-reverse"
      )}
    >
      <Pannel />
      {isDrawerOpen && <Drawer />}
    </div>
  );
};

export default SideDrawer;
