import { useMonaco } from "@monaco-editor/react";
import { useRef } from "react";
import { DrawerContent } from "../../../Store/reducres/SideDrawer/SideDrawer.reducer";
import { useAppSelector } from "../../../Store/store";

const CSS_CLASSNAME_HIGHLIGHT_SUFFFIX = "-highlight";

const useHighlightText = () => {
  const monaco = useMonaco();
  const currFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );
  const editorTheme = useAppSelector((state) => state.editor.theme);
  // storing the prev decorations of all the files if they are used in search so that we can remove the prev change and apply the new one
  let previousDecorations = useRef<{
    [key: string]: Array<string>;
  }>({});

  // if the file is not present in the previousDecoration then we add it to the previousDecoration
  if (!previousDecorations.current[currFile.id]) {
    previousDecorations.current[currFile.id] = Array<string>();
  }

  /**
   * This function highlights searched text in a Monaco editor and removes previous decorations.
   * @param {string} searchedText - A string representing the text that is being searched for in the
   * editor.
   * @param {DrawerContent} showInSideDrawer - `showInSideDrawer` is a parameter of type
   * `DrawerContent` which is used to determine what content should be displayed in the side drawer. It
   * is used in the `highlightText` function to check if the side drawer is in search mode or not. If
   * it is not in search mode
   * @param {boolean} isDrawerOpen - `isDrawerOpen` is a boolean value that indicates whether the side
   * drawer is currently open or not.
   * @returns The function does not have a return statement, so it returns `undefined` by default.
   */
  const highlightText = (
    searchedText: string,
    showInSideDrawer: DrawerContent,
    isDrawerOpen: boolean
  ) => {
    if (!monaco || monaco.editor.getModels().length === 0) return;

    // getting all the matches of the searched text in the current file opened in the editor
    const matches = monaco.editor
      .getModels()[0]
      .findMatches(searchedText, true, false, false, null, false);

    // getting the previouse decorations of the current file
    const previousDecor = previousDecorations.current[currFile.id];

    // first removing all the previouse decorations
    monaco.editor.getModels()[0].deltaDecorations(previousDecor, []);

    // if the searched text is empty or there are no matches
    // or the side drawer is not open
    //or the side drawer is not in search mode then we return do nothing
    if (
      searchedText.length === 0 ||
      matches.length === 0 ||
      !isDrawerOpen ||
      showInSideDrawer !== "search"
    ) {
      previousDecorations.current![currFile.id]?.splice(
        0,
        previousDecorations.current![currFile.id].length
      );
      return;
    }

    // storing the new decorations so that when we apply another one we can remove this one
    const newDecorations = Array<string>();

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
                inlineClassName: editorTheme + CSS_CLASSNAME_HIGHLIGHT_SUFFFIX,
                minimap: {
                  position: 1,
                  color: "red",
                },
                overviewRuler: {
                  position: 1,
                  color: "red",
                },
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
    previousDecorations.current![currFile.id].splice(
      0,
      previousDecorations.current![currFile.id].length
    );

    // now storing the new decoration in the previousDecorations
    for (const decor of newDecorations) {
      previousDecorations.current![currFile.id].push(decor);
    }
  };
  return {
    highlightText,
  };
};

export default useHighlightText;
