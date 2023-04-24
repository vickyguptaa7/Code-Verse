import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useAppSelector } from "../../Store/store";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";
import BottomPannelNavigation from "./BottomPannelNavigation/BottomPannelNavigation.component";
import ShowInBottomPannel from "./ShowInBottomPannel/showInBottomPannel.component";
import useBottomPannelResizing from "./hooks/useBottomPannelResizing.hook";

const BottomPannelContainer = () => {
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
    <motion.div
      ref={refBottomPannel}
      className="flex flex-col bg-[color:var(--bottompannel-color)] border-t border-t-[color:var(--border-color)] "
      style={{ height: bottomPannelHeight, originY: 1 }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={{ scaleY: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        ref={refResizer}
        className={mergeClass([
          "w-full h-1 duration-300 hover:bg-[color:var(--primary-color)] hover:cursor-move touch-none",
          isBottomPannelResizing && "bg-[color:var(--primary-color)]",
        ])}
      ></div>
      <BottomPannelNavigation />
      <ShowInBottomPannel />
    </motion.div>
  );
};

export default BottomPannelContainer;
