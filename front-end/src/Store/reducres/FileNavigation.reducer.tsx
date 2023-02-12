import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import file from "../../Interface/file.interface";

let DUMMY_FILES: Array<file> = [
  { id: "i1", fileName: "hello", body: "Hello world1", language: "python" },
  { id: "i2", fileName: "text2", body: "Hello world2", language: "cpp" },
  { id: "i3", fileName: "text3", body: "Hello world3", language: "java" },
];

const filesNavigationInitialState = {
  fileList: DUMMY_FILES,
};

const fileNavigationSlice = createSlice({
  name: "files",
  initialState: filesNavigationInitialState,
  reducers: {
    addFileToNavigation(state, action: PayloadAction<file>) {
      state.fileList.push(action.payload);
    },
    removeFileFromNavigation(state, action: PayloadAction<string>) {
      state.fileList = state.fileList.filter(
        (file) => file.id !== action.payload
      );
    },
    removeAllFilesFromNavigation(state) {
      state.fileList = [];
    },
  },
});

export const { addFileToNavigation, removeFileFromNavigation,removeAllFilesFromNavigation } =
  fileNavigationSlice.actions;

export default fileNavigationSlice.reducer;
