import React, { useRef, useState } from "react";
import { VscChevronRight } from "react-icons/vsc";

import { twMerge } from "tailwind-merge";
import IDirectory from "../../../../../Interface/directory.interface";
import ExplorerInput from "./explorerInput.component";
import ExplorerButtons from "./explorerButtons.component";
import NewFileOrFolderDummy from "./newFileOrFolderDummy.component";

import { motion, AnimatePresence } from "framer-motion";
import { FaFolder, FaFolderOpen } from "react-icons/fa";

interface IPROPS {
  folderInfo: IDirectory;
  children: React.ReactElement;
  shiftAmount: number;
}
const Folder: React.FC<IPROPS> = ({ folderInfo, children, shiftAmount }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const childRef = useRef<HTMLInputElement>(null);
  const [isFolderOpen, setIsFolderOpen] = useState(false);
  const [isInputInFocus, setIsInputInFocus] = useState(false);
  const [isFileOrFolder, setIsFileOrFolder] = useState<
    "file" | "folder" | "none"
  >("none");
  const [newFileOrFolderDummyTimerId, setNewFileOrFolderDummyTimerId] =
    useState<{
      isTimer: boolean;
      id: ReturnType<typeof setTimeout> | null;
    }>({ isTimer: false, id: null });

  const toggleChildrenVisibilityHandler = () => {
    console.log("hide/show children visibility");
    setIsFolderOpen((state) => !state);
  };

  return (
    <div className="">
      <div
        className="flex gap-1 hover:bg-[color:var(--hover-text-color)] group cursor-pointer w-full min-w-fit "
        title={`${isFolderOpen ? "Hide" : "Show"} Content`}
        style={{ paddingLeft: shiftAmount + 8 }}
        onClick={toggleChildrenVisibilityHandler}
      >
        <div className="flex items-center justify-center">
          <VscChevronRight
            className={twMerge(isFolderOpen && "rotate-90")}
          />
        </div>
        <div className="flex justify-between w-full gap-3 pr-4">
          <div className="flex items-center justify-center gap-1.5 w-full min-w-[6rem]">
            <div className="min-w-[18px] max-w-[18px]">
              {folderInfo.iconsUrl.length ? (
                <img
                  src={folderInfo.iconsUrl[isFolderOpen ? 1 : 0]}
                  className="object-contain"
                  alt="icon"
                />
              ) : isFolderOpen ? (
                <FaFolderOpen className="text-[15px]" />
              ) : (
                <FaFolder className="text-[15px]" />
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
          setIsFolderOpen={setIsFolderOpen}
          setIsFileOrFolder={setIsFileOrFolder}
          isFileOrFolder={isFileOrFolder}
          newFileOrFolderDummyTimerId={newFileOrFolderDummyTimerId}
          setNewFileOrFolderDummyTimerId={setNewFileOrFolderDummyTimerId}
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
              y: newFileOrFolderDummyTimerId.isTimer ? -2 : 0,
              transition: {
                duration: newFileOrFolderDummyTimerId.isTimer ? 0.1 : 0,
              },
            }}
          >
            <NewFileOrFolderDummy
              isFileOrFolder={isFileOrFolder}
              setIsFileOrFolder={setIsFileOrFolder}
              parentId={folderInfo.id}
              setNewFileOrFolderDummyTimerId={setNewFileOrFolderDummyTimerId}
              childRef={childRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {isFolderOpen && children}
    </div>
  );
};

export default Folder;
