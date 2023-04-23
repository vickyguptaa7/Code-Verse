import { motion } from "framer-motion";
import React, { ReactNode } from "react";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";

interface PROPS_INTEFACE {
  children: ReactNode;
  className: string;
  initialX: number;
  initialY: number;
}

const DropMenu: React.FC<PROPS_INTEFACE> = ({
  children,
  className,
  initialX,
  initialY,
}) => {
  return (
    <motion.div
      className={mergeClass([
        "absolute z-10 flex flex-col py-1 overflow-hidden origin-top-right rounded-md shadow-lg w-fit border border-[color:var(--dropmenu-border-color)] bg-[color:var(--dropmenu-bg-color)] text-[color:var(--highlight-text-color)]",
        className,
      ])}
      initial={{ opacity: 1, scale: 0, x: initialX, y: initialY }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
      transition={{ duration: 0.3 }}
      exit={{
        scale: 0,
        opacity: 1,
        x: initialX,
        y: initialY,
        transition: {
          duration: 0.3,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

export default DropMenu;
