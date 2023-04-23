import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTheme } from "../../../Interface/Types";
import {
  getPrevFontSize,
  getPrevMinimapEnabled,
  getPrevScrollBeyondLastLine,
  getPrevTabSize,
  getPrevThemes,
  getPrevWordWrap,
} from "../../../utils/localStorage.utils";

const editorInitialState = {
  tabSize: getPrevTabSize(),
  fontSize: getPrevFontSize(),
  wordWrap: getPrevWordWrap(),
  isScrollBeyondLastLine: getPrevScrollBeyondLastLine(),
  isMinimapEnabled: getPrevMinimapEnabled(),
  theme: getPrevThemes(),
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
    setTheme(state, action: PayloadAction<TTheme>) {
      state.theme = action.payload as TTheme;
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
