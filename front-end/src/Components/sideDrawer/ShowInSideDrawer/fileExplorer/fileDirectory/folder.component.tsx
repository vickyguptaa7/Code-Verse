import React, { useRef, useState } from "react";
import { VscChevronRight } from "react-icons/vsc";

import { FaFolder, FaFolderOpen } from "react-icons/fa";

import { twMerge } from "tailwind-merge";
import directory from "../../../../../Interface/directory.interface";
import ExplorerInput from "./explorerInput.component";
import ExplorerButtons from "./explorerButtons.component";
import DummyFileFolder from "./DummyFileFolder.component";

import { motion, AnimatePresence } from "framer-motion";

interface IPROPS {
  folderInfo: directory;
  children: React.ReactElement;
  shiftAmount: number;
}
const Folder: React.FC<IPROPS> = ({ folderInfo, children, shiftAmount }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const childRef = useRef<HTMLInputElement>(null);
  const [isVisibleChildren, setIsVisibleChildren] = useState(false);
  const [isInputInFocus, setIsInputInFocus] = useState(false);
  const [isFileOrFolder, setIsFileOrFolder] = useState<
    "file" | "folder" | "none"
  >("none");
  const [timerId, setTimerId] = useState<{
    isTimer: boolean;
    id: ReturnType<typeof setTimeout> | null;
  }>({ isTimer: false, id: null });

  const toggleChildrenVisibilityHandler = () => {
    console.log("hide/show children visibility");
    setIsVisibleChildren((state) => !state);
  };
  return (
    <div className="">
      <div
        className="flex gap-1 hover:bg-[color:var(--hover-text-color)] group cursor-pointer overflow-x-scroll hidescrollbar1 hidescrollbar2"
        title={`${isVisibleChildren ? "Hide" : "Show"} Content`}
        style={{ paddingLeft: shiftAmount + 8 }}
        onClick={toggleChildrenVisibilityHandler}
      >
        <div className="flex items-center justify-center">
          <VscChevronRight
            className={twMerge(isVisibleChildren && "rotate-90")}
          />
        </div>
        <div className="flex justify-between w-full gap-3 pr-4">
          <div className="flex items-center justify-center gap-1.5 w-full min-w-[6rem]">
            <div>
              {isVisibleChildren ? (
                <FaFolderOpen className="" />
              ) : (
                <FaFolder className="" />
              )}
            </div>
            <div className="flex items-center justify-center w-full ">
              <ExplorerInput
                inputRef={inputRef}
                directoryInfo={folderInfo}
                isInputInFocus={isInputInFocus}
                setIsInputInFocus={setIsInputInFocus}
              />
            </div>
          </div>
        </div>
        <ExplorerButtons
          inputRef={inputRef}
          id={folderInfo.id}
          isInputInFocus={isInputInFocus}
          setIsInputInFocus={setIsInputInFocus}
          setIsVisibleChildren={setIsVisibleChildren}
          setIsFileOrFolder={setIsFileOrFolder}
          isFileOrFolder={isFileOrFolder}
          timerId={timerId}
          setTimerId={setTimerId}
          childRef={childRef}
          from="folder"
        />
      </div>
      <AnimatePresence>
        {isFileOrFolder !== "none" && (
          <motion.div
            style={{ paddingLeft: shiftAmount + 8 * 2 }}
            key="id2"
            initial={{ y: -2, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
            exit={{
              opacity: 0,
              y: timerId.isTimer ? -2 : 0,
              transition: { duration: timerId.isTimer ? 0.1 : 0 },
            }}
          >
            <DummyFileFolder
              isFileOrFolder={isFileOrFolder}
              setIsFileOrFolder={setIsFileOrFolder}
              parentId={folderInfo.id}
              setTimerId={setTimerId}
              childRef={childRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {isVisibleChildren && children}
    </div>
  );
};

export default Folder;
