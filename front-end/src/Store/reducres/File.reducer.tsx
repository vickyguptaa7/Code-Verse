import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListFormat } from "typescript";

interface file {
  id: string;
  fileName: string;
  body: string;
  language: string;
}

const filesInitialState = {
  fileCount: 0,
  fileList: new Array<file>(),
};

const fileSlice = createSlice({
  name: "files",
  initialState: filesInitialState,
  reducers: {
    addFile(state, action: PayloadAction<file>) {
      state.fileCount++;
      state.fileList.push(action.payload);
    },
    removeFile(state, action: PayloadAction<string>) {
      state.fileCount--;
      state.fileList = state.fileList.filter(
        (file) => file.id !== action.payload
      );
    },
  },
});
