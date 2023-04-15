import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const editorInitialState = {
  tabSize: 4,
  fontSize: 16,
  wordWrap: "on" as "on" | "off" | "wordWrapColumn" | "bounded",
  isScrollBeyondLastLine: true,
  isMinimapEnabled: true,
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
  },
});

export const {
  setTabSize,
  setFontSize,
  setMinimapEnabled,
  setScrollBeyondLastLine,
  setWordWrap,
} = editorSlice.actions;

export default editorSlice.reducer;
