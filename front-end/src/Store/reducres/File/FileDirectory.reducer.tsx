import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import directory from "../../../Interface/directory.interface";
// TODO:Central file state

let DUMMY_FILE_DIRECTORY = [
  {
    id: "i1",
    name: "folder1",
    parentId: "root",
    isFolder: true,
    fileId: null,
    children: [
      {
        id: "i9",
        parentId: "i1",
        name: "file1",
        isFolder: false,
        fileId: "i1",
        children: [],
      },
      {
        id: "i3",
        parentId: "i1",
        name: "folder2",
        isFolder: true,
        fileId: "i1",
        children: [
          {
            id: "i4",
            parentId: "i3",
            name: "folder3",
            isFolder: true,
            fileId: "i1",
            children: [
              {
                id: "i9",
                parentId: "i4",
                name: "file3",
                isFolder: false,
                fileId: "i1",
                children: [],
              },
              {
                id: "i21",
                parentId: "i4",
                name: "file4",
                isFolder: false,
                fileId: "i1",
                children: [],
              },
            ],
          },
          {
            id: "i6",
            parentId: "i3",
            name: "file5",
            isFolder: false,
            fileId: "i1",
            children: [],
          },
        ],
      },
      {
        id: "i2",
        parentId: "i1",
        name: "file6",
        isFolder: false,
        fileId: "i1",
        children: [],
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
  reducers: {
    addToDirectory(
      state,
      action: PayloadAction<{ id: string; name: string; isFolder: boolean }>
    ) {},
  },
});
export const { addToDirectory } = fileDirectorySlice.actions;

export default fileDirectorySlice.reducer;
