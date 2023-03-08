import React from "react";
import Breakpoints from "./Breakpoints.component";
import Run from "./Run.component";

const DebugDrawer = () => {
  return (
    <div className="flex flex-col justify-start h-full py-2 text-sm whitespace-nowrap ">
      <div className="pl-3.5 mt-1.5 mb-2">
        <h2>RUN AND DEBUG</h2>
      </div>
      <div className="flex flex-col h-full">
        <Run />
        <Breakpoints />
      </div>
    </div>
  );
};

export default DebugDrawer;
