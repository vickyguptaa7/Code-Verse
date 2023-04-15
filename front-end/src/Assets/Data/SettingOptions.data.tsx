import { Dispatch } from "react";
import {
  setFontSize,
  setMinimapEnabled,
  setScrollBeyondLastLine,
  setTabSize,
  setWordWrap,
} from "../../Store/reducres/Editor/Editor.reducer";
import {
  setIsDeleteWarningEnable,
  setSidePannelPosition,
} from "../../Store/reducres/SideDrawer/SideDrawer.reducer";
import { ISettingOption } from "../../Interface/settingOption.interface";

export const settingOptions: Array<ISettingOption> = [
  {
    name: "Editor",
    type: "Font Size",
    inputType: "number",
    info: "Controls the font size in pixels.",
    initialValue: 16,
    updateInStore: (dispatch: Dispatch<Object>, fontSize: number) => {
      dispatch(setFontSize(fontSize));
    },
  },
  {
    name: "Editor",
    type: "Word Wrap",
    inputType: "list",
    info: "Controls if lines should wrap.",
    initialValue: "on",
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
    initialValue: true,
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
    initialValue: true,
    updateInStore: (dispatch: Dispatch<Object>, isMinimapEnabled: boolean) => {
      dispatch(setMinimapEnabled(isMinimapEnabled));
    },
  },
  {
    name: "Editor",
    type: "Tab Size",
    inputType: "number",
    info: "Controls the number of spaces a tab is equal to. This setting is overridden based on the file contents when `#editor.detectIndentation#` is on.",
    initialValue: 4,
    updateInStore: (dispatch: Dispatch<Object>, tabSize: number) => {
      dispatch(setTabSize(tabSize));
    },
  },
  {
    name: "Workbench",
    type: "Color Theme",
    inputType: "list",
    info: "Specifies the color theme used in the workbench.",
    listOptions: ["dark", "light"],
    initialValue: "dark",
    updateInStore: (
      dispatch: Dispatch<Object>,
      colorTheme: "dark" | "light"
    ) => {
      // TODO: Update color theme
      console.log("Color theme updated : ", colorTheme);
    },
  },
  {
    name: "Workbench",
    type: "Side Drawer Position",
    inputType: "list",
    info: "Specifies the position of the side drawer.",
    listOptions: ["left", "right"],
    initialValue: "left",
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
    initialValue: true,
    updateInStore: (
      dispatch: Dispatch<Object>,
      isDeleteWarningEnable: boolean
    ) => {
      dispatch(setIsDeleteWarningEnable(isDeleteWarningEnable));
    },
  },
];
