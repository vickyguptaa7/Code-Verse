import React, { useEffect, useRef, useState } from "react";

import MonacoEditor from "@monaco-editor/react";
import { editor } from "monaco-editor";

import { mergeClass } from "../../library/tailwindMerge/tailwindMerge.lib";

import { useAppDispatch, useAppSelector } from "../../Store/store";
import { updateFileBody } from "../../Store/reducres/SideDrawer/Directory/Directory.reducer";

import useDebounce from "../../hooks/useDebounce.hook";
import useSetEditorTheme from "./hooks/useSetEditorTheme.hook";
import useHighlightText from "./hooks/useHighlightText.hook";
import useUndoRedo from "./hooks/useUndoRedo.hook";

import { editorLanguage } from "../../Assets/Data/editorLanguages.data";
import "./editor.component.css";
import Loader from "../UI/Loader/Loader.component";

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
  const [isEditorThemeReady, setIsEditorThemeReady] = useState(false);
  const [isEditorMounted, setIsEditorMounted] = useState(false);

  const [editorContent, setEditorContent] = useState(content);

  const dispatch = useAppDispatch();

  const fontSize = useAppSelector((state) => state.editor.fontSize);
  const tabSize = useAppSelector((state) => state.editor.tabSize);
  const wordWrap = useAppSelector((state) => state.editor.wordWrap);
  const isScrollBeyondLastLine = useAppSelector(
    (state) => state.editor.isScrollBeyondLastLine
  );
  const isMinimapEnabled = useAppSelector(
    (state) => state.editor.isMinimapEnabled
  );

  const searchedText = useAppSelector((state) => state.search.searchedText);

  const showInSideDrawer = useAppSelector(
    (state) => state.sideDrawer.showInSideDrawer
  );
  const isDrawerOpen = useAppSelector((state) => state.sideDrawer.isDrawerOpen);

  // used to track the cursor position tracking while removing and adding the character as we have used the debounce so it will store all the changes until function runs
  // for remove we +1 and for add we -1
  const characterAddRemoveCountDebounce = useRef<{ count: 0 }>({
    count: 0,
  });
  // used this bcoz of we know the whether there is change in the current nav file if its then we avoid to update the file information of the store
  let isCurrentWorkingFileChanged = useRef(true);
  let monacoRef = useRef<null | editor.IStandaloneCodeEditor>(null);

  const { isUndoRedoOperation, updateUndoRedoStack } = useUndoRedo(
    monacoRef,
    setEditorContent,
    isEditorMounted,
    editorContent,
    characterAddRemoveCountDebounce
  );

  const { highlightText } = useHighlightText();

  useSetEditorTheme(setIsEditorThemeReady);

  // this is to update the file body in the redux store when the editor content changes
  const updateFileBodyStore = (content: string) => {
    dispatch(updateFileBody([{ id: currentWorkingFileId, body: content }]));
  };

  const debounceUpdateFileBodyStore = useDebounce(updateFileBodyStore, 600);

  const debounceUpdateHightlightText = useDebounce(highlightText, 400);

  const debounceUpdateUndoRedoStack = useDebounce(updateUndoRedoStack, 200);

  const onChangeHandler = (value: string | undefined) => {
    // this is to avoid the store updation when we navigate as this onchange handler is called this is the only way i can think of to avoid this right now
    // as currentWorkingFileId changes use effect will update with initial value
    // if value parameter undefined then we don't do any changes
    if (isCurrentWorkingFileChanged.current || value === undefined) {
      isCurrentWorkingFileChanged.current = false;
      return;
    }

    // update the editorContent and the file body in the store
    setEditorContent(value);
    debounceUpdateFileBodyStore(value);

    // if its not undo redo operation then we update the undo redo stack
    // else we don't update the undo redo stack as we are doing undo redo operation and we don't want to update the stack with the same value again
    // so we set the isUndoRedoOperation to false so that the next time we can update the stack
    if (!isUndoRedoOperation.current) {
      if (!characterAddRemoveCountDebounce.current.count)
        characterAddRemoveCountDebounce.current.count = 0;
      characterAddRemoveCountDebounce.current.count +=
        editorContent.length - value.length;
      debounceUpdateUndoRedoStack(value);
    } else isUndoRedoOperation.current = false;
  };

  useEffect(() => {
    // as the current working file changes we set the isCurrentWorkingFileChanged to false so that we can avoid the store updation
    isCurrentWorkingFileChanged.current = true;
    setEditorContent(content);
    // eslint-disable-next-line
  }, [currentWorkingFileId]);

  useEffect(() => {
    // when content is changed from the replace we update the editor content also
    setEditorContent(content);
  }, [content]);

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
      className={mergeClass([
        "bg-[color:var(--codeeditor-color)]  code-here",
        // there is issue of not getting to exact zero due to which there is gap btw bottom pannel and file nav pannel while doing manually this will avoid this situation
        editorHeight < 2 && "hidden",
      ])}
      style={{ height: editorHeight }}
    >
      {isEditorThemeReady ? (
        <MonacoEditor
          language={
            !language
              ? "plaintext"
              : editorLanguage[language]
              ? editorLanguage[language]
              : "plaintext"
          }
          theme="Blackboard"
          loading={<Loader type="loading" />}
          options={{
            wordWrap: wordWrap,
            lineNumbersMinChars: 3, // for the line numbers at the left
            fontSize: fontSize,
            tabSize: tabSize,
            minimap: {
              enabled: isMinimapEnabled,
            },
            scrollBeyondLastLine: isScrollBeyondLastLine,
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
            isCurrentWorkingFileChanged.current = false;
            setIsEditorMounted(true);
          }}
        ></MonacoEditor>
      ) : (
        <Loader type="loading" />
      )}
    </div>
  );
};

export default Editor;
