import React from "react";
import { useAppSelector } from "../../Store/store";
import Editor from "./editor.component";

const EditorContainer = () => {
  const currentWorkingFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );

  const filesInformation = useAppSelector(
    (state) => state.Directory.filesInformation
  );

  const language = filesInformation[currentWorkingFile.id]
    ? filesInformation[currentWorkingFile.id].language
    : undefined;

  const content = filesInformation[currentWorkingFile.id]
    ? filesInformation[currentWorkingFile.id].body
    : "";
    
  return (
    <>
      <Editor
        content={content}
        language={language}
        currentWorkingFileId={currentWorkingFile.id}
      />
    </>
  );
};

export default EditorContainer;
