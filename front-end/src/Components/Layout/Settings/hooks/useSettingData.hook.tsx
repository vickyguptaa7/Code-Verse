import { Dispatch } from "react";
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
import { ISettingOption } from "../../../../Interface/settingOption.interface";
import { Theme } from "../../../../Interface/theme.type";
import { themesNameArray } from "../../../../Assets/Data/theme.data";

export const useSettingData = () => {
  const data: Array<ISettingOption> = [
    {
      name: "Editor",
      type: "Font Size",
      inputType: "list",
      info: "Controls the font size in pixels.",
      initialValue: useAppSelector((state) => state.editor.fontSize),
      listOptions: [
        6, 10, 12, 14, 16, 20, 24, 28, 30, 32, 36, 40, 48, 52, 56, 60, 64, 72,
        80, 88, 96, 100,
      ],
      updateInStore: (dispatch: Dispatch<Object>, fontSize: number) => {
        dispatch(setFontSize(fontSize));
      },
    },
    {
      name: "Editor",
      type: "Word Wrap",
      inputType: "list",
      info: "Controls if lines should wrap.",
      initialValue: useAppSelector((state) => state.editor.wordWrap),
      listOptions: ["on", "off", "wordWrapColumn", "bounded"],
      updateInStore: (
        dispatch: Dispatch<Object>,
        wordWrap: "on" | "off" | "wordWrapColumn" | "bounded"
      ) => {
        dispatch(setWordWrap(wordWrap));
      },
    },
    {
      name: "Editor",
      type: "Scroll Beyond Last Line",
      inputType: "checkbox",
      info: "Controls whether the editor will scroll beyond the last line.",
      initialValue: useAppSelector(
        (state) => state.editor.isScrollBeyondLastLine
      ),
      updateInStore: (
        dispatch: Dispatch<Object>,
        isScrollBeyondLastLine: boolean
      ) => {
        dispatch(setScrollBeyondLastLine(isScrollBeyondLastLine));
      },
    },
    {
      name: "Editor",
      type: "Minimap Enabled",
      inputType: "checkbox",
      info: "Controls whether the minimap is shown.",
      initialValue: useAppSelector((state) => state.editor.isMinimapEnabled),
      updateInStore: (
        dispatch: Dispatch<Object>,
        isMinimapEnabled: boolean
      ) => {
        dispatch(setMinimapEnabled(isMinimapEnabled));
      },
    },
    {
      name: "Editor",
      type: "Tab Size",
      inputType: "list",
      info: "Controls the number of spaces a tab is equal to. This setting is overridden based on the file contents when #editor.detectIndentation# is on.",
      listOptions: [1, 2, 3, 4, 5, 6, 7, 8],
      initialValue: useAppSelector((state) => state.editor.tabSize),
      updateInStore: (dispatch: Dispatch<Object>, tabSize: number) => {
        dispatch(setTabSize(tabSize));
      },
    },
    {
      name: "Workbench",
      type: "Color Theme",
      inputType: "list",
      info: "Specifies the color theme used in the workbench.",
      listOptions: themesNameArray,
      initialValue: useAppSelector((state) => state.editor.theme),
      updateInStore: (dispatch: Dispatch<Object>, colorTheme: Theme) => {
        // TODO: Update color theme
        dispatch(setTheme(colorTheme));
      },
    },
    {
      name: "Workbench",
      type: "Side Drawer Position",
      inputType: "list",
      info: "Specifies the position of the side drawer.",
      listOptions: ["left", "right"],
      initialValue: useAppSelector(
        (state) => state.sideDrawer.isSidePannelPositionOnLeft
      )
        ? "left"
        : "right",
      updateInStore: (
        dispatch: Dispatch<Object>,
        sideDrawerPosition: "left" | "right"
      ) => {
        dispatch(setSidePannelPosition(sideDrawerPosition));
      },
    },
    {
      name: "Workbench",
      type: "Warning Message On Delete",
      inputType: "checkbox",
      info: "Displays a warning message when deleting a file or folder.",
      initialValue: useAppSelector(
        (state) => state.sideDrawer.isDeleteWarningEnable
      ),
      updateInStore: (
        dispatch: Dispatch<Object>,
        isDeleteWarningEnable: boolean
      ) => {
        dispatch(setIsDeleteWarningEnable(isDeleteWarningEnable));
      },
    },
  ];
  return data;
};
