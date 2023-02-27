import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import directory from "../../../Interface/directory.interface";
// TODO:Central file state

let DUMMY_FILE_DIRECTORY = [
  {
    id: "i1",
    name: "folder1",
    isFolder: true,
    fileId: null,
    children: [
      {
        id: "i2",
        name: "file1",
        isFolder: false,
        fileId: "i1",
        children: [],
      },
      {
        id: "i3",
        name: "folder2",
        isFolder: true,
        fileId: "i1",
        children: [
          {
            id: "i4",
            name: "file2",
            isFolder: false,
            fileId: "i1",
            children: [],
          },
        ],
      },
    ],
  },
];

const fileDirectoryInitialState = {
  directories: DUMMY_FILE_DIRECTORY,
};

const fileDirectorySlice = createSlice({
  name: "file-directory",
  initialState: fileDirectoryInitialState,
  reducers: {},
});
export const {} = fileDirectorySlice.actions;

export default fileDirectorySlice.reducer;
