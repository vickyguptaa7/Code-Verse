import React, { useRef, useState } from "react";
import { VscChevronRight } from "react-icons/vsc";

import { FaFolder, FaFolderOpen } from "react-icons/fa";

import { twMerge } from "tailwind-merge";
import directory from "../../../../../Interface/directory.interface";
import ExplorerInput from "./explorerInput.component";
import ExplorerButtons from "./explorerButtons.component";
import DummyFileFolder from "./DummyFileFolder.component";

interface IPROPS {
  folderInfo: directory;
  children: React.ReactElement;
  shiftAmount: number;
}
const Folder: React.FC<IPROPS> = ({ folderInfo, children, shiftAmount }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isVisibleChildren, setIsVisibleChildren] = useState(false);
  const [isInputInFocus, setIsInputInFocus] = useState(false);
  const [addFileOrFolder, setAddFileOrFolder] = useState<
    "file" | "folder" | "none"
  >("none");
  const [childName, setChildName] = useState("");
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
                initialFileName={folderInfo.name}
                isInputInFocus={isInputInFocus}
                setIsInputInFocus={setIsInputInFocus}
              />
            </div>
          </div>
        </div>
        <ExplorerButtons
          inputRef={inputRef}
          isInputInFocus={isInputInFocus}
          setIsInputInFocus={setIsInputInFocus}
          setIsVisibleChildren={setIsVisibleChildren}
          setAddFileOrFolder={setAddFileOrFolder}
          from="folder"
        />
      </div>
      <div style={{ paddingLeft: shiftAmount + 8 * 2 }}>
        <DummyFileFolder
          addFileOrFolder={addFileOrFolder}
          setAddFileOrFolder={setAddFileOrFolder}
          childName={childName}
          setChildName={setChildName}
        />
      </div>
      {isVisibleChildren && children}
    </div>
  );
};

export default Folder;
