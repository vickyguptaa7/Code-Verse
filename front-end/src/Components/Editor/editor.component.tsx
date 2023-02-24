import React from "react";
import MonacoEditor from "@monaco-editor/react";
import { useAppSelector } from "../../Store/store";

const Editor = () => {
  const currentNavFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );
  console.log(currentNavFile);

  return (
    <MonacoEditor
      language="javascript"
      theme="vs-dark"
      options={{
        wordWrap: "on",
        lineNumbersMinChars: 3, // for the line numbers at the left
        fontSize: 16,
        scrollBeyondLastLine: false,
        automaticLayout: true,
      }}
      className="bg-[color:var(--codeeditor-color)]  code-here grow"
      value={""}
    ></MonacoEditor>
  );
};

export default Editor;
