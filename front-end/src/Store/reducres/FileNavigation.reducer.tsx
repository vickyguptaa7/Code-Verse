import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface file {
  id: string;
  fileName: string;
  body: string;
  language: string;
}


let DUMMY_FILES: Array<file> = [
  { id: "i1", fileName: "text1", body: "Hello world1", language: "python" },
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
    addFile(state, action: PayloadAction<file>) {
      state.fileList.push(action.payload);
    },
    removeFile(state, action: PayloadAction<string>) {
      state.fileList = state.fileList.filter(
        (file) => file.id !== action.payload
      );
    },
  },
});

export const { addFile, removeFile } = fileNavigationSlice.actions;

export default fileNavigationSlice.reducer;
