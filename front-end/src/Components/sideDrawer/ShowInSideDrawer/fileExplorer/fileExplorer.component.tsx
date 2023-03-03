import React, { useRef, useState } from "react";
import { VscChevronRight } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../../../Store/store";
import DummyFileFolder from "./fileDirectory/DummyFileFolder.component";
import ExplorerButtons from "./fileDirectory/explorerButtons.component";
import FileDirectory from "./fileDirectory.compoent";

import { motion, AnimatePresence } from "framer-motion";

const FileExplorer = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const childRef = useRef<HTMLInputElement>(null);
  const [isInputInFocus, setIsInputInFocus] = useState(false);
  const [timerId, setTimerId] = useState<{
    isTimer: boolean;
    id: ReturnType<typeof setTimeout> | null;
  }>({ isTimer: false, id: null });

  const directories = useAppSelector(
    (state) => state.fileDirectory.directories
  );
  const [isExplorerContentVisible, setIsExplorerContentVisible] = useState({
    fileDirectory: true,
    outline: false,
    timeline: false,
  });
  const [isFileOrFolder, setIsFileOrFolder] = useState<
    "file" | "folder" | "none"
  >("none");

  const toggleExplorerContentHandler = (
    key: "fileDirectory" | "timeline" | "outline"
  ) => {
    setIsExplorerContentVisible({
      ...isExplorerContentVisible,
      [key]: !isExplorerContentVisible[key],
    });
  };
  const showFileExplorerContent = () => {
    if (isExplorerContentVisible.fileDirectory) return;
    setIsExplorerContentVisible({
      ...isExplorerContentVisible,
      fileDirectory: true,
    });
  };
  const fileDirectoryHeight = isExplorerContentVisible.fileDirectory
    ? document.body.clientHeight - 150
    : 0;

  return (
    <div className="flex flex-col justify-start h-full py-2 text-sm whitespace-nowrap ">
      <div className="pl-3.5 mt-1.5 mb-2">
        <h2>EXPLORER</h2>
      </div>
      <div
        className={twMerge(
          "flex flex-col h-full",
          isExplorerContentVisible.fileDirectory && "justify-between"
        )}
      >
        <div className="cursor-pointer ">
          <div
            className="flex items-center justify-between gap-3 pr-4 py-0.5 group bg-[color:var(--sidepannel-color)]"
            onClick={() => toggleExplorerContentHandler("fileDirectory")}
          >
            <div className="flex">
              <div className="flex items-center justify-center p-1">
                <VscChevronRight
                  className={twMerge(
                    isExplorerContentVisible.fileDirectory && "rotate-90"
                  )}
                />
              </div>
              <div className="flex items-center justify-center">
                <h3 className="font-semibold">FOLDER-NAME</h3>
              </div>
            </div>
            <ExplorerButtons
              inputRef={inputRef}
              isInputInFocus={isInputInFocus}
              setIsInputInFocus={setIsInputInFocus}
              setIsFileOrFolder={setIsFileOrFolder}
              setIsVisibleChildren={showFileExplorerContent}
              isFileOrFolder={isFileOrFolder}
              timerId={timerId}
              setTimerId={setTimerId}
              childRef={childRef}
              from="root"
            />
          </div>
          <div
            className="overflow-y-scroll"
            // subtracted 150 bcoz of other content on the explorer to get the scroll bar we have to fix the height of the div
            style={{ height: fileDirectoryHeight }}
          >
            <AnimatePresence>
              {isFileOrFolder !== "none" && (
                <motion.div
                  className=""
                  style={{ paddingLeft: 17 }}
                  key="id1"
                  initial={{ y: -2, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.1 }}
                  exit={{ opacity: 0, y: -2 }}
                >
                  <DummyFileFolder
                    isFileOrFolder={isFileOrFolder}
                    setIsFileOrFolder={setIsFileOrFolder}
                    setTimerId={setTimerId}
                    parentId={"root"}
                    childRef={childRef}
                  />
                </motion.div>
              )}
            </AnimatePresence>
            {isExplorerContentVisible.fileDirectory && (
              <FileDirectory directoryInfo={directories} shiftAmount={9} />
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <div
            className="flex cursor-pointer bg-[color:var(--sidepannel-color)] py-0.5"
            onClick={() => toggleExplorerContentHandler("outline")}
          >
            <div className="flex items-center justify-center p-1">
              <VscChevronRight
                className={twMerge(
                  isExplorerContentVisible.outline && "rotate-90"
                )}
              />
            </div>
            <div className="flex items-center justify-center">
              <h3 className="font-semibold">OUTLINE</h3>
            </div>
          </div>
          <div
            className="flex cursor-pointer bg-[color:var(--sidepannel-color)] py-0.5"
            onClick={() => toggleExplorerContentHandler("timeline")}
          >
            <div className="flex items-center justify-center p-1">
              <VscChevronRight
                className={twMerge(
                  isExplorerContentVisible.timeline && "rotate-90"
                )}
              />
            </div>
            <div className="flex items-center justify-center">
              <h3 className="font-semibold">TIMELINE</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileExplorer;
