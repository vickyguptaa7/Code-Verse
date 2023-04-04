import React, { useRef, useState } from "react";
import IDirectory from "../../../../../Interface/directory.interface";
import ExplorerButtons from "./explorerButtons.component";
import RenameInput from "./renameInput.component";
import { VscFile } from "react-icons/vsc";
import { useAppDispatch, useAppSelector } from "../../../../../Store/store";
import { addFileToNavigation } from "../../../../../Store/reducres/Navigation/FileNavigation.reducer";
import { scrollToTarget } from "../../../../../utils/scrollToTargetId.util";

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
    // first the element should be added to the navigation asynchronously and then we scroll to that locationß
    scrollToTarget(fileInfo.id);
  };
  // TODO: Do something for the large names of files

  return (
    <div
      title="Open"
      className="flex group justify-between gap-3 cursor-pointer py-[1px]  hover:bg-[color:var(--hover-text-color)] min-w-fit"
      onClick={addToFileNavigationHandler}
      // extra padding to align the folder and file name
      style={{ paddingLeft: shiftAmount + 26, width: sideDrawerWidth }}
    >
      <div className="flex items-center justify-center gap-1">
        <div className="max-w-[18px] min-w-[18px]">
          {fileInfo.iconUrls.length ? (
            <img
              src={fileInfo.iconUrls[0]}
              className="object-contain"
              alt="icon"
            />
          ) : (
            <VscFile className="text-[color:var(--accent-color)] text-[16px]" />
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
          <h3 className=" p-0.5 border border-transparent cursor-pointer select-none overflow-hidden text-ellipsis selection:bg-transparent"
          style={{
            width: Math.max(
              sideDrawerWidth - shiftAmount - 26 - 95,
              40
            ),
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
