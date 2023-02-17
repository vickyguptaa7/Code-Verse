import React from "react";

import { CgCPlusPlus } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { IoLogoPython } from "react-icons/io";
import { SiJava } from "react-icons/si";
import { BiCodeAlt } from "react-icons/bi";

import file from "../../Interface/file.interface";

// constant
import { MAX_FILE_LENGTH } from "./FileNavigation.Constant";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { twMerge } from "tailwind-merge";
import { setCurrentNavFile } from "../../Store/reducres/File/FileNavigation.reducer";

interface IPROPS {
  fileInfo: file;
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

  if (fileInfo.language === "cpp") {
    languageLogo = <CgCPlusPlus className="text-[1.25rem] text-blue-600 " />;
  } else if (fileInfo.language === "python") {
    languageLogo = <IoLogoPython className="text-[1.25rem] text-blue-600 " />;
  } else if (fileInfo.language) {
    languageLogo = <SiJava className="text-[1.25rem] text-yellow-600 " />;
  } else {
    languageLogo = <BiCodeAlt className="text-[1.25rem] text-blue-600 " />;
  }

  const removeHandler = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    removeFileHandler(fileInfo.id);
    console.log("Remove", fileInfo.id);
  };

  const fileName =
    fileInfo.fileName.length < MAX_FILE_LENGTH
      ? fileInfo.fileName
      : fileInfo.fileName.substring(0, MAX_FILE_LENGTH - 3) + "...";

  const changeCurrentFileInNavigationHandler = (event:React.MouseEvent) => {
    dispatch(setCurrentNavFile(fileInfo));
  };

  return (
    <button
      className={twMerge(
        "flex items-center justify-between gap-2 px-2.5 py-1 pb-1  border-b-[1.6px] border-r border-r-black group",
        activeClassName
      )}
      onClick={changeCurrentFileInNavigationHandler}
    >
      <div className="language-logo">{languageLogo}</div>
      <div className="text-start">
        <h1 className="pr-3 text-[color:var(--primary-text-color)]">
          {fileName}
        </h1>
      </div>
      <div
        className={twMerge(
          "close-logo pt-[2px] text-[color:var(--highlight-text-color)] group-hover:visible",
          isThisActiveNavFile ? "" : "invisible"
        )}
      >
        <button
          onClick={removeHandler}
          className="flex items-center justify-start"
        >
          <RxCross2 className="text-lg hover:bg-[color:var(--hover-text-color)] rounded-md duration-100 p-[2px] flex" />
        </button>
      </div>
    </button>
  );
};

export default FileCard;
