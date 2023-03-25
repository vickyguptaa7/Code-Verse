import React from "react";

import { RxCross2 } from "react-icons/rx";
import { VscFile } from "react-icons/vsc";

import { IFile } from "../../Interface/file.interface";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { twMerge } from "tailwind-merge";
import { setCurrentNavFile } from "../../Store/reducres/Navigation/FileNavigation.reducer";
import Button from "../UI/Button.component";

// constant
import { MAX_FILE_LENGTH } from "./FileNavigation.Constant";

interface IPROPS {
  fileInfo: IFile;
  removeFileHandler: Function;
}

const FileCard: React.FC<IPROPS> = ({ fileInfo, removeFileHandler }) => {
  const currentNavFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );
  const dispatch = useAppDispatch();
  const isThisActiveNavFile = currentNavFile.id === fileInfo.id;
  const activeClassName = isThisActiveNavFile
    ? "bg-[color:var(--codeeditor-color)] border-b-[color:var(--accent-color)]"
    : "border-b-[color:var(--sidepannel-color)] ";

  let languageLogo: JSX.Element;

  if (fileInfo.iconUrls.length === 0)
    languageLogo = (
      <VscFile className="text-[18px] text-[color:var(--accent-color)] " />
    );
  else
    languageLogo = (
      <div className="max-w-[20px] min-w-[20px]">
        <img src={fileInfo.iconUrls[0]} className="object-contain" alt="icon" />
      </div>
    );

  const removeHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    removeFileHandler(fileInfo.id);
    console.log("Remove", fileInfo.id);
  };

  const fileName =
    fileInfo.name.length < MAX_FILE_LENGTH
      ? fileInfo.name
      : fileInfo.name.substring(0, MAX_FILE_LENGTH - 3) + "...";

  const changeCurrentFileInNavigationHandler = (event: React.MouseEvent) => {
    dispatch(
      setCurrentNavFile({
        id: fileInfo.id,
        type:
          fileInfo.id === "setting"
            ? "setting"
            : fileInfo.id === "extension"
            ? "extension"
            : fileInfo.id === "welcome"
            ? "welcome"
            : "file",
      })
    );
  };

  return (
    <div
      className={twMerge(
        "flex items-center cursor-pointer justify-between gap-2 px-2.5 py-1 pb-1  border-b-[1.6px] border-r border-r-black group",
        activeClassName
      )}
      id={fileInfo.id}
      onClick={changeCurrentFileInNavigationHandler}
    >
      <div className="flex items-center justify-center w-full h-full language-logo">
        {languageLogo}
      </div>
      <div className="text-start whitespace-nowrap">
        <h1
          className={twMerge(
            "pr-3 text-[color:var(--primary-text-color)]",
            isThisActiveNavFile
              ? "text-[color:var(--highlight-text-color)]"
              : ""
          )}
        >
          {fileName}
        </h1>
      </div>
      <div
        className={twMerge(
          "close-logo pt-[2px] text-[color:var(--highlight-text-color)] group-hover:visible",
          isThisActiveNavFile ? "" : "invisible"
        )}
      >
        <Button
          onClick={removeHandler}
          className="flex items-center justify-start"
        >
          <RxCross2 className="text-lg hover:bg-[color:var(--hover-text-color)] rounded-md duration-100 p-[2px] flex" />
        </Button>
      </div>
    </div>
  );
};

export default FileCard;
