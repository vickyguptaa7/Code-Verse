import React, { useState } from "react";
import FileCard from "./FileCard";
import "./FileNavigation.css";
import { GoPlus } from "react-icons/go";

interface file {
  id: string;
  fileName: string;
  body: string;
  language: "cpp" | "python" | "java";
}

let DUMMY_FILES: Array<file> = [
  { id: "i1", fileName: "text1", body: "Hello world1", language: "python" },
  { id: "i2", fileName: "text2", body: "Hello world2", language: "cpp" },
  { id: "i3", fileName: "text3", body: "Hello world3", language: "java" },
];
const FileNavigation = () => {
  const [createdListOfFiles, setCreatedListOfFiles] = useState(DUMMY_FILES);

  // remove the file from the list of created files show in file navigation
  const removeFileHandler = (id: string) => {
    if (createdListOfFiles.find((file) => file.id === id)) {
      setCreatedListOfFiles((createdListOfFiles) =>
        createdListOfFiles.filter((file) => file.id !== id)
      );
    }
  };

  const addFileHandler=()=>{
    
  }

  const listOfFiles = createdListOfFiles.map((file) => (
    <FileCard
      key={file.id}
      fileInfo={file}
      removeFileHandler={removeFileHandler}
    />
  ));

  return (
    <div className="pt-2 w-full  bg-slate-700 flex items-end gap-2">
      <div className="file-container flex overflow-x-auto hidescrollbar1 hidescrollbar2">
        {listOfFiles}
      </div>
      <div className="flex item-start my-1 mr-2">
        <button className="" onClick={addFileHandler}>
          <GoPlus className="text-2xl duration-300 text-white hover:bg-gray-500 p-[3px]" />
        </button>
      </div>
    </div>
  );
};

export default FileNavigation;
