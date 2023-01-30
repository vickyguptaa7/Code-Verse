import React from "react";

import { CgCPlusPlus } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import { IoLogoPython } from "react-icons/io";
import { SiJava } from "react-icons/si";
import { BiCodeAlt } from "react-icons/bi";

interface file {
  id: string;
  fileName: string;
  body: string;
  language: string;
}

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

  return (
    <div className=" px-4 pt-3 pb-1 rounded-t-xl flex items-center justify-between bg-white gap-2 w-48">
      <div className="language-logo">{languageLogo}</div>
      <div className="w-full text-start">
        <h1 className="text-black text-sm">{fileInfo.fileName}</h1>
      </div>
      <div className="close-logo">
        <button onClick={removeHandler}>
          <RxCross2 className="text-sm hover:bg-gray-200 rounded-full duration-300 hover:text-gray-600 p-[1px] flex" />
        </button>
      </div>
    </div>
  );
};

export default FileCard;
