import { useMonaco } from "@monaco-editor/react";
import { editor } from "monaco-editor";
import React, { useEffect, useRef } from "react";
import { useAppSelector } from "../../../Store/store";

const useUndoRedo = (
  monacoRef: React.RefObject<editor.IStandaloneCodeEditor>,
  setEditorContent: Function,
  isEditorMounted: boolean
) => {
  let historyRef = useRef<{
    [key: string]: { stack: Array<string>; pointer: number };
  }>({});
  let isUndoRedoRef = useRef<boolean>(false);

  const currFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );

  const filesInformation = useAppSelector(
    (state) => state.Directory.filesInformation
  );

  if (!historyRef.current[currFile.id]) {
    historyRef.current[currFile.id] = {
      stack: [filesInformation[currFile.id].body],
      pointer: 1,
    };
  }
  const monaco = useMonaco();
  useEffect(() => {
    if (!monacoRef.current || !monaco) return;
    console.log("UndoRedo Initialized!");
    monacoRef.current.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyMod.Shift | monaco.KeyCode.KeyZ,
      () => {
        if (
          historyRef.current[currFile.id].pointer <
          historyRef.current[currFile.id].stack.length
        ) {
          historyRef.current[currFile.id].pointer++;
          setEditorContent(
            historyRef.current[currFile.id].stack[
              historyRef.current[currFile.id].pointer - 1
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
          historyRef.current[currFile.id].pointer <
          historyRef.current[currFile.id].stack.length
        ) {
          historyRef.current[currFile.id].pointer++;
          setEditorContent(
            historyRef.current[currFile.id].stack[
              historyRef.current[currFile.id].pointer - 1
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
        if (historyRef.current[currFile.id].pointer > 1) {
          historyRef.current[currFile.id].pointer--;
          setEditorContent(
            historyRef.current[currFile.id].stack[
              historyRef.current[currFile.id].pointer - 1
            ]
          );
          isUndoRedoRef.current = true;
        }
        console.log(historyRef.current[currFile.id]);
        console.log("Undo");
      }
    );
  }, [monacoRef, monaco, currFile.id, isEditorMounted, setEditorContent]);

  const updateUndoRedoStack = (value: string) => {
    if (
      historyRef.current[currFile.id].pointer !==
      historyRef.current[currFile.id].stack.length
    ) {
      historyRef.current[currFile.id].stack = historyRef.current[
        currFile.id
      ].stack.slice(0, historyRef.current[currFile.id].pointer);
    }
    historyRef.current[currFile.id].stack.push(value);
    historyRef.current[currFile.id].pointer++;
  };

  return {
    historyRef,
    isUndoRedoRef,
    updateUndoRedoStack,
  };
};

export default useUndoRedo;
