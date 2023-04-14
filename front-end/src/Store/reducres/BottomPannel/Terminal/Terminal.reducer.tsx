import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const terminalInitialState = {
  terminalContent: "",
  terminalCommandHistory: "",
  terminalsCurrentDirectoryInfo: { id: "root", name: "root", path: "root" },
};

const terminalSlice = createSlice({
  name: "terminal",
  initialState: terminalInitialState,
  reducers: {
    setTerminalContent(state, action: PayloadAction<string>) {
      state.terminalContent = action.payload;
    },
    setTerminalsCurrentDirectoryInfo(
      state,
      action: PayloadAction<{ id: string; name: string; path: string }>
    ) {
      state.terminalsCurrentDirectoryInfo = action.payload;
    },
  },
});

export const { setTerminalContent, setTerminalsCurrentDirectoryInfo } =
  terminalSlice.actions;

export default terminalSlice.reducer;
