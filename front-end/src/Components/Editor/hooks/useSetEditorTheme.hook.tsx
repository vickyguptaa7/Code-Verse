import { useEffect } from "react";

import { useMonaco } from "@monaco-editor/react";

const useSetEditorTheme = (
  setIsEditorThemeReady: Function
) => {
  const monaco=useMonaco();

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

          setIsEditorThemeReady(true);
        };

        defineTheme();
    
      } catch (error) {
        console.log("error : ", error);
      }
    }
  }, [monaco, setIsEditorThemeReady]);
};

export default useSetEditorTheme;
