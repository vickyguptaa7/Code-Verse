import React, { useEffect, useRef, useState } from "react";
import MonacoEditor, { useMonaco } from "@monaco-editor/react";
import { useAppDispatch, useAppSelector } from "../../Store/store";
import { twMerge } from "tailwind-merge";
import useDebounce from "../../hooks/useDebounce.hook";
import { updateFileBody } from "../../Store/reducres/Directory/Directory.reducer";
import "./editor.component.css";
import { drawerContent } from "../../Store/reducres/SideDrawer/SideDrawer.reducer";

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
  const monaco = useMonaco();
  // used this bcoz of we know the whether there is change in the current nav file if its then we avoid to update the file information of the store
  let isUpdateStoreRef = useRef(true);

  let previousDecorationsRef = useRef<{
    [key: string]: Array<string>;
  }>({});
  const dispatch = useAppDispatch();
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [editorContent, setEditorContent] = useState(content);
  const searchedText = useAppSelector((state) => state.sideDrawer.searchedText);
  const showInSideDrawer = useAppSelector(
    (state) => state.sideDrawer.showInSideDrawer
  );
  if (previousDecorationsRef.current[currentWorkingFileId] === undefined) {
    previousDecorationsRef.current[currentWorkingFileId] = Array<string>();
  }
  const updateStore = (content: string) => {
    // if we use editorContent its one state prev value to get the current updated value we need to pass it from the debounced function
    dispatch(updateFileBody({ id: currentWorkingFileId, body: content }));
  };

  const debouncedUpdateSearchedText = useDebounce(updateStore, 500);
  const debouncedUpdateHightlightText = useDebounce(highlight, 500);

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
    debouncedUpdateSearchedText(value);
  };

  useEffect(() => {
    setEditorContent(content);
    isUpdateStoreRef.current = false;
    // as we don't want to update with the content as it changes frequently we update only when the current working file id's change so there will be less rerenders
    // eslint-disable-next-line
  }, [currentWorkingFileId]);

  useSetEditorTheme(setIsEditorReady);

  useEffect(() => {
    debouncedUpdateHightlightText(
      monaco,
      previousDecorationsRef,
      searchedText,
      showInSideDrawer,
      currentWorkingFileId
    );
  }, [showInSideDrawer, monaco, searchedText, currentWorkingFileId]);

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
          onMount={() => {
            highlight(
              monaco,
              previousDecorationsRef,
              searchedText,
              showInSideDrawer,
              currentWorkingFileId
            );
          }}
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

function highlight(
  monaco: typeof import("monaco-editor/esm/vs/editor/editor.api") | null,
  previousDecorationsRef: React.RefObject<{
    [key: string]: Array<string>;
  }>,
  searchedText: string,
  showInSideDrawer: drawerContent,
  currentWorkingFileId: string
) {
  console.log("update highlight");
  if (!monaco || monaco.editor.getModels().length === 0) return;

  console.log(previousDecorationsRef.current![currentWorkingFileId], "before");
  console.log(monaco.editor.getModels());

  const matches = monaco.editor
    .getModels()[0]
    .findMatches(searchedText, true, false, false, null, false);

  // if matches are not found or the string is empty then we remove all the previous highlighting
  const previousDecor: Array<string> = previousDecorationsRef.current![
    currentWorkingFileId
  ]
    ? previousDecorationsRef.current![currentWorkingFileId]
    : [];

  monaco.editor.getModels()[0].deltaDecorations(previousDecor, []);
  if (
    searchedText.length === 0 ||
    matches.length === 0 ||
    showInSideDrawer !== "search"
  ) {
    previousDecorationsRef.current![currentWorkingFileId]?.splice(
      0,
      previousDecorationsRef.current![currentWorkingFileId].length
    );
    return;
  }

  // storing the new decorations so that when we apply another one we can remove this one
  const newDecorations = Array<string>();
  console.log(matches);

  // iterate over all the matches found and apply the decorations
  matches.forEach((match) => {
    // store the new decorations
    newDecorations.push(
      monaco.editor.getModels()[0].deltaDecorations(
        [],
        [
          {
            range: match.range,
            options: {
              isWholeLine: false,
              inlineClassName: "highlights",
              // its used to avoid the change of the background of the unwanted text read about the prop in detail in doc
              stickiness:
                monaco.editor.TrackedRangeStickiness
                  .NeverGrowsWhenTypingAtEdges,
            },
          },
        ]
      )[0]
    );
  });

  // removing the prev decorations from the ref
  previousDecorationsRef.current![currentWorkingFileId].splice(
    0,
    previousDecorationsRef.current![currentWorkingFileId].length
  );
  console.log(newDecorations);

  // now storing the new decoration in the ref
  for (const decor of newDecorations) {
    previousDecorationsRef.current![currentWorkingFileId].push(decor);
  }
}

export default Editor;
