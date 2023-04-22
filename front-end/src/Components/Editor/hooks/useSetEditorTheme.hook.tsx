import { useEffect } from "react";

import { useMonaco } from "@monaco-editor/react";
import { themesObject } from "../../../Assets/Data/theme.data";
import { useAppSelector } from "../../../Store/store";

const useSetEditorTheme = (setIsEditorThemeReady: Function) => {
  const monaco = useMonaco();
  const editorTheme = useAppSelector((state) => state.editor.theme);
  useEffect(() => {
    if (monaco) {
      try {
        const defineTheme = async () => {
          if (editorTheme === "vs" || editorTheme === "vs-dark") {
            setIsEditorThemeReady(true);
            return;
          }
          console.log("editorTheme : ", editorTheme);

          const themeDetail = await import(
            `monaco-themes/themes/${themesObject[editorTheme]}.json`
          );

          monaco.editor.defineTheme(editorTheme, {
            base: themeDetail.base ? "vs-dark" : "vs",
            rules: themeDetail.rules,
            inherit: themeDetail.inherit,
            colors: themeDetail.colors,
          });

          setIsEditorThemeReady(true);
        };
        // defining the editor theme
        defineTheme();
      } catch (error) {
        console.log("error : ", error);
      }
    }
  }, [monaco, setIsEditorThemeReady, editorTheme]);
};

export default useSetEditorTheme;
