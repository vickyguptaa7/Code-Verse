import React from "react";
import { useAppSelector } from "../../Store/store";
import Drawer from "./ShowInSideDrawer/ShowInDrawer.component";
import Pannel from "../sidePannel/sidePannel.component";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";

const SideDrawer = () => {
  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);
  const isDrawerOpenSideIsLeft = useAppSelector(
    (state) => state.sideDrawer.isDrawerOpenSideIsLeft
  );
  
  return (
    <div
      className={mergeClass([
        "flex h-full bg-[color:var(--sidedrawer-color)]",
        isDrawerOpenSideIsLeft && "flex-row-reverse"
      ])}
    >
      <Pannel />
      {isDrawerOpen && <Drawer />}
    </div>
  );
};

export default SideDrawer;
