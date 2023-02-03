import React from "react";
import Drawer from "./drawer.component";
import Pannel from "./pannel.component";

const SideDrawer = () => {
  return (
    <div className="flex h-full ">
      <Pannel />
      <Drawer />
    </div>
  );
};

export default SideDrawer;
