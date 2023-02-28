import React, { useState } from "react";
import { VscChevronRight, VscNewFile, VscNewFolder } from "react-icons/vsc";
import { twMerge } from "tailwind-merge";
import { useAppSelector } from "../../../../Store/store";
import FileDirectory from "./fileDirectory.compoent";

const FileDrawer = () => {
  const directories = useAppSelector(
    (state) => state.fileDirectory.directories
  );
  const [isFileDirectoryVisible, setIsFileDirectoryVisible] = useState(true);
  const [isTimelineVisible, setIsTimelineVisible] = useState(false);
  const [isOutlineVisible, setIsOutlineVisible] = useState(false);
  const addFolderHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("add Folder");
  };
  const addFileHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("add File");
  };
  const toggleIsFileDirectoryVisible = (event: React.MouseEvent) => {
    setIsFileDirectoryVisible((state) => !state);
  };

  const toggleIsTimelineVisible = (event: React.MouseEvent) => {
    setIsTimelineVisible((state) => !state);
  };

  const toggleIsOutlineVisible = (event: React.MouseEvent) => {
    setIsOutlineVisible((state) => !state);
  };

  return (
    <div className="flex flex-col justify-start h-full py-2 text-sm whitespace-nowrap">
      <div className="pl-3.5 mt-1.5 mb-2">
        <h2>EXPLORER</h2>
      </div>
      <div
        className={twMerge(
          "flex flex-col h-full",
          isFileDirectoryVisible && "justify-between"
        )}
      >
        <div className="cursor-pointer ">
          <div
            className="flex items-center justify-between gap-3 pr-4 py-0.5 group bg-[color:var(--sidepannel-color)]"
            onClick={toggleIsFileDirectoryVisible}
          >
            <div className="flex">
              <div className="flex items-center justify-center p-1">
                <VscChevronRight
                  className={twMerge(isFileDirectoryVisible && "rotate-90")}
                />
              </div>
              <div className="flex items-center justify-center">
                <h3 className="font-semibold">FOLDER-NAME</h3>
              </div>
            </div>
            <div className="flex invisible gap-1 group-hover:visible">
              <button
                title="New File"
                onClick={addFileHandler}
                className="rounded-lg hover:bg-[color:var(--hover-text-color)] p-1"
              >
                <VscNewFile className="text-[16px]" />
              </button>
              <button
                title="New Folder"
                onClick={addFolderHandler}
                className="rounded-lg hover:bg-[color:var(--hover-text-color)] p-1"
              >
                <VscNewFolder className="text-[16px]" />
              </button>
            </div>
          </div>
          {isFileDirectoryVisible && (
            <FileDirectory directoryInfo={directories} shiftAmount={9} />
          )}
        </div>
        <div className="flex flex-col">
          <div
            className="flex cursor-pointer bg-[color:var(--sidepannel-color)] py-0.5"
            onClick={toggleIsOutlineVisible}
          >
            <div className="flex items-center justify-center p-1">
              <VscChevronRight
                className={twMerge(isOutlineVisible && "rotate-90")}
              />
            </div>
            <div className="flex items-center justify-center">
              <h3 className="font-semibold">OUTLINE</h3>
            </div>
          </div>
          <div
            className="flex cursor-pointer bg-[color:var(--sidepannel-color)] py-0.5"
            onClick={toggleIsTimelineVisible}
          >
            <div className="flex items-center justify-center p-1">
              <VscChevronRight
                className={twMerge(isTimelineVisible && "rotate-90")}
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

export default FileDrawer;
