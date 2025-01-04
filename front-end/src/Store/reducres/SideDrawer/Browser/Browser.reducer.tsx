import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const browserInitialState = {
  isBrowserOpen: false,
  isBrowserMinimized: false,
  isFullScreen: false,
  htmlFildId: "",
  htmlFileParentPath: "",
  cssFilesIds: [],
  jsFilesIds: [],
};

const browserSlice = createSlice({
  name: "exntension",
  initialState: browserInitialState,
  reducers: {
    setIsBrowserOpen(state, action: PayloadAction<boolean>) {
      state.isBrowserOpen = action.payload;
      state.isBrowserMinimized = action.payload;
    },
    setIsBrowserMinimized(state, action: PayloadAction<boolean>) {
      state.isBrowserMinimized = action.payload;
      state.isBrowserOpen = action.payload;
    },
    setIsFullScreen(state, action: PayloadAction<boolean>) {
      state.isFullScreen = action.payload;
    },
    setHtmlFileId(state, action: PayloadAction<string>) {
      state.htmlFildId = action.payload;
    },
    setHtmlFileParentPath(state, action: PayloadAction<string>) {
      state.htmlFileParentPath = action.payload;
    },
  },
});

export const {
  setIsBrowserOpen,
  setIsBrowserMinimized,
  setIsFullScreen,
  setHtmlFileId,
  setHtmlFileParentPath,
} = browserSlice.actions;

export default browserSlice.reducer;
