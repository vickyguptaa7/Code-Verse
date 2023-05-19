import { motion } from "framer-motion";
import React from "react";
import logo from "./../../../Assets/images/code-verse/code-verse.svg";
import "./Loader.styles.css";
interface IPROPS {
  type: "spinner" | "loading" | "editorLoader";
}

const Loader: React.FC<IPROPS> = ({ type }) => {
  if (type === "spinner")
    return (
      <motion.div
        className="flex items-center justify-center mt-5"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="loader animate-spin bg-red w-6 aspect-square border-[0.2rem] border-[color:var(--accent-color)] border-t-[0.4rem] border-t-transparent rounded-full"></div>
      </motion.div>
    );

  if (type === "editorLoader") {
    return (
      <motion.div
        className="flex flex-col items-center justify-center w-full h-full gap-4 bg-[color:var(--codeeditor-color)]"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <img src={logo} className="w-32 animate-bounce aspect-square"  alt="Loading..." />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="flex flex-col items-center justify-center w-full h-full gap-4 bg-[color:var(--codeeditor-color)]"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <img src={logo} className="w-40 aspect-square" alt="Loading..." />
      <div className="w-40 overflow-hidden bg-gray-200 rounded-lg">
        <div className="rounded-full moving-div"></div>
      </div>
    </motion.div>
  );
};

export default Loader;
