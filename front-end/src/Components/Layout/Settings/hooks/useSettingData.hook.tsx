import { Dispatch } from "react";
import { TTheme } from "../../../../@types/general.d";
import { ISettingOption } from "../../../../@types/settingOption.d";
import { themesNameArray } from "../../../../Assets/Data/theme.data";
import {
  setFontSize,
  setMinimapEnabled,
  setScrollBeyondLastLine,
  setTabSize,
  setTheme,
  setWordWrap,
} from "../../../../Store/reducres/Editor/Editor.reducer";
import {
  setIsDeleteWarningEnable,
  setSidePannelPosition,
} from "../../../../Store/reducres/SideDrawer/SideDrawer.reducer";
import { useAppSelector } from "../../../../Store/store";
import { storeToLocalStorage } from "../../../../utils/localStorage.utils";

export const useSettingData = () => {
  const editorTheme = useAppSelector((state) => state.editor.theme);
  const editorFontSize = useAppSelector((state) => state.editor.fontSize);
  const editorTabSize = useAppSelector((state) => state.editor.tabSize);
  const editorWordWrap = useAppSelector((state) => state.editor.wordWrap);
  const editorIsMinimapEnabled = useAppSelector(
    (state) => state.editor.isMinimapEnabled
  );
  const editorIsScrollBeyondLastLine = useAppSelector(
    (state) => state.editor.isScrollBeyondLastLine
  );
  const sideDrawerPosition = useAppSelector(
    (state) => state.sideDrawer.isSidePannelPositionOnLeft
  )
    ? "left"
    : "right";
  const isDeleteWarningEnable = useAppSelector(
    (state) => state.sideDrawer.isDeleteWarningEnable
  );

  const settingData: Array<ISettingOption> = [
    {
      name: "Workbench",
      type: "Color Theme",
      inputType: "list",
      info: "Specifies the color theme used in the workbench.",
      listOptions: themesNameArray,
      initialValue: editorTheme,
      updateInStore: (dispatch: Dispatch<Object>, colorTheme: TTheme) => {
        dispatch(setTheme(colorTheme));
        storeToLocalStorage("codeverse-color-theme", colorTheme);
      },
    },
    {
      name: "Workbench",
      type: "Side Drawer Position",
      inputType: "list",
      info: "Specifies the position of the side drawer.",
      listOptions: ["left", "right"],
      initialValue: sideDrawerPosition,
      updateInStore: (
        dispatch: Dispatch<Object>,
        sideDrawerPosition: "left" | "right"
      ) => {
        dispatch(setSidePannelPosition(sideDrawerPosition));
        storeToLocalStorage(
          "codeverse-sidedrawer-position",
          sideDrawerPosition
        );
      },
    },
    {
      name: "Editor",
      type: "Font Size",
      inputType: "list",
      info: "Controls the font size in pixels.",
      initialValue: editorFontSize,
      listOptions: [6, 10, 12, 14, 16, 20, 24, 28, 30, 32, 36, 40],
      updateInStore: (dispatch: Dispatch<Object>, fontSize: number) => {
        dispatch(setFontSize(fontSize));
        storeToLocalStorage("codeverse-font-size", fontSize);
      },
    },
    {
      name: "Editor",
      type: "Word Wrap",
      inputType: "list",
      info: "Controls if lines should wrap.",
      initialValue: editorWordWrap,
      listOptions: ["on", "off", "wordWrapColumn", "bounded"],
      updateInStore: (
        dispatch: Dispatch<Object>,
        wordWrap: "on" | "off" | "wordWrapColumn" | "bounded"
      ) => {
        dispatch(setWordWrap(wordWrap));
        storeToLocalStorage("codeverse-word-wrap", wordWrap);
      },
    },
    {
      name: "Editor",
      type: "Scroll Beyond Last Line",
      inputType: "checkbox",
      info: "Controls whether the editor will scroll beyond the last line.",
      initialValue: editorIsScrollBeyondLastLine,
      updateInStore: (
        dispatch: Dispatch<Object>,
        isScrollBeyondLastLine: boolean
      ) => {
        dispatch(setScrollBeyondLastLine(isScrollBeyondLastLine));
        storeToLocalStorage(
          "codeverse-is-scroll-beyond-last-line",
          isScrollBeyondLastLine
        );
      },
    },
    {
      name: "Editor",
      type: "Minimap Enabled",
      inputType: "checkbox",
      info: "Controls whether the minimap is shown.",
      initialValue: editorIsMinimapEnabled,
      updateInStore: (
        dispatch: Dispatch<Object>,
        isMinimapEnabled: boolean
      ) => {
        dispatch(setMinimapEnabled(isMinimapEnabled));
        storeToLocalStorage("codeverse-is-minimap-enabled", isMinimapEnabled);
      },
    },
    {
      name: "Editor",
      type: "Tab Size",
      inputType: "list",
      info: "Controls the number of spaces a tab is equal to. This setting is overridden based on the file contents when #editor.detectIndentation# is on.",
      listOptions: [2, 3, 4, 5, 6],
      initialValue: editorTabSize,
      updateInStore: (dispatch: Dispatch<Object>, tabSize: number) => {
        dispatch(setTabSize(tabSize));
        storeToLocalStorage("codeverse-tab-size", tabSize);
      },
    },
    {
      name: "Workbench",
      type: "Warning Message On Delete",
      inputType: "checkbox",
      info: "Displays a warning message when deleting a file or folder.",
      initialValue: isDeleteWarningEnable,
      updateInStore: (
        dispatch: Dispatch<Object>,
        isDeleteWarningEnable: boolean
      ) => {
        dispatch(setIsDeleteWarningEnable(isDeleteWarningEnable));
        storeToLocalStorage(
          "codeverse-is-delete-warning-enable",
          isDeleteWarningEnable
        );
      },
    },
  ];
  return settingData;
};
