import React, { useRef, useState } from "react";
import { useAppSelector } from "../../../../Store/store";

import ExplorerButtons from "./Directory/explorerButtons.component";
import NewFileOrFolderDummy from "./Directory/newFileOrFolderDummy.component";
import Directory from "./Directory/Directory.compoent";

import { VscChevronRight } from "react-icons/vsc";
import { AnimatePresence, motion } from "framer-motion";
import { twMerge } from "tailwind-merge";

const EDITOR_MIN_HEIGHT = 480;

const ExplorerFolder = () => {
  const childRef = useRef<HTMLInputElement>(null);
  const [isInputInFocus, setIsInputInFocus] = useState(false);
  const [isExplorerFolderOpen, setIsExplorerFolderOpen] = useState(true);
  const [newFileOrFolderDummyTimerId, setNewFileOrFolderDummyTimerId] =
    useState<{
      isTimer: boolean;
      id: ReturnType<typeof setTimeout> | null;
    }>({ isTimer: false, id: null });
  const directories = useAppSelector(
    (state) => state.Directory.directories
  );
  const [isFileOrFolder, setIsFileOrFolder] = useState<
    "file" | "folder" | "none"
  >("none");
  const fileDirectoryHeight = isExplorerFolderOpen
    ? Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) - 150
    : 0;

  return (
    <>
      <div className="flex items-center justify-between gap-3 pr-4 py-0.5 group bg-[color:var(--sidepannel-color)]">
        <div
          className="flex cursor-pointer"
          onClick={() => setIsExplorerFolderOpen(!isExplorerFolderOpen)}
        >
          <div className="flex items-center justify-center p-1">
            <VscChevronRight
              className={twMerge(isExplorerFolderOpen ? "rotate-90" : "")}
            />
          </div>
          <div className="flex items-center justify-center">
            <h3 className="font-semibold">FOLDER-NAME</h3>
          </div>
        </div>
        <ExplorerButtons
          isInputInFocus={isInputInFocus}
          setIsInputInFocus={setIsInputInFocus}
          setIsFileOrFolder={setIsFileOrFolder}
          setIsFolderOpen={setIsExplorerFolderOpen}
          isFileOrFolder={isFileOrFolder}
          newFileOrFolderDummyTimerId={newFileOrFolderDummyTimerId}
          setNewFileOrFolderDummyTimerId={setNewFileOrFolderDummyTimerId}
          childRef={childRef}
          id="root"
          from="root"
        />
      </div>
      <div
        className="overflow-y-scroll"
        // subtracted 150 bcoz of other content on the explorer to get the scroll bar we have to fix the height of the div
        style={{ height: fileDirectoryHeight }}
      >
        <AnimatePresence>
          {isFileOrFolder !== "none" ? (
            <motion.div
              className=""
              style={{ paddingLeft: 17 }}
              key="id1"
              initial={{ y: -2, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.1 }}
              // exit animation only when inputIsBlur and child field is empty otherwise we have to add new file or folder so we don't want any animations
              exit={{
                opacity: 0,
                y:
                  newFileOrFolderDummyTimerId.isTimer &&
                  !childRef.current?.value
                    ? -2
                    : 0,
                transition: {
                  duration:
                    newFileOrFolderDummyTimerId.isTimer &&
                    !childRef.current?.value
                      ? 0.1
                      : 0,
                },
              }}
            >
              <NewFileOrFolderDummy
                isFileOrFolder={isFileOrFolder}
                setIsFileOrFolder={setIsFileOrFolder}
                setNewFileOrFolderDummyTimerId={setNewFileOrFolderDummyTimerId}
                parentId={"root"}
                childRef={childRef}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
        {isExplorerFolderOpen ? (
          <Directory directoryInfo={directories} shiftAmount={9} />
        ) : null}
      </div>
    </>
  );
};

export default ExplorerFolder;
