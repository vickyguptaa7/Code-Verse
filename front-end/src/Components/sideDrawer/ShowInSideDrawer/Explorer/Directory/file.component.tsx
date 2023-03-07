import React, { useRef, useState } from "react";
import IDirectory from "../../../../../Interface/directory.interface";
import ExplorerButtons from "./explorerButtons.component";
import RenameInput from "./renameInput.component";
import { VscFile } from "react-icons/vsc";
interface IPROPS {
  fileInfo: IDirectory;
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
      className="flex group justify-between gap-3 cursor-pointer  hover:bg-[color:var(--hover-text-color)] pr-4 w-full min-w-fit"
      onClick={addToFileNavigationHandler}
      // extra padding to align the folder and file name
      style={{ paddingLeft: shiftAmount + 26 }}
    >
      <div className="flex items-center justify-center w-full min-w-[6rem] gap-1">
        <div className="max-w-[18px] min-w-[18px]">
          {fileInfo.iconsUrl.length ? (
            <img
              src={fileInfo.iconsUrl[0]}
              className="object-contain"
              alt="icon"
            />
          ) : (
            <VscFile className="text-[#42A5F5] text-[16px]" />
          )}
        </div>
        {isInputInFocus ? (
          <RenameInput
            inputRef={inputRef}
            id={fileInfo.id}
            directoryInfo={fileInfo}
            isInputInFocus={isInputInFocus}
            setIsInputInFocus={setIsInputInFocus}
          />
        ) : (
          <h3 className="cursor-pointer w-full overflow-clip p-[2px] select-none border border-transparent selection:bg-transparent">
            {fileInfo.name}
          </h3>
        )}
      </div>
      {isInputInFocus ? null : (
        <ExplorerButtons
          id={fileInfo.id}
          isInputInFocus={isInputInFocus}
          setIsInputInFocus={setIsInputInFocus}
          from="file"
        />
      )}
    </div>
  );
};

export default File;
