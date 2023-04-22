import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../../../Interface/theme.type";
import { getFromLocalStorage } from "../../../utils/localStorage.utils";
import { themesNameArray } from "../../../Assets/Data/theme.data";

let prevTheme = getFromLocalStorage("vscode-color-theme");
if (!themesNameArray.find((theme) => theme === prevTheme))
  prevTheme = "vs-dark";

const editorInitialState = {
  tabSize: getFromLocalStorage("vscode-tab-size") || 4,
  fontSize: getFromLocalStorage("vscode-font-size") || 16,
  wordWrap:
    getFromLocalStorage("vscode-word-wrap") ||
    ("on" as "on" | "off" | "wordWrapColumn" | "bounded"),
  isScrollBeyondLastLine:
    getFromLocalStorage("vscode-is-scroll-beyond-last-line") || false,
  isMinimapEnabled: getFromLocalStorage("vscode-is-minimap-enabled") || true,
  theme: prevTheme as Theme,
};

const editorSlice = createSlice({
  name: "editor",
  initialState: editorInitialState,
  reducers: {
    setTabSize(state, action: PayloadAction<number>) {
      state.tabSize = action.payload;
    },
    setFontSize(state, action: PayloadAction<number>) {
      state.fontSize = action.payload;
    },
    setWordWrap(
      state,
      action: PayloadAction<"on" | "off" | "wordWrapColumn" | "bounded">
    ) {
      state.wordWrap = action.payload;
    },
    setScrollBeyondLastLine(state, action: PayloadAction<boolean>) {
      state.isScrollBeyondLastLine = action.payload;
    },
    setMinimapEnabled(state, action: PayloadAction<boolean>) {
      state.isMinimapEnabled = action.payload;
    },
    setTheme(state, action: PayloadAction<Theme>) {
      state.theme = action.payload as Theme;
    },
  },
});

export const {
  setTabSize,
  setFontSize,
  setMinimapEnabled,
  setScrollBeyondLastLine,
  setWordWrap,
  setTheme,
} = editorSlice.actions;

export default editorSlice.reducer;
