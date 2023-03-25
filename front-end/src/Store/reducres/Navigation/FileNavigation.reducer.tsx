import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { INavFile } from "../../../Interface/file.interface";

let DUMMY_FILES: Array<INavFile> = [
  {
    id: "welcomelop",
    type: "file",
  },
  {
    id: "setting",
    type: "setting",
  },
  
];

const emptyFile: INavFile = {
  id: "null",
  type: "file",
};

const navigationFilesInitialState = {
  navFilesList: DUMMY_FILES,
  currentNavFile: DUMMY_FILES[1],
};

const navigationFilesSlice = createSlice({
  name: "files",
  initialState: navigationFilesInitialState,
  reducers: {
    addFileToNavigation(state, action: PayloadAction<INavFile>) {
      const isFilePresentAlready =
        state.navFilesList.findIndex(
          (navFile) => navFile.id === action.payload.id
        ) !== -1;
      // add only when file is not in the navigation list
      if (!isFilePresentAlready) {
        state.navFilesList.push(action.payload);
      }
      state.currentNavFile = action.payload;
    },
    removeFileFromNavigation(state, action: PayloadAction<{ id: string }>) {
      // if currrentNavFile removed from navigation
      if (state.currentNavFile.id === action.payload.id) {
        const removefileIndx = state.navFilesList.findIndex(
          (file) => file.id === action.payload.id
        );
        if (removefileIndx !== 0) {
          // there is already a file in the left side
          state.currentNavFile = state.navFilesList[removefileIndx - 1];
        } else if (removefileIndx !== state.navFilesList.length - 1) {
          // it's the leftmost file so take the right one
          state.currentNavFile = state.navFilesList[removefileIndx + 1];
        } else {
          // only one file left
          state.currentNavFile = emptyFile;
        }
      }
      state.navFilesList = state.navFilesList.filter(
        (navFile) => navFile.id !== action.payload.id
      );
    },
    removeAllFilesFromNavigation(state) {
      state.navFilesList = [];
      state.currentNavFile = emptyFile;
    },
    setCurrentNavFile(state, action: PayloadAction<INavFile>) {
      state.currentNavFile = action.payload;
    },
    updateNavFileList(state, action: PayloadAction<Array<INavFile>>) {
      state.navFilesList = action.payload;
    },
  },
});

export const {
  addFileToNavigation,
  removeFileFromNavigation,
  removeAllFilesFromNavigation,
  setCurrentNavFile,
  updateNavFileList,
} = navigationFilesSlice.actions;

export default navigationFilesSlice.reducer;
