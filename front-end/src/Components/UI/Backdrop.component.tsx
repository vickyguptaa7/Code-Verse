import { motion } from "framer-motion";
import React from "react";
import ReactDOM from "react-dom";
import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";

interface BackdropProps {
  onClick: React.MouseEventHandler;
  className: string;
}

const Backdrop: React.FC<BackdropProps> = ({ onClick, className }) => {
  const content = (
    <motion.div
      className={mergeClass([
        "fixed top-0 left-0 z-10 w-screen h-screen bg-black bg-opacity-70",
        className,
      ])}
      onClick={onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      exit={{ opacity: 0, transition: { duration: 0.3 } }}
    ></motion.div>
  );
  
  const overlay = document.getElementById("backdrop-hook");
  return overlay ? ReactDOM.createPortal(content, overlay) : null;
};

export default Backdrop;
