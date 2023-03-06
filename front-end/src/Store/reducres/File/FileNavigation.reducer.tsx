import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IFile from "../../../Interface/file.interface";

let DUMMY_FILES: Array<IFile> = [
  { id: "i1", fileName: "hello", body: "Hello world1", language: "python" },
  { id: "i2", fileName: "text2", body: "Hello world2", language: "cpp" },
  { id: "i3", fileName: "text3", body: "Hello world3", language: "java" },
];

const emptyFile: IFile = {
  id: "null",
  fileName: "",
  body: "",
  language: "",
};

const filesNavigationInitialState = {
  fileNavList: DUMMY_FILES,
  currentNavFile: DUMMY_FILES[0],
};

const fileNavigationSlice = createSlice({
  name: "files",
  initialState: filesNavigationInitialState,
  reducers: {
    addFileToNavigation(state, action: PayloadAction<IFile>) {
      state.fileNavList.push(action.payload);
      state.currentNavFile = action.payload;
    },
    removeFileFromNavigation(state, action: PayloadAction<string>) {
      // if currrentNavFile removed from navigation
      if (state.currentNavFile.id === action.payload) {
        const removefileIndx = state.fileNavList.findIndex(
          (file) => file.id === action.payload
        );
        if (removefileIndx !== 0) {
          // there is already a file in the left side
          state.currentNavFile = state.fileNavList[removefileIndx - 1];
        } else if (removefileIndx !== state.fileNavList.length - 1) {
          // it's the leftmost file so take the right one
          state.currentNavFile = state.fileNavList[removefileIndx + 1];
        } else {
          // only one file left
          state.currentNavFile = emptyFile;
        }
      }
      state.fileNavList = state.fileNavList.filter(
        (file) => file.id !== action.payload
      );
    },
    removeAllFilesFromNavigation(state) {
      state.fileNavList = [];
      state.currentNavFile = emptyFile;
    },
    setCurrentNavFile(state, action: PayloadAction<IFile>) {
      state.currentNavFile = action.payload;
    },
  },
});

export const {
  addFileToNavigation,
  removeFileFromNavigation,
  removeAllFilesFromNavigation,
  setCurrentNavFile,
} = fileNavigationSlice.actions;

export default fileNavigationSlice.reducer;
