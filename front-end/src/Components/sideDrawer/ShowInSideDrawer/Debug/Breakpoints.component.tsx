import React, { useState } from "react";
import { VscChevronRight } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

const Breakpoints = () => {
  const [isBreakpointsOpen, setIsBreakpointsOpen] = useState(false);

  const toggleBreakpointsHandler = () => {
    setIsBreakpointsOpen(!isBreakpointsOpen);
  };

  return (
    <div
      className="flex cursor-pointer bg-[color:var(--sidepannel-color)] py-0.5"
      onClick={toggleBreakpointsHandler}
    >
      <div className="flex items-center justify-center p-1">
        <VscChevronRight
          className={twMerge(isBreakpointsOpen ? "rotate-90" : "")}
        />
      </div>
      <div className="flex items-center justify-center">
        <h3 className="font-semibold">BREAKPOINTS</h3>
      </div>
    </div>
  );
};

export default Breakpoints;
