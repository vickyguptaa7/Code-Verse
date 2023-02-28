import { rename } from "fs";
import React from "react";
import { VscClose, VscEdit } from "react-icons/vsc";
import directory from "../../../../Interface/directory.interface";
interface IPROPS {
  fileInfo: directory;
  shiftAmount: number;
}
const File: React.FC<IPROPS> = ({ fileInfo, shiftAmount }) => {
  const renameFileHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("rename file");
  };
  const deleteFileHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("delete file");
  };
  const addToFileNavigationHandler = () => {
    console.log("add to file navigation");
  };
  return (
    <div
      title="Open"
      className="flex group justify-between gap-3 cursor-pointer overflow-x-scroll hidescrollbar1 hidescrollbar2 hover:bg-[color:var(--hover-text-color)] pr-4 py-0.5"
      onClick={addToFileNavigationHandler}
      // extra padding to align the folder and file name
      style={{ paddingLeft: shiftAmount + 19 }}
    >
      <div className="flex items-center justify-center">
        <h3>{fileInfo.name}</h3>
      </div>
      <div className="flex invisible group-hover:visible text-[color:var(--primary-text-color)]">
        <button
          title="Rename"
          onClick={renameFileHandler}
          className="rounded-lg hover:text-[color:var(--highlight-text-color)] p-1"
        >
          <VscEdit className="text-[14px]" />
        </button>
        <button
          title="Delete"
          onClick={deleteFileHandler}
          className="rounded-lg hover:text-[color:var(--highlight-text-color)] p-1"
        >
          <VscClose className="text-[15px]" />
        </button>
      </div>
    </div>
  );
};

export default File;
