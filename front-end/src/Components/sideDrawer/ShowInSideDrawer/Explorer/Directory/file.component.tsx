import React, { useRef, useState } from "react";
import { VscFile } from "react-icons/vsc";
import IDirectory from "../../../../../@types/directory.d";
import { addFileToNavigation } from "../../../../../Store/reducres/Navigation/FileNavigation.reducer";
import { useAppDispatch, useAppSelector } from "../../../../../Store/store";
import { scrollToTarget } from "../../../../../utils/scrollToTargetId.util";
import Image from "../../../../UI/Image.component";
import ExplorerButtons from "./explorerButtons.component";
import RenameInput from "./renameInput.component";

interface IPROPS {
  fileInfo: IDirectory;
  shiftAmount: number;
}
const File: React.FC<IPROPS> = ({ fileInfo, shiftAmount }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isInputInFocus, setIsInputInFocus] = useState(false);

  const dispatch = useAppDispatch();
  const sideDrawerWidth = useAppSelector(
    (state) => state.sideDrawer.sideDrawerWidth
  );

  const addToFileNavigationHandler = (event: React.MouseEvent) => {
    if (isInputInFocus) return;
    dispatch(addFileToNavigation({ id: fileInfo.id, type: "file" }));
    // first the element should be added to the navigation asynchronously and then we scroll to that location
    scrollToTarget(fileInfo.id);
  };

  return (
    <div
      title="Open"
      className="flex group justify-between gap-1 cursor-pointer py-[1px]  hover:bg-[color:var(--hover-text-color)] min-w-fit"
      onClick={addToFileNavigationHandler}
      // extra padding to align the folder and file name
      style={{ paddingLeft: shiftAmount + 26, width: sideDrawerWidth }}
    >
      <div className="flex items-center justify-start w-full gap-1 ">
        <div className="max-w-[18px] min-w-[18px]">
          <Image
            fallback={
              <VscFile className="text-[color:var(--primary-color)] text-[16px]" />
            }
            src={fileInfo.iconUrls[0]}
            className="object-contain"
            alt="icon"
          />
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
          <h3
            className=" p-0.5 border border-transparent cursor-pointer select-none overflow-hidden text-ellipsis selection:bg-transparent"
            style={{
              width: Math.max(sideDrawerWidth - shiftAmount - 26 - 72, 40),
            }}
          >
            {fileInfo.name}
          </h3>
        )}
      </div>
      {isInputInFocus ? null : (
        <ExplorerButtons
          id={fileInfo.id}
          name={fileInfo.name}
          path={fileInfo.path.split("/")}
          isInputInFocus={isInputInFocus}
          setIsInputInFocus={setIsInputInFocus}
          from="file"
        />
      )}
    </div>
  );
};

export default File;
