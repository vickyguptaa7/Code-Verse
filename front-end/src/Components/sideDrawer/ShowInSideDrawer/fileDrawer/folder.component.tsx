import React, { useState } from "react";
import {
  VscChevronRight,
  VscClose,
  VscEdit,
  VscNewFile,
  VscNewFolder,
} from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import directory from "../../../../Interface/directory.interface";
interface IPROPS {
  folderInfo: directory;
  children: React.ReactElement;
  shiftAmount: number;
}
const Folder: React.FC<IPROPS> = ({ folderInfo, children, shiftAmount }) => {
  const [isVisibleChildren, setIsVisibleChildren] = useState(false);
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
        className="flex gap-1 hover:bg-[color:var(--hover-text-color)] group cursor-pointer"
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
          <div className="flex items-center justify-center">
            <h3>{folderInfo.name}</h3>
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
