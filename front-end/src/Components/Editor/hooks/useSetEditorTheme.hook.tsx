import { useEffect } from "react";

const useSetEditorTheme = (
  monaco: typeof import("monaco-editor/esm/vs/editor/editor.api") | null,
  setIsEditorReady: Function
) => {
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

export default useSetEditorTheme;
