import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const browserInitialState = {
  isBrowserOpen: false,
  isBrowserMinimized: false,
  isFullScreen: false,
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
  },
});

export const { setIsBrowserOpen, setIsBrowserMinimized, setIsFullScreen } =
  browserSlice.actions;

export default browserSlice.reducer;
