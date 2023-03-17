import React, { useEffect, useRef, useState } from "react";
import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import { useAppDispatch } from "../../Store/store";
import { twMerge } from "tailwind-merge";
import useDebounce from "../../hooks/useDebounce.hook";
import { updateFileBody } from "../../Store/reducres/Directory/Directory.reducer";
import "./editor.component.css";

interface IPROPS {
  content: string;
  language: string | undefined;
  currentWorkingFileId: string;
  editorHeight: number;
}

const Editor: React.FC<IPROPS> = ({
  content,
  language,
  currentWorkingFileId,
  editorHeight,
}) => {
  // used this bcoz of we know the whether there is change in the current nav file if its then we avoid to update the file information of the store
  let isUpdateStoreRef = useRef(true);
  const dispatch = useAppDispatch();

  const [isEditorReady, setIsEditorReady] = useState(false);
  const [editorContent, setEditorContent] = useState(content);
  const monaco = useMonaco();
  const updateStore = (content: string) => {
    // if we use editorContent its one state prev value to get the current updated value we need to pass it from the debounced function
    dispatch(updateFileBody({ id: currentWorkingFileId, body: content }));
  };

  const debouncedFunc = useDebounce(updateStore, 500);

  const onChangeHandler = (value: string | undefined) => {
    // this is to avoid the store updation when we navigate as this onchange handler is called this is the only way i can think of to avoid this right now
    // as currentWorkingFileId changes use effect will update with initial value
    if (!isUpdateStoreRef.current.valueOf()) {
      isUpdateStoreRef.current = true;
      return;
    }
    // if it returns undefined then we don't do any changes
    if (value === undefined) return;
    console.log(value);
    setEditorContent(value);
    debouncedFunc(value);
  };

  useEffect(() => {
    setEditorContent(content);
    isUpdateStoreRef.current = false;
    // as we don't want to update with the content as it changes frequently we update only when the current working file id's change so there will be less rerenders
    // eslint-disable-next-line
  }, [currentWorkingFileId]);

  useSetEditorTheme(setIsEditorReady);

  return (
    <div
      className={twMerge(
        "bg-[color:var(--codeeditor-color)]  code-here",
        // there is issue of not getting to exact zero due to which there is gap btw bottom pannel and file nav pannel while doing manually this will avoid this situation
        editorHeight < 2 && "hidden"
      )}
      style={{ height: editorHeight }}
    >
      {isEditorReady && (
        <MonacoEditor
          language={language}
          theme="Blackboard"
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
          className=""
          value={editorContent}
          onChange={onChangeHandler}
          onMount={() => highlight(monaco, "w")}
        ></MonacoEditor>
      )}
    </div>
  );
};

const useSetEditorTheme = (setIsEditorReady: Function) => {
  const monaco = useMonaco();
  useEffect(() => {
    if (monaco) {
      try {
        const defineTheme = async () => {
          const theme = await import("monaco-themes/themes/Night Owl.json");
          monaco.editor.defineTheme("Blackboard", {
            base: theme.base ? "vs-dark" : "vs",
            rules: theme.rules,
            inherit: theme.inherit,
            colors: theme.colors,
          });
          setIsEditorReady(true);
        };
        defineTheme();
      } catch (error) {
        console.log("error : ", error);
      }
    }
  }, [monaco, setIsEditorReady]);
};

const highlight = (
  monaco: typeof import("monaco-editor/esm/vs/editor/editor.api") | null,
  searchedText: string
) => {
  if (!monaco || monaco.editor.getModels().length === 0) return;
  console.log(
    monaco.editor.getModels(),
    monaco.editor
      .getModels()[0]
      .findMatches(searchedText, false, false, false, null, false)
  );

  const matches = monaco.editor
    .getModels()[0]
    .findMatches(searchedText, false, false, false, null, false);
  matches.forEach((match) => {
    monaco.editor.getModels()[0].deltaDecorations(
      [],
      [
        {
          range: match.range,
          options: {
            isWholeLine: false,
            inlineClassName: "highlight",
          },
        },
      ]
    );
  });
};

export default Editor;
