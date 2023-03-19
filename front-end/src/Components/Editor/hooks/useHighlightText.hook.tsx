import React from "react";
import { drawerContent } from "../../../Store/reducres/SideDrawer/SideDrawer.reducer";

const useHighlightText = () => {
  function highlightText(
    monaco: typeof import("monaco-editor/esm/vs/editor/editor.api") | null,
    previousDecorationsRef: React.RefObject<{
      [key: string]: Array<string>;
    }>,
    searchedText: string,
    showInSideDrawer: drawerContent,
    isDrawerOpen: boolean,
    currentWorkingFileId: string
  ) {
    console.log("update highlight");
    if (!monaco || monaco.editor.getModels().length === 0) return;

    console.log(
      previousDecorationsRef.current![currentWorkingFileId],
      "before"
    );
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
    // first removing all the previouse decorations
    monaco.editor.getModels()[0].deltaDecorations(previousDecor, []);
    if (
      searchedText.length === 0 ||
      matches.length === 0 ||
      !isDrawerOpen ||
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
  return {
    highlightText,
  };
};

export default useHighlightText;
