import React, { useRef, useState } from "react";
import { VscClose, VscEdit } from "react-icons/vsc";
import directory from "../../../../Interface/directory.interface";
import FileDrawerInput from "./fileDrawerInput.component";
interface IPROPS {
  fileInfo: directory;
  shiftAmount: number;
}
const File: React.FC<IPROPS> = ({ fileInfo, shiftAmount }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputInFocus, setIsInputInFocus] = useState(false);

  const renameFileHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsInputInFocus(true);
    if (inputRef.current?.hasAttribute("disabled"))
      inputRef.current?.removeAttribute("disabled");
    inputRef.current?.focus();
    inputRef.current?.setSelectionRange(0, inputRef.current.value.length);
    console.log("rename file");
  };

  const deleteFileHandler = (event: React.MouseEvent) => {
    event.stopPropagation();
    console.log("delete file");
  };
  const addToFileNavigationHandler = () => {
    if (isInputInFocus) return;
    console.log("add to file navigation");
  };

  return (
    <div
      title="Open"
      className="flex py-0.5 group justify-between gap-3 cursor-pointer overflow-x-scroll hidescrollbar1 hidescrollbar2 hover:bg-[color:var(--hover-text-color)] pr-4"
      onClick={addToFileNavigationHandler}
      // extra padding to align the folder and file name
      style={{ paddingLeft: shiftAmount + 19 }}
    >
      <div className="flex items-center justify-center w-full min-w-[6rem]">
        <FileDrawerInput
          inputRef={inputRef}
          initialFileName={fileInfo.name}
          isInputInFocus={isInputInFocus}
          setIsInputInFocus={setIsInputInFocus}
        />
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
