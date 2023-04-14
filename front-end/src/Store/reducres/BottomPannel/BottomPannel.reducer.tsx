import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const bottomPannelInitialState = {
  isBottomPannelOpen: false,
  bottomPannelHeight: 208, // 13 rem inital width of drawer
  isMinimizeBottomPannel: false,
  showInBottomPannel: "input",
  inputContent: "",
  outputContent: "",
  debugContent: "",
};

type bottomPannelContent = "input" | "output" | "terminal" | "debug";

const bottomPannelSlice = createSlice({
  name: "sideDrawer",
  initialState: bottomPannelInitialState,
  reducers: {
    setIsBottomPannelOpen(state, action: PayloadAction<boolean>) {
      state.isBottomPannelOpen = action.payload;
    },
    setBottomPannelHeight(state, action: PayloadAction<number>) {
      state.bottomPannelHeight = action.payload;
    },
    setIsMinimizeBottomPannel(state, action: PayloadAction<boolean>) {
      state.isMinimizeBottomPannel = action.payload;
    },
    setShowInBottomPannel(state, action: PayloadAction<bottomPannelContent>) {
      state.showInBottomPannel = action.payload;
    },
    toggleIsBottomPannelOpen(state) {
      state.isBottomPannelOpen = !state.isBottomPannelOpen;
    },
    resetBottomPannel(state) {
      state.bottomPannelHeight = bottomPannelInitialState.bottomPannelHeight;
      state.isBottomPannelOpen = false;
      state.isMinimizeBottomPannel =
        bottomPannelInitialState.isMinimizeBottomPannel;
      state.showInBottomPannel = bottomPannelInitialState.showInBottomPannel;
      state.inputContent = bottomPannelInitialState.inputContent;
      state.outputContent = bottomPannelInitialState.outputContent;
      state.debugContent = bottomPannelInitialState.debugContent;
    },
    setInputContent(state, action: PayloadAction<string>) {
      state.inputContent = action.payload;
    },
    setOutputContent(state, action: PayloadAction<string>) {
      state.outputContent = action.payload;
    },
  },
});

export const {
  setIsBottomPannelOpen,
  setBottomPannelHeight,
  setIsMinimizeBottomPannel,
  setShowInBottomPannel,
  toggleIsBottomPannelOpen,
  resetBottomPannel,
  setInputContent,
  setOutputContent,
} = bottomPannelSlice.actions;

export default bottomPannelSlice.reducer;
