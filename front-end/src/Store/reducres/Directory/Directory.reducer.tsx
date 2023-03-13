import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IDirectory from "../../../Interface/directory.interface";
import { IFilesInforation } from "../../../Interface/file.interface";
import { iconObject } from "../../../Interface/iconObject.interface";
import {
  traverseInDirectoryForDelete,
  traverseInDirectoryForRename,
  traverseInDirectoryForAdd,
} from "./DirectoryOperations";
// TODO:Central file state

let DUMMY_FILE_DIRECTORY: Array<IDirectory> = [
  {
    id: "welcome",
    name: "welcome",
    iconUrls: [
      "https://firebasestorage.googleapis.com/v0/b/online-code-editor-a43af.appspot.com/o/fileIcons%2Fc.svg?alt=media&token=3bd3d797-69a3-4150-9f5b-07ec4757bb5f",
    ],
    isFolder: false,
    parentId: "root",
    children: [],
  },
];

let DUMMY_FILE_INFORMATION: IFilesInforation = {
  welcome: {
    id: "welcome",
    name: "welcome",
    iconUrls: [
      "https://firebasestorage.googleapis.com/v0/b/online-code-editor-a43af.appspot.com/o/fileIcons%2Fc.svg?alt=media&token=3bd3d797-69a3-4150-9f5b-07ec4757bb5f",
    ],
    language: "txt",
    body: "welcome you all!",
  },
};

const directoryInitialState = {
  directories: DUMMY_FILE_DIRECTORY,
  fileIcons: {} as iconObject,
  folderIcons: {} as iconObject,
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
        parentId: string;
        name: string;
        isFolder: boolean;
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
      action: PayloadAction<{ id: string; name: string; isFolder: boolean }>
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
      action: PayloadAction<{ id: string }>
    ) {
      traverseInDirectoryForDelete(
        state.filesInformation,
        state.directories,
        action.payload.id
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
    updateFileBody(state, action: PayloadAction<{ id: string; body: string }>) {
      state.filesInformation[action.payload.id].body = action.payload.body;
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
  updateFileBody
} = directorySlice.actions;

export default directorySlice.reducer;
