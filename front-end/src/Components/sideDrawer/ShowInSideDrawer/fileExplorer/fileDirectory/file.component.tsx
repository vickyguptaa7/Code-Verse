import React, { useRef, useState } from "react";
import directory from "../../../../../Interface/directory.interface";
import ExplorerButtons from "./explorerButtons.component";
import ExplorerInput from "./explorerInput.component";
import { VscFile } from "react-icons/vsc";
interface IPROPS {
  fileInfo: directory;
  shiftAmount: number;
}
const File: React.FC<IPROPS> = ({ fileInfo, shiftAmount }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputInFocus, setIsInputInFocus] = useState(false);

  const addToFileNavigationHandler = () => {
    if (isInputInFocus) return;
    console.log("add to file navigation");
  };

  return (
    <div
      title="Open"
      className="flex group justify-between gap-3 cursor-pointer overflow-x-scroll hidescrollbar1 hidescrollbar2 hover:bg-[color:var(--hover-text-color)] pr-4"
      onClick={addToFileNavigationHandler}
      // extra padding to align the folder and file name
      style={{ paddingLeft: shiftAmount + 26 }}
    >
      <div className="flex items-center justify-center w-full min-w-[6rem] gap-1">
        <div className="flex items-center justify-center">
          {fileInfo.iconsUrl.length ? (
            <img src={fileInfo.iconsUrl[0]} className="w-5" alt="icon" />
          ) : (
            <VscFile className="text-[#42A5F5]" />
          )}
        </div>
        <ExplorerInput
          inputRef={inputRef}
          directoryInfo={fileInfo}
          isInputInFocus={isInputInFocus}
          setIsInputInFocus={setIsInputInFocus}
        />
      </div>
      <ExplorerButtons
        inputRef={inputRef}
        id={fileInfo.id}
        isInputInFocus={isInputInFocus}
        setIsInputInFocus={setIsInputInFocus}
        from="file"
      />
    </div>
  );
};

export default File;
