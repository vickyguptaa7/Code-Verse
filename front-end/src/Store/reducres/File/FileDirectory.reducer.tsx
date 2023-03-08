import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IDirectory from "../../../Interface/directory.interface";
import {
  deleteFileOrFolder,
  renameFileOrFolder,
  traverseToDirectory,
} from "./DirectoryOperations";
// TODO:Central file state

interface iconObject {
  [key: string]: string;
}

let DUMMY_FILE_DIRECTORY = new Array<IDirectory>();

const fileDirectoryInitialState = {
  directories: DUMMY_FILE_DIRECTORY,
  fileIcons: {} as iconObject,
  folderIcons: {} as iconObject,
  currentWorkingFileOrFolder: {
    isActive: false,
    operation: "",
    id: "",
  },
};

const fileDirectorySlice = createSlice({
  name: "file-directory",
  initialState: fileDirectoryInitialState,
  reducers: {
    addFileOrFolderToDirectory(
      state,
      action: PayloadAction<{
        parentId: string;
        name: string;
        isFolder: boolean;
      }>
    ) {
      traverseToDirectory(
        state.directories,
        action.payload.isFolder ? state.folderIcons : state.fileIcons,
        action.payload
      );
      state.currentWorkingFileOrFolder = {
        isActive: false,
        id: "",
        operation: "",
      };
    },

    renameFileOrFolderOfDirectory(
      state,
      action: PayloadAction<{ id: string; name: string; isFolder: boolean }>
    ) {
      renameFileOrFolder(
        state.directories,
        action.payload.isFolder ? state.folderIcons : state.fileIcons,
        action.payload
      );
      state.currentWorkingFileOrFolder = {
        isActive: false,
        id: "",
        operation: "",
      };
    },

    deleteFileOrFolderOfDirectory(
      state,
      action: PayloadAction<{ id: string }>
    ) {
      deleteFileOrFolder(state.directories, action.payload.id);
    },

    setFileIcons(state, action: PayloadAction<{ [key: string]: string }>) {
      // console.log(action.payload);
      state.fileIcons = { ...action.payload };
    },

    setFolderIcons(state, action: PayloadAction<{ [key: string]: string }>) {
      // console.log(action.payload);
      state.folderIcons = { ...action.payload };
    },

    setCurrentWorkingFileOrFolder(
      state,
      action: PayloadAction<{
        isActive: boolean;
        id: string;
        operation: "rename" | "add";
      }>
    ) {
      state.currentWorkingFileOrFolder = action.payload;
    },

  },
});
export const {
  addFileOrFolderToDirectory,
  renameFileOrFolderOfDirectory,
  deleteFileOrFolderOfDirectory,
  setCurrentWorkingFileOrFolder,
  setFileIcons,
  setFolderIcons,
} = fileDirectorySlice.actions;

export default fileDirectorySlice.reducer;
