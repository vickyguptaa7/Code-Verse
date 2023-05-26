import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IDirectory from "../../../../@types/directory.d";
import { IFile } from "../../../../@types/file.d";
import { IIcon } from "../../../../@types/Icon.d";
import {
  DUMMY_FILE_DIRECTORY,
  DUMMY_FILE_INFORMATION,
} from "../../../../Assets/Data/FileFolder.data";
import { directoryComparator } from "../../../../utils/fileFolder.utils";
import {
  traverseInDirectoryForAdd,
  traverseInDirectoryForDelete,
  traverseInDirectoryForRename,
} from "./DirectoryOperations";

const directoryInitialState = {
  directories: DUMMY_FILE_DIRECTORY,
  fileIcons: {} as IIcon,
  folderIcons: {} as IIcon,
  filesInformation: DUMMY_FILE_INFORMATION,
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
      traverseInDirectoryForRename(
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
      state.fileIcons = { ...action.payload };
    },

    setFolderIcons(state, action: PayloadAction<{ [key: string]: string }>) {
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

    initialAddFilesInformation(state, action: PayloadAction<Array<IFile>>) {
      for (const file of action.payload) {
        state.filesInformation[file.id] = file;
      }
    },

    setDirectories(state, action: PayloadAction<Array<IDirectory>>) {
      state.directories = action.payload;
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
  },
});
export const {
  addFileOrFolderToDirectory,
  renameFileOrFolderOfDirectory,
  deleteFileOrFolderOfDirectory,
  addExternalFileOrFolderToDirectory,
  updateFileBody,
  initialAddFilesInformation,
  setInfoOfCurrentWorkingFileOrFolder,
  setFileIcons,
  setFolderIcons,
  setDirectories,
  setFilesInformation,
} = directorySlice.actions;

export default directorySlice.reducer;
