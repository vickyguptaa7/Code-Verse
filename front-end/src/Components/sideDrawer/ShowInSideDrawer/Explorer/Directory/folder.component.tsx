import { AnimatePresence, motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { FaFolder, FaFolderOpen } from "react-icons/fa";
import { VscChevronRight } from "react-icons/vsc";
import IDirectory from "../../../../../@types/directory.d";
import { useAppSelector } from "../../../../../Store/store";
import { mergeClass } from "../../../../../library/tailwindMerge/tailwindMerge.lib";
import Image from "../../../../UI/Image.component";
import ExplorerButtons from "./explorerButtons.component";
import NewFileOrFolderDummy from "./newFileOrFolderDummy.component";
import RenameInput from "./renameInput.component";

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

  const sideDrawerWidth = useAppSelector(
    (state) => state.sideDrawer.sideDrawerWidth
  );

  const [newFileOrFolderDummyTimerId, setNewFileOrFolderDummyTimerId] =
    useState<{
      isTimer: boolean;
      id: ReturnType<typeof setTimeout> | null;
    }>({ isTimer: false, id: null });

  const toggleChildrenVisibilityHandler = () => {
    setIsFolderOpen((state) => !state);
  };

  return (
    <>
      <div
        className="flex gap-1 hover:bg-[color:var(--hover-text-color)] group cursor-pointer w-full min-w-fit py-[1px] "
        title={`${isFolderOpen ? "Hide" : "Show"} Content`}
        style={{ paddingLeft: shiftAmount + 8, width: sideDrawerWidth }}
        onClick={toggleChildrenVisibilityHandler}
      >
        <div className="flex items-center justify-center">
          <VscChevronRight
            className={mergeClass([
              isFolderOpen && "rotate-90",
              "duration-200",
            ])}
          />
        </div>
        <div className="flex justify-between w-full gap-3 ">
          <div className="flex items-center gap-1.5 w-full">
            <div className="min-w-[18px] max-w-[18px]">
              <Image
                fallback={
                  isFolderOpen ? (
                    <FaFolderOpen className="text-[15px]" />
                  ) : (
                    <FaFolder className="text-[15px]" />
                  )
                }
                src={folderInfo.iconUrls[isFolderOpen ? 1 : 0]}
                className="object-contain"
                alt="icon"
              />
            </div>
            <div className="flex items-center w-full">
              {isInputInFocus ? (
                <RenameInput
                  inputRef={inputRef}
                  id={folderInfo.id}
                  directoryInfo={folderInfo}
                  isInputInFocus={isInputInFocus}
                  setIsInputInFocus={setIsInputInFocus}
                />
              ) : (
                <h3
                  className="cursor-pointer  overflow-hidden text-ellipsis p-[2px] select-none border border-transparent selection:bg-transparent"
                  style={{
                    width: Math.max(
                      sideDrawerWidth - shiftAmount - 8 - 135,
                      40
                    ),
                  }}
                >
                  {folderInfo.name}
                </h3>
              )}
            </div>
          </div>
        </div>
        {isInputInFocus ? null : (
          <ExplorerButtons
            id={folderInfo.id}
            name={folderInfo.name}
            path={folderInfo.path.split("/")}
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
        )}
      </div>
      <AnimatePresence>
        {isFileOrFolder !== "none" && (
          <motion.div
            style={{ paddingLeft: shiftAmount + 8 * 2 }}
            key="id2"
            initial={{ y: -2, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.1 }}
            // exit animation only when inputIsBlur and child field is empty otherwise we have to add new file or folder so we don't want any animations
            exit={{
              opacity: 0,
              y:
                newFileOrFolderDummyTimerId.isTimer && !childRef.current?.value
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
              path={folderInfo.path.split("/")}
              parentId={folderInfo.id}
              setNewFileOrFolderDummyTimerId={setNewFileOrFolderDummyTimerId}
              childRef={childRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
      {isFolderOpen && children}
    </>
  );
};

export default Folder;
