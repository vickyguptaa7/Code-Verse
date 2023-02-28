import React, { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../Store/store";
import BottomPannelNavigation from "./BottomPannelNavigation/BottomPannelNavigation.component";
import ShowInBottomPannel from "./ShowInBottomPannel/showInBottomPannel.component";
import useBottomPannelResizing from "../../hooks/useBottomPannelResizing.hook";

const BottomPannel = () => {
  const refBottomPannel = useRef<HTMLDivElement>(null);
  const refResizer = useRef<HTMLDivElement>(null);
  const bottomPannelHeight = useAppSelector(
    (state) => state.bottomPannel.bottomPannelHeight
  );
  const [isBottomPannelResizing, setIsBottomPannelResizing] = useState(false);

  // manages the resizing of the component
  useBottomPannelResizing(
    setIsBottomPannelResizing,
    refBottomPannel,
    refResizer
  );
  
  return (
    <div
      ref={refBottomPannel}
      className="flex flex-col bg-[color:var(--bottompannel-color)] border-t h-52 border-t-[color:var(--primary-text-color)]"
      style={{ height: bottomPannelHeight }}
    >
      <div
        ref={refResizer}
        className={twMerge(
          "w-full h-1 duration-300 hover:bg-[color:var(--accent-color)] hover:cursor-move touch-none",
          isBottomPannelResizing && "bg-[color:var(--accent-color)]"
        )}
      ></div>
      <BottomPannelNavigation />
      <ShowInBottomPannel />
    </div>
  );
};

export default BottomPannel;
