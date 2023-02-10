import React from "react";

import { CgCPlusPlus } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { IoLogoPython } from "react-icons/io";
import { SiJava } from "react-icons/si";
import { BiCodeAlt } from "react-icons/bi";

import file from "../../Interface/file.interface";

// constant
import {MAX_FILE_LENGTH} from "./FileNavigation.Constant";

interface IPROPS {
  fileInfo: file;
  removeFileHandler: Function;
}

const FileCard: React.FC<IPROPS> = ({ fileInfo, removeFileHandler }) => {
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

  const removeHandler = (evet: React.MouseEvent<HTMLButtonElement>) => {
    removeFileHandler(fileInfo.id);
    console.log("Remove", fileInfo.id);
  };

  const fileName =
    fileInfo.fileName.length < MAX_FILE_LENGTH
      ? fileInfo.fileName
      : fileInfo.fileName.substring(0, MAX_FILE_LENGTH-3) + "...";

  return (
    <div className="flex items-center justify-between gap-2 px-4 py-1 pb-1 bg-white border-r border-black ">
      <div className="language-logo">{languageLogo}</div>
      <div className="text-start">
        <h1 className="pr-3 text-sm text-black">{fileName}</h1>
      </div>
      <div className="close-logo pt-[2px]">
        <button onClick={removeHandler}>
          <RxCross2 className="text-sm hover:bg-gray-200 rounded-full duration-300 hover:text-gray-600 p-[1px] flex" />
        </button>
      </div>
    </div>
  );
};

export default FileCard;
