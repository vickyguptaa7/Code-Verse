import React from "react";
import { INavFile } from "../../@types/file.d";
import { useAppSelector } from "../../Store/store";
import Editor from "./editor.component";

interface IPROPS {
  editorHeight: number;
  currentWorkingFile: INavFile;
}

const EditorContainer: React.FC<IPROPS> = ({
  editorHeight,
  currentWorkingFile,
}) => {
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
        editorHeight={editorHeight}
        content={content}
        language={language}
        currentWorkingFileId={currentWorkingFile.id}
      />
    </>
  );
};

export default EditorContainer;
