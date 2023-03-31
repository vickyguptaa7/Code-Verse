import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import IDirectory from "../../../../Interface/directory.interface";
import { IFile, IFilesInforation } from "../../../../Interface/file.interface";
import { iconObject } from "../../../../Interface/iconObject.interface";
import {
  traverseInDirectoryForDelete,
  traverseInDirectoryForRename,
  traverseInDirectoryForAdd,
} from "./DirectoryOperations";
import { directoryComparator } from "./DirectoryOperations";

let DUMMY_FILE_DIRECTORY: Array<IDirectory> = [
  {
    id: "welcomelop",
    name: "welcomelop",
    iconUrls: [
      "https://firebasestorage.googleapis.com/v0/b/online-code-editor-a43af.appspot.com/o/fileIcons%2Fc.svg?alt=media&token=3bd3d797-69a3-4150-9f5b-07ec4757bb5f",
    ],
    isFolder: false,
    parentId: "root",
    path: "root/welcomelop",
    children: [],
  },
];

let DUMMY_FILE_INFORMATION: IFilesInforation = {
  welcomelop: {
    id: "welcomelop",
    name: "welcomelop",
    iconUrls: [
      "https://firebasestorage.googleapis.com/v0/b/online-code-editor-a43af.appspot.com/o/fileIcons%2Fc.svg?alt=media&token=3bd3d797-69a3-4150-9f5b-07ec4757bb5f",
    ],
    language: "txt",
    body: "welcome you all!",
  },
  setting: {
    id: "setting",
    name: "setting",
    iconUrls: [
      "https://firebasestorage.googleapis.com/v0/b/online-code-editor-a43af.appspot.com/o/fileIcons%2Fsettings.svg?alt=media&token=7dcef9c8-c6ac-44ef-8f44-835b12fc59a7",
    ],
    language: "setting",
    body: "",
  },
  extension: {
    id: "extension",
    name: "extension",
    iconUrls: [],
    language: "extension",
    body: "",
  },
  welcome: {
    id: "welcome",
    name: "welcome",
    iconUrls: [],
    language: "welcome",
    body: "",
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
        id: string;
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
      action: PayloadAction<{ id: string; name: string; isFolder: boolean,path:Array<string> }>
    ) {
      console.log(traverseInDirectoryForRename(
        state.filesInformation,
        state.directories,
        action.payload.isFolder ? state.folderIcons : state.fileIcons,
        action.payload
      ));
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
} = directorySlice.actions;

export default directorySlice.reducer;
