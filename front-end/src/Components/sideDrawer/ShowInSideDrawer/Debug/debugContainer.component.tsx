import React from "react";
import CollapsibleMenu from "../../../UI/CollapsibleMenu.component";
import Run from "./Run.component";

const DebugContainer = () => {
  return (
    <div className="flex flex-col justify-start h-full py-2 text-sm whitespace-nowrap ">
      <div className="pl-3.5 mt-1.5 mb-2">
        <h2>RUN AND DEBUG</h2>
      </div>
      <div className="flex flex-col h-full">
        <Run />
        <CollapsibleMenu menuName="BREAKPOINTS" children={null} />
      </div>
    </div>
  );
};

export default DebugContainer;
