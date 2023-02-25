import React, { useEffect } from "react";
import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import { useAppSelector } from "../../Store/store";
import { HEIGHT_OF_FILENAVIGATION_AND_FOOTER } from "../bottomPannel/BottomPannel.Constant";
import { twMerge } from "tailwind-merge";

import monkaiTheme from "monaco-themes/themes/Night Owl.json";

const EDITOR_MIN_HEIGHT = 480;

const Editor = () => {
  const monaco = useMonaco();
  
  const bottomPannelHeight = useAppSelector(
    (state) => state.bottomPannel.bottomPannelHeight
  );
  const isBottomPannelOpen = useAppSelector(
    (state) => state.bottomPannel.isBottomPannelOpen
  );

  let editorHeight =
    Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) -
    HEIGHT_OF_FILENAVIGATION_AND_FOOTER;
  editorHeight -= isBottomPannelOpen ? bottomPannelHeight : 0;

  useEffect(() => {
    if (monaco) {
      const chngecolor = async () => {
        monaco.editor.defineTheme("monokai-bright", {
          base: monkaiTheme.base === "vs-dark" ? "vs-dark" : "vs",
          rules: monkaiTheme.rules,
          inherit: monkaiTheme.inherit,
          colors: monkaiTheme.colors,
        });
        monaco.editor.setTheme("monokai-bright");
      };
      chngecolor();
    }
  }, [monaco]);

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
        language="cpp"
        options={{
          wordWrap: "on",
          lineNumbersMinChars: 3, // for the line numbers at the left
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          scrollbar: {
            // this option is to scroll the page when editor reaches at the bottom so we can scroll to the end from the editor also
            alwaysConsumeMouseWheel: false,
          },
        }}
        value={""}
      ></MonacoEditor>
    </div>
  );
};

export default Editor;
