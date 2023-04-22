import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Theme } from "../../../Interface/theme.type";

const editorInitialState = {
  tabSize: 4,
  fontSize: 16,
  wordWrap: "on" as "on" | "off" | "wordWrapColumn" | "bounded",
  isScrollBeyondLastLine: false,
  isMinimapEnabled: true,
  theme: "dracula" as Theme,
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
