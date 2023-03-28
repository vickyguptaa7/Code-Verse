import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const bottomPannelInitialState = {
  isBottomPannelOpen: false,
  bottomPannelHeight: 208, // 13 rem inital width of drawer
  isMinimizeBottomPannel: false,
  showInBottomPannel: "input",
  terminalContent: "",
  inputContent: "",
  outputContent: "",
  debugContent: "",
  terminalsCurrentDirectoryInfo: { id: "root", name: "root" },
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
    resetBottomPannel(state) {
      state.bottomPannelHeight = bottomPannelInitialState.bottomPannelHeight;
      state.isBottomPannelOpen = false;
      state.isMinimizeBottomPannel =
        bottomPannelInitialState.isMinimizeBottomPannel;
      state.showInBottomPannel = bottomPannelInitialState.showInBottomPannel;
      state.terminalContent = bottomPannelInitialState.terminalContent;
      state.inputContent = bottomPannelInitialState.inputContent;
      state.outputContent = bottomPannelInitialState.outputContent;
      state.debugContent = bottomPannelInitialState.debugContent;
    },
    setTerminalContent(state, action: PayloadAction<string>) {
      state.terminalContent = action.payload;
    },
    setInputContent(state, action: PayloadAction<string>) {
      state.inputContent = action.payload;
    },
    setOutputContent(state, action: PayloadAction<string>) {
      state.outputContent = action.payload;
    },
    setTerminalsCurrentDirectoryInfo(state, action: PayloadAction<{id:string,name:string}>) {
      state.terminalsCurrentDirectoryInfo = action.payload;
    },
  },
});

export const {
  setIsBottomPannelOpen,
  setBottomPannelHeight,
  setIsMinimizeBottomPannel,
  setShowInBottomPannel,
  resetBottomPannel,
  setInputContent,
  setTerminalContent,
  setOutputContent,
  setTerminalsCurrentDirectoryInfo,
} = bottomPannelSlice.actions;

export default bottomPannelSlice.reducer;
