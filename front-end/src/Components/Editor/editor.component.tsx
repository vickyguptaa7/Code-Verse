import React, { useEffect, useRef, useState } from "react";
import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { HEIGHT_OF_FILENAVIGATION_AND_FOOTER } from "../bottomPannel/BottomPannel.Constant";
import { twMerge } from "tailwind-merge";

import monkaiTheme from "monaco-themes/themes/Night Owl.json";
import useDebounce from "../../hooks/useDebounce.hook";
import { updateFileBody } from "../../Store/reducres/Directory/Directory.reducer";
// import useDebounce from "../../hooks/useDebounce.hook";
// import { updateFileBody } from "../../Store/reducres/Directory/Directory.reducer";

const EDITOR_MIN_HEIGHT = 480;

interface IPROPS {
  content: string;
  language: string | undefined;
  currentWorkingFileId: string;
}

const Editor: React.FC<IPROPS> = ({
  content,
  language,
  currentWorkingFileId,
}) => {
  // used this bcoz of we know the whether there is change in the current nav file if its then we avoid to update the file information of the store
  let isUpdateStoreRef = useRef(true);

  const dispatch = useAppDispatch();
  const bottomPannelHeight = useAppSelector(
    (state) => state.bottomPannel.bottomPannelHeight
  );

  const isBottomPannelOpen = useAppSelector(
    (state) => state.bottomPannel.isBottomPannelOpen
  );

  const [editorContent, setEditorContent] = useState(content);

  const updateStore = () => {
    dispatch(updateFileBody({ id: currentWorkingFileId, body: editorContent }));
  };

  const debouncedFunc = useDebounce(updateStore, 500);

  const onChangeHandler = (value: string | undefined) => {
    // if it returns undefined then we don't do any changes
    if (value === undefined) return;
    setEditorContent((state) => (value ? value : state));
    // this is to avoid the store updation when we navigate as this onchange handler is called this is the only way i can think of to avoid this right now
    if (!isUpdateStoreRef.current.valueOf()) {
      isUpdateStoreRef.current = true;
      return;
    }
    debouncedFunc();
  };

  useEffect(() => {
    setEditorContent(content);
    isUpdateStoreRef.current = false;
    // as we don't want to update with the content as it changes frequently we update only when the current working file id's change so there will be less rerenders
    // eslint-disable-next-line
  }, [currentWorkingFileId]);

  let editorHeight =
    Math.max(document.body.clientHeight, EDITOR_MIN_HEIGHT) -
    HEIGHT_OF_FILENAVIGATION_AND_FOOTER;
  editorHeight -= isBottomPannelOpen ? bottomPannelHeight : 0;

  useSetEditorTheme();

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
        language={language}
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
        value={editorContent}
        onChange={onChangeHandler}
      ></MonacoEditor>
    </div>
  );
};

const useSetEditorTheme = () => {
  const monaco = useMonaco();
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
};

export default Editor;
