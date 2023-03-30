import React, { useEffect, useRef, useState } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { twMerge } from "tailwind-merge";
import useDebounce from "../../hooks/useDebounce.hook";
import { updateFileBody } from "../../Store/reducres/SideDrawer/Directory/Directory.reducer";
import "./editor.component.css";
import useSetEditorTheme from "./hooks/useSetEditorTheme.hook";
import useHighlightText from "./hooks/useHighlightText.hook";
import { editor } from "monaco-editor";
import useUndoRedo from "./hooks/useUndoRedo.hook";

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
  const dispatch = useAppDispatch();
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [editorContent, setEditorContent] = useState(content);
  const [isEditorMounted, setIsEditorMounted] = useState(false);
  const searchedText = useAppSelector((state) => state.search.searchedText);
  const showInSideDrawer = useAppSelector(
    (state) => state.sideDrawer.showInSideDrawer
  );
  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);
  // used this bcoz of we know the whether there is change in the current nav file if its then we avoid to update the file information of the store
  let isUpdateStoreRef = useRef(true);
  let monacoRef = useRef<null | editor.IStandaloneCodeEditor>(null);
  // storing the prev decorations of all the files if they are used in search so that we can remove the prev change and apply the new one

  const { isUndoRedoRef, updateUndoRedoStack } = useUndoRedo(
    monacoRef,
    setEditorContent,
    isEditorMounted
  );
  useSetEditorTheme(setIsEditorReady);
  const { highlightText } = useHighlightText();

  // if we use editorContent its one state prev value to get the current updated value we need to pass it from the debounced function
  const updateStore = (content: string) => {
    dispatch(updateFileBody({ id: currentWorkingFileId, body: content }));
  };

  const debounceUpdateSearchedText = useDebounce(updateStore, 800);
  const debounceUpdateHightlightText = useDebounce(highlightText, 500);
  const debounceUpdateUndoRedoStack = useDebounce(updateUndoRedoStack, 300);
  const onChangeHandler = (value: string | undefined) => {
    // this is to avoid the store updation when we navigate as this onchange handler is called this is the only way i can think of to avoid this right now
    // as currentWorkingFileId changes use effect will update with initial value
    if (!isUpdateStoreRef.current.valueOf()) {
      isUpdateStoreRef.current = true;
      return;
    }
    
    // if it returns undefined then we don't do any changes
    console.log(value);
    if (value === undefined) return;
    setEditorContent(value);
    debounceUpdateSearchedText(value);
    if (!isUndoRedoRef.current) {
      debounceUpdateUndoRedoStack(value);
    } else isUndoRedoRef.current = false;
  };

  useEffect(() => {
    setEditorContent(content);
    isUpdateStoreRef.current = false;
    // as we don't want to update with the content as it changes frequently we update only when the current working file id's change so there will be less rerenders
    // eslint-disable-next-line
  }, [currentWorkingFileId, content]);

  useEffect(() => {
    debounceUpdateHightlightText(
      searchedText,
      showInSideDrawer,
      isDrawerOpen,
      currentWorkingFileId
    );
    // eslint-disable-next-line 
  }, [
    isEditorMounted,
    showInSideDrawer,
    searchedText,
    currentWorkingFileId,
    isDrawerOpen,
  ]);

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
          value={editorContent}
          onChange={onChangeHandler}
          onMount={(editor) => {
            monacoRef.current = editor;
            setIsEditorMounted(true);
          }}
        ></MonacoEditor>
      )}
    </div>
  );
};

export default Editor;
