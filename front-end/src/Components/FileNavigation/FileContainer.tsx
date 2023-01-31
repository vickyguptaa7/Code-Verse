import React, { useState } from "react";
import FileCard from "./FileCard";

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

const FileContainer = () => {
  const [createdListOfFiles, setCreatedListOfFiles] = useState(DUMMY_FILES);
  const removeFileHandler = (id: string) => {
    if (createdListOfFiles.find((file) => file.id === id)) {
      setCreatedListOfFiles((createdListOfFiles) =>
        createdListOfFiles.filter((file) => file.id !== id)
      );
    }
  };
  const listOfFiles = createdListOfFiles.map((file) => (
    <FileCard
      key={file.id}
      fileInfo={file}
      removeFileHandler={removeFileHandler}
    />
  ));
  return (
    <div className="file-container flex overflow-x-auto hidescrollbar1 hidescrollbar2">
      {listOfFiles}
    </div>
  );
};

export default FileContainer;
