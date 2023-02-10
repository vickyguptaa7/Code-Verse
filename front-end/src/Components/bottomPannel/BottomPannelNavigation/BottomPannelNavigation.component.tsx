import React from "react";
import "./BottomPannelNavigation.component.css";

import BottomPannelLeftNavigation from "./BottomPannelLeftNavigation.component";
import BottomPannelRightNavigation from "./BottomPannelRightNavigation.component";

const BottomPannelNavigation = () => {
  return (
      <div className="flex items-center justify-between gap-6 mx-4 my-2 overflow-x-scroll overflow-y-visible -mb-28 pb-28 smd:gap-6 hidescrollbar1 hidescrollbar2">
        <BottomPannelLeftNavigation />
        <BottomPannelRightNavigation />
      </div>
  );
};

export default BottomPannelNavigation;
