import React from "react";
import MonacoEditor from "@monaco-editor/react";
import { useAppSelector } from "../../Store/store";
import { HEIGHT_OF_FILENAVIGATION_AND_FOOTER } from "../bottomPannel/BottomPannel.Constant";
import { twMerge } from "tailwind-merge";

const Editor = () => {
  const bottomPannelHeight = useAppSelector(
    (state) => state.bottomPannel.bottomPannelHeight
  );
  const currentNavFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );

  const editorHeight =
    window.innerHeight -
    bottomPannelHeight -
    HEIGHT_OF_FILENAVIGATION_AND_FOOTER;
  console.log(currentNavFile);

  return (
    <div
      className={twMerge(
        "bg-[color:var(--codeeditor-color)]  code-here",
        // there is issue of not getting to exact zero due to which there is gap btw bottom pannel and file nav pannel while doing manually this will avoid this situation
        editorHeight < 2 && "hidden"
      )}
      style={{ height: editorHeight }}
    >
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
        value={""}
      ></MonacoEditor>
    </div>
  );
};

export default Editor;
