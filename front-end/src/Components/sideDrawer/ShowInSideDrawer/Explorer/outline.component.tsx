import React, { useState } from "react";
import { VscChevronRight } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";

const Outline = () => {
  const [isOutlineOpen, setIsOutlineOpen] = useState(false);

  const toggleOutlineHandler = () => {
    setIsOutlineOpen(!isOutlineOpen);
  };

  return (
    <div
      className="flex cursor-pointer bg-[color:var(--sidepannel-color)] py-0.5"
      onClick={toggleOutlineHandler}
    >
      <div className="flex items-center justify-center p-1">
        <VscChevronRight className={twMerge(isOutlineOpen ? "rotate-90" : "")} />
      </div>
      <div className="flex items-center justify-center">
        <h3 className="font-semibold">OUTLINE</h3>
      </div>
    </div>
  );
};

export default Outline;
