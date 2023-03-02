import React, { useRef, useState } from "react";
import {
  VscChevronRight,
  VscClose,
  VscEdit,
  VscNewFile,
  VscNewFolder,
} from "react-icons/vsc";

import { FaFolder, FaFolderOpen } from "react-icons/fa";

import { twMerge } from "tailwind-merge";
import directory from "../../../../Interface/directory.interface";
import FileDrawerInput from "./fileDrawerInput.component";

interface IPROPS {
  folderInfo: directory;
  children: React.ReactElement;
  shiftAmount: number;
}
const Folder: React.FC<IPROPS> = ({ folderInfo, children, shiftAmount }) => {
  const [isVisibleChildren, setIsVisibleChildren] = useState(false);
  const [isInputInFocus, setIsInputInFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFolderHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("add Folder");
  };
  const addFileHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("add File");
  };
  const renameFolderHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsInputInFocus(true);
    if (inputRef.current?.hasAttribute("disabled"))
      inputRef.current?.removeAttribute("disabled");
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    console.log("rename Folder");
  };
  const deleteFolderHandler = (event: React.MouseEvent) => {
    event.stopPropagation();

    console.log("delete Folder");
  };
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
        <div className="flex justify-between gap-3 pr-4 py-0.5 w-full">
          <div className="flex items-center justify-center gap-1.5 w-full min-w-[6rem]">
            <div>
              {isVisibleChildren ? (
                <FaFolderOpen className="" />
              ) : (
                <FaFolder className="" />
              )}
            </div>
            <div className="flex items-center justify-center w-full ">
              <FileDrawerInput
                inputRef={inputRef}
                initialFileName={folderInfo.name}
                isInputInFocus={isInputInFocus}
                setIsInputInFocus={setIsInputInFocus}
              />
            </div>
          </div>
          <div className="flex items-center justify-center invisible group-hover:visible text-[color:var(--primary-text-color)]">
            <button
              title="New File"
              onClick={addFileHandler}
              className="rounded-lg hover:text-[color:var(--highlight-text-color)] p-1"
            >
              <VscNewFile className="text-[15px]" />
            </button>
            <button
              title="New Folder"
              onClick={addFolderHandler}
              className="rounded-lg hover:text-[color:var(--highlight-text-color)] p-1"
            >
              <VscNewFolder className="text-[15px]" />
            </button>
            <button
              title="Rename"
              onClick={renameFolderHandler}
              className="rounded-lg hover:text-[color:var(--highlight-text-color)] p-1"
            >
              <VscEdit className="text-[14px]" />
            </button>
            <button
              title="Delete"
              onClick={deleteFolderHandler}
              className="rounded-lg hover:text-[color:var(--highlight-text-color)] p-1"
            >
              <VscClose className="text-[15px]" />
            </button>
          </div>
        </div>
      </div>
      {isVisibleChildren && children}
    </div>
  );
};

export default Folder;
