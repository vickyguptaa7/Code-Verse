import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IDirectory from "../../../../Interface/directory.interface";
import { IFile } from "../../../../Interface/file.interface";
import { IIcon } from "../../../../Interface/Icon.interface";
import {
  traverseInDirectoryForDelete,
  traverseInDirectoryForRename,
  traverseInDirectoryForAdd,
} from "./DirectoryOperations";
import { directoryComparator } from "../../../../utils/fileFolder.utils";
import {
  DUMMY_FILE_DIRECTORY,
  DUMMY_FILE_INFORMATION,
} from "../../../../Assets/Data/FileFolder.data";

const directoryInitialState = {
  directories: DUMMY_FILE_DIRECTORY,
  fileIcons: {} as IIcon,
  folderIcons: {} as IIcon,
  filesInformation: DUMMY_FILE_INFORMATION,
  undoRedoHistoryInfo: {} as {
    [key: string]: { stack: Array<string>; pointer: number };
  },
  infoOfCurrentWorkingFileOrFolder: {
    isActive: false,
    operation: "",
    id: "",
  },
};

const directorySlice = createSlice({
  name: "Directory",
  initialState: directoryInitialState,
  reducers: {
    addFileOrFolderToDirectory(
      state,
      action: PayloadAction<{
        id: string;
        parentId: string;
        name: string;
        isFolder: boolean;
        path: Array<string>;
      }>
    ) {
      traverseInDirectoryForAdd(
        state.filesInformation,
        state.directories,
        action.payload.isFolder ? state.folderIcons : state.fileIcons,
        action.payload
      );
      state.infoOfCurrentWorkingFileOrFolder = {
        isActive: false,
        id: "",
        operation: "",
      };
    },

    renameFileOrFolderOfDirectory(
      state,
      action: PayloadAction<{
        id: string;
        name: string;
        isFolder: boolean;
        path: Array<string>;
      }>
    ) {
      console.log(
        traverseInDirectoryForRename(
          state.filesInformation,
          state.directories,
          action.payload.isFolder ? state.folderIcons : state.fileIcons,
          action.payload
        )
      );
      state.infoOfCurrentWorkingFileOrFolder = {
        isActive: false,
        id: "",
        operation: "",
      };
    },

    deleteFileOrFolderOfDirectory(
      state,
      action: PayloadAction<{ id: string; path: Array<string> }>
    ) {
      traverseInDirectoryForDelete(
        state.filesInformation,
        state.directories,
        action.payload.id,
        action.payload.path
      );
    },

    setFileIcons(state, action: PayloadAction<{ [key: string]: string }>) {
      // console.log(action.payload);
      state.fileIcons = { ...action.payload };
    },

    setFolderIcons(state, action: PayloadAction<{ [key: string]: string }>) {
      // console.log(action.payload);
      state.folderIcons = { ...action.payload };
    },

    setInfoOfCurrentWorkingFileOrFolder(
      state,
      action: PayloadAction<{
        isActive: boolean;
        id: string;
        operation: "rename" | "add";
      }>
    ) {
      state.infoOfCurrentWorkingFileOrFolder = action.payload;
    },

    updateFileBody(
      state,
      action: PayloadAction<Array<{ id: string; body: string }>>
    ) {
      for (const fileInfo of action.payload) {
        state.filesInformation[fileInfo.id].body = fileInfo.body;
      }
    },

    setFilesInformation(state, action: PayloadAction<Array<IFile>>) {
      for (const file of action.payload) {
        state.filesInformation[file.id] = file;
      }
    },

    addExternalFileOrFolderToDirectory(
      state,
      action: PayloadAction<Array<IDirectory>>
    ) {
      for (const directory of action.payload) {
        state.directories.push(directory);
      }
      state.directories.sort(directoryComparator);
    },
    setUndoRedoHistoryInfo(
      state,
      action: PayloadAction<{
        [key: string]: { stack: Array<string>; pointer: number };
      }>
    ) {
      state.undoRedoHistoryInfo = action.payload;
    },
  },
});
export const {
  addFileOrFolderToDirectory,
  renameFileOrFolderOfDirectory,
  deleteFileOrFolderOfDirectory,
  setInfoOfCurrentWorkingFileOrFolder,
  setFileIcons,
  setFolderIcons,
  updateFileBody,
  addExternalFileOrFolderToDirectory,
  setFilesInformation,
  setUndoRedoHistoryInfo,
} = directorySlice.actions;

export default directorySlice.reducer;
