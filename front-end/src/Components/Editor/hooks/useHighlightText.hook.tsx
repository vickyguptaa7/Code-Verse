import  { useRef } from "react";
import { useMonaco } from "@monaco-editor/react";
import { DrawerContent } from "../../../Store/reducres/SideDrawer/SideDrawer.reducer";
import { useAppSelector } from "../../../Store/store";

const useHighlightText = () => {
  const monaco=useMonaco();
  const currFile = useAppSelector(
    (state) => state.fileNavigation.currentNavFile
  );
  let previousDecorationsRef = useRef<{
    [key: string]: Array<string>;
  }>({});

  if (!previousDecorationsRef.current[currFile.id]) {
    previousDecorationsRef.current[currFile.id] = Array<string>();
  }
  function highlightText(
    searchedText: string,
    showInSideDrawer: DrawerContent,
    isDrawerOpen: boolean,
  ) {

    if (!monaco || monaco.editor.getModels().length === 0) return;

    console.log(
      previousDecorationsRef.current![currFile.id],
      "before"
    );
    
    const matches = monaco.editor
      .getModels()[0]
      .findMatches(searchedText, true, false, false, null, false);

    // if matches are not found or the string is empty then we remove all the previous highlighting
    const previousDecor: Array<string> = previousDecorationsRef.current![
      currFile.id
    ]
      ? previousDecorationsRef.current![currFile.id]
      : [];
    // first removing all the previouse decorations
    monaco.editor.getModels()[0].deltaDecorations(previousDecor, []);
    if (
      searchedText.length === 0 ||
      matches.length === 0 ||
      !isDrawerOpen ||
      showInSideDrawer !== "search"
    ) {
      previousDecorationsRef.current![currFile.id]?.splice(
        0,
        previousDecorationsRef.current![currFile.id].length
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
    previousDecorationsRef.current![currFile.id].splice(
      0,
      previousDecorationsRef.current![currFile.id].length
    );

    // now storing the new decoration in the ref
    for (const decor of newDecorations) {
      previousDecorationsRef.current![currFile.id].push(decor);
    }
  }
  return {
    highlightText,
  };
};

export default useHighlightText;
