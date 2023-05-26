import { useMonaco } from "@monaco-editor/react";
import { useEffect } from "react";
import { themesObject } from "../../../Assets/Data/theme.data";
import { addNotification } from "../../../Store/reducres/Notification/Notification.reducer";
import { useAppDispatch, useAppSelector } from "../../../Store/store";
import { uniqueIdGenerator } from "../../../library/uuid/uuid.lib";
import { ERROR_NOTIFICATION_MESSAGE } from "../../Layout/Notification/notification.constant";

const useSetEditorTheme = (setIsEditorThemeReady: Function) => {
  const monaco = useMonaco();
  const dispatch = useAppDispatch();
  const editorTheme = useAppSelector((state) => state.editor.theme);
  useEffect(() => {
    if (monaco) {
      try {
        const defineTheme = async () => {
          if (editorTheme === "vs" || editorTheme === "vs-dark") {
            setIsEditorThemeReady(true);
            return;
          }

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
        dispatch(
          addNotification({
            id: uniqueIdGenerator(),
            description: ERROR_NOTIFICATION_MESSAGE,
            isWaitUntilComplete: false,
            type: "error",
          })
        );
        console.error("error : ", error);
      }
    }
  }, [monaco, setIsEditorThemeReady, editorTheme, dispatch]);
};

export default useSetEditorTheme;
