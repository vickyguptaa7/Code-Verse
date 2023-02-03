import React from "react";
import Drawer from "./drawer.component";
import Pannel from "./pannel.component";

interface IPROPS {
  drawerHandler: Function;
  isDrawerVisible: boolean;
}

const SideDrawer: React.FC<IPROPS> = ({ drawerHandler, isDrawerVisible }) => {
  return (
    <div className="flex h-full " onClick={() => drawerHandler()}>
      <Pannel />
      {isDrawerVisible && <Drawer />}
    </div>
  );
};

export default SideDrawer;
