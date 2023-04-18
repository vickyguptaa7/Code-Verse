import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const editorInitialState = {
  tabSize: 4,
  fontSize: 16,
  wordWrap: "on" as "on" | "off" | "wordWrapColumn" | "bounded",
  isScrollBeyondLastLine: true,
  isMinimapEnabled: true,
  cursorPosition: { lineNumber: 1, column: 1 } as {
    lineNumber: number;
    column: number;
  },
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
    setCursorPosition(
      state,
      action: PayloadAction<{ lineNumber: number; column: number }>
    ) {
      state.cursorPosition = action.payload;
    },
  },
});

export const {
  setTabSize,
  setFontSize,
  setMinimapEnabled,
  setScrollBeyondLastLine,
  setWordWrap,
  setCursorPosition,
} = editorSlice.actions;

export default editorSlice.reducer;
