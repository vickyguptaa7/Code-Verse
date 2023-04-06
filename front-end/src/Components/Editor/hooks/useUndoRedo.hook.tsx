import React, { useEffect, useRef } from "react";

import { useMonaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";

import { useAppDispatch, useAppSelector } from "../../../Store/store";

import {
  getFromLocalStorage,
  storeToLocalStorage,
} from "../../../utils/localStorage.utils";

const useUndoRedo = (
  monacoRef: React.RefObject<editor.IStandaloneCodeEditor>,
  setEditorContent: Function,
  isEditorMounted: boolean,
  content: string
) => {
  const dispatch = useAppDispatch();

  // using the local storage for storing the history of undo redo of the files
  let undoRedoHistoryInfo = useRef<{
    [key: string]: {
      stack: Array<{
        cursorPosition: { lineNumber: number; column: number };
        content: string;
      }>;
      pointer: number;
    };
  }>(getFromLocalStorage("historyInfo") || {});


  let isUndoRedoOperation = useRef<boolean>(false);

  const currFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );

  const filesInformation = useAppSelector(
    (state) => state.Directory.filesInformation
  );

  const undoRedoHistory = undoRedoHistoryInfo.current;
  const monaco = useMonaco();

  // if the file is not present in the history then we add it to the history
  if (!undoRedoHistoryInfo.current[currFile.id]) {
    undoRedoHistoryInfo.current[currFile.id] = {
      stack: [
        {
          cursorPosition: { lineNumber: 0, column: 0 },
          content: filesInformation[currFile.id].body,
        },
      ],
      pointer: 1,
    };
  }

  useEffect(() => {
    if (!monacoRef.current || !monaco) return;

    // redo for the mac shift+cmd+z
    monacoRef.current.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyZ,
      () => {
        console.log("Redo");
        const currentFileUndoRedo = undoRedoHistoryInfo.current[currFile.id];

        // if the pointer is at the end of the stack then we don't do anything
        // otherwise we increment the pointer and set the content of the editor to the content of the stack at the pointer
        if (currentFileUndoRedo.pointer < currentFileUndoRedo.stack.length) {
          currentFileUndoRedo.pointer++;
          isUndoRedoOperation.current = true;

          // as pointer is 1 based indexing so we need to decrement it by 1 to get the correct index of the stack
          setEditorContent(
            currentFileUndoRedo.stack[currentFileUndoRedo.pointer - 1].content
          );

          // we set the timeout to 0 so that the content is set to the editor before we set the cursor position
          setTimeout(() => {
            // we set the cursor position to the cursor position of the stack at the pointer
            monacoRef.current?.setPosition(
              currentFileUndoRedo.stack[currentFileUndoRedo.pointer]
                .cursorPosition
            );

            //we set the scroll position to the line number of the cursor position
            monacoRef.current?.revealLine(
              currentFileUndoRedo.stack[currentFileUndoRedo.pointer]
                .cursorPosition.lineNumber
            );
          }, 0);
        }
      }
    );

    // redo for the windows ctrl+y
    monacoRef.current.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyY,
      () => {
        console.log("Redo");
        const currentFileUndoRedo = undoRedoHistoryInfo.current[currFile.id];

        // if the pointer is at the end of the stack then we don't do anything
        // otherwise we increment the pointer and set the content of the editor to the content of the stack at the pointer
        if (currentFileUndoRedo.pointer < currentFileUndoRedo.stack.length) {
          currentFileUndoRedo.pointer++;
          isUndoRedoOperation.current = true;

          // as pointer is 1 based indexing so we need to decrement it by 1 to get the correct index of the stack
          setEditorContent(
            currentFileUndoRedo.stack[currentFileUndoRedo.pointer - 1].content
          );

          // we set the timeout to 0 so that the content is set to the editor before we set the cursor position
          setTimeout(() => {
            // we set the cursor position to the cursor position of the stack at the pointer
            monacoRef.current?.setPosition(
              currentFileUndoRedo.stack[currentFileUndoRedo.pointer]
                .cursorPosition
            );

            //we set the scroll position to the line number of the cursor position
            monacoRef.current?.revealLine(
              currentFileUndoRedo.stack[currentFileUndoRedo.pointer]
                .cursorPosition.lineNumber
            );
          }, 0);
        }
      }
    );

    // undo for the mac cmd+z and windows ctrl+z
    monacoRef.current.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyZ,
      () => {
        console.log("Undo");
        const currentFileUndoRedo = undoRedoHistoryInfo.current[currFile.id];

        // if the pointer is at the beginning of the stack then we don't do anything
        // otherwise we decrement the pointer and set the content of the editor to the content of the stack at the pointer
        if (currentFileUndoRedo.pointer > 1) {
          currentFileUndoRedo.pointer--;
          isUndoRedoOperation.current = true;

          // as pointer is 1 based indexing so we need to decrement it by 1 to get the correct index of the stack
          setEditorContent(
            currentFileUndoRedo.stack[currentFileUndoRedo.pointer - 1].content
          );

          // we set the timeout to 0 so that the content is set to the editor before we set the cursor position
          setTimeout(() => {
            // we set the cursor position to the cursor position of the stack at the pointer
            monacoRef.current?.setPosition(
              currentFileUndoRedo.stack[currentFileUndoRedo.pointer]
                .cursorPosition
            );

            //we set the scroll position to the line number of the cursor position
            monacoRef.current?.revealLine(
              currentFileUndoRedo.stack[currentFileUndoRedo.pointer]
                .cursorPosition.lineNumber
            );
          }, 0);
        }
      }
    );
    return () => {
      storeToLocalStorage("historyInfo", undoRedoHistory);
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
    let cursorPosition = monacoRef.current?.getPosition();
    const currentFileUndoRedo = undoRedoHistoryInfo.current[currFile.id];

    // if the pointer is not at the end of the stack then we remove the elements after the pointer
    if (currentFileUndoRedo.pointer !== currentFileUndoRedo.stack.length) {
      currentFileUndoRedo.stack = currentFileUndoRedo.stack.slice(
        0,
        currentFileUndoRedo.pointer
      );
    }
    // add the new content to the end of the stack
    currentFileUndoRedo.stack.push({
      cursorPosition: {
        lineNumber: cursorPosition ? cursorPosition.lineNumber : 0,
        column: cursorPosition
          ? cursorPosition.column + Math.abs(content.length - value.length)
          : 0,
      },
      content: value,
    });

    // increment the pointer
    currentFileUndoRedo.pointer++;
  };

  return {
    undoRedoHistoryInfo,
    isUndoRedoOperation,
    updateUndoRedoStack,
  };
};

export default useUndoRedo;
