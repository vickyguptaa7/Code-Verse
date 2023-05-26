import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TTheme, TWordWrap } from "../../../@types/general.d";
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
  views: 0,
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
    setWordWrap(state, action: PayloadAction<TWordWrap>) {
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
    setViews(state, action: PayloadAction<number>) {
      state.views = action.payload;
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
  setViews,
} = editorSlice.actions;

export default editorSlice.reducer;
