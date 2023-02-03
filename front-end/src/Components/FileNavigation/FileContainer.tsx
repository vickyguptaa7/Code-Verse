import React from "react";
import {  removeFileFromNavigation } from "../../Store/reducres/FileNavigation.reducer";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import FileCard from "./FileCard";

const FileContainer = () => {
  const filesInNavigation = useAppSelector(
    (state) => state.fileNavigation.fileList
  );
  const dispatch = useAppDispatch();
  const removeFileHandler = (id: string) => {
    dispatch(removeFileFromNavigation(id));
  };

  const listOfFiles = filesInNavigation.map((file) => (
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
