import { useMonaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import { setUndoRedoHistoryInfo } from "../../../Store/reducres/SideDrawer/Directory/Directory.reducer";

const useUndoRedo = (
  monacoRef: React.RefObject<editor.IStandaloneCodeEditor>,
  setEditorContent: Function,
  isEditorMounted: boolean
) => {
  const dispatch = useAppDispatch();
  const initialUndoRedoHistoryInfo = useAppSelector(
    (state) => state.Directory.undoRedoHistoryInfo
  );
  // here created a deep copy of the the redux store value bcoz its object which is pointed to the same memory location where redux stored varialbe which should not be mutated
  let undoRedoHistoryInfoRef = useRef(
    JSON.parse(JSON.stringify(initialUndoRedoHistoryInfo))
  );

  let isUndoRedoRef = useRef<boolean>(false);

  const currFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );

  const filesInformation = useAppSelector(
    (state) => state.Directory.filesInformation
  );

  if (!undoRedoHistoryInfoRef.current[currFile.id]) {
    undoRedoHistoryInfoRef.current[currFile.id] = {
      stack: [filesInformation[currFile.id].body],
      pointer: 1,
    };
  }
  const undoRedoHistory = undoRedoHistoryInfoRef.current;
  const monaco = useMonaco();
  useEffect(() => {
    if (!monacoRef.current || !monaco) return;
    console.log("UndoRedo Initialized!");
    monacoRef.current.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyZ,
      () => {
        if (
          undoRedoHistory[currFile.id].pointer <
          undoRedoHistory[currFile.id].stack.length
        ) {
          undoRedoHistory[currFile.id].pointer++;
          setEditorContent(
            undoRedoHistory[currFile.id].stack[
              undoRedoHistory[currFile.id].pointer - 1
            ]
          );
          isUndoRedoRef.current = true;
        }
        console.log("Redo");
      }
    );
    monacoRef.current.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyY,
      () => {
        if (
          undoRedoHistory[currFile.id].pointer <
          undoRedoHistory[currFile.id].stack.length
        ) {
          undoRedoHistory[currFile.id].pointer++;
          setEditorContent(
            undoRedoHistory[currFile.id].stack[
              undoRedoHistory[currFile.id].pointer - 1
            ]
          );
          isUndoRedoRef.current = true;
        }
        console.log("Redo");
      }
    );
    monacoRef.current.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyZ,
      () => {
        if (undoRedoHistory[currFile.id].pointer > 1) {
          undoRedoHistory[currFile.id].pointer--;
          setEditorContent(
            undoRedoHistory[currFile.id].stack[
              undoRedoHistory[currFile.id].pointer - 1
            ]
          );
          isUndoRedoRef.current = true;
        }
        console.log(undoRedoHistory[currFile.id]);
        console.log("Undo");
      }
    );
    return () => {
      dispatch(setUndoRedoHistoryInfo(undoRedoHistory));
    };
    // used to remove the warning of add undoRedoHistory
    //eslint-disable-next-line
  }, [
    monacoRef,
    monaco,
    currFile.id,
    isEditorMounted,
    setEditorContent,
    dispatch,
  ]);

  const updateUndoRedoStack = (value: string) => {
    if (
      undoRedoHistory[currFile.id].pointer !==
      undoRedoHistory[currFile.id].stack.length
    ) {
      undoRedoHistory[currFile.id].stack = undoRedoHistory[
        currFile.id
      ].stack.slice(0, undoRedoHistory[currFile.id].pointer);
    }
    undoRedoHistory[currFile.id].stack.push(value);
    undoRedoHistory[currFile.id].pointer++;
  };

  return {
    undoRedoHistoryInfoRef,
    isUndoRedoRef,
    updateUndoRedoStack,
  };
};

export default useUndoRedo;
