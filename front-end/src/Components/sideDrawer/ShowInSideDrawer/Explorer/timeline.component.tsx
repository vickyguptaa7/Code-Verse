import React, { useState } from "react";
import { VscChevronRight } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

const Timeline = () => {
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);

  const toggleTimelineHandler = () => {
    setIsTimelineOpen(!isTimelineOpen);
  };

  return (
    <div
      className="flex cursor-pointer bg-[color:var(--sidepannel-color)] py-0.5"
      onClick={toggleTimelineHandler}
    >
      <div className="flex items-center justify-center p-1">
        <VscChevronRight className={twMerge(isTimelineOpen ? "rotate-90" : "")} />
      </div>
      <div className="flex items-center justify-center">
        <h3 className="font-semibold">TIMELINE</h3>
      </div>
    </div>
  );
};

export default Timeline;
