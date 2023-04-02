import IDirectory from "../../Interface/directory.interface";
import { IFilesInforation } from "../../Interface/file.interface";

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

export { DUMMY_FILE_DIRECTORY, DUMMY_FILE_INFORMATION };
