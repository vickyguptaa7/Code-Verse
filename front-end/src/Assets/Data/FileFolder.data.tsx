import IDirectory from "../../Interface/directory.interface";
import { IFilesInforation } from "../../Interface/file.interface";
import vscodeImage from "../../Assets/images/vsc/vscode.svg";
import { uniqueIdGenerator } from "../../library/uuid/uuid.lib";

const readme=
`#Introduction
This web app is a clone of the popular code editor, Visual Studio Code (VSCode).
It provides a similar interface and features to VSCode, but can be accessed directly from your web browser.

#FEATURES
1.Multiple tabs for editing multiple files simultaneously
2.Integrated terminal
3.Search and replace functionality
4.Code folding
5.Autocomplete suggestions`

const uniqueId = uniqueIdGenerator();

let DUMMY_FILE_DIRECTORY: Array<IDirectory> = [
  {
    id: uniqueId,
    name: "readme.md",
    iconUrls: [
      "https://firebasestorage.googleapis.com/v0/b/online-code-editor-a43af.appspot.com/o/fileIcons%2Fmarkdown.svg?alt=media&token=20c16af8-de4f-4fbe-a91c-41e6bf9204f8",
    ],
    isFolder: false,
    parentId: "root",
    path: "root/welcomelop",
    children: [],
  },
];

let DUMMY_FILE_INFORMATION: IFilesInforation = {
  [uniqueId]: {
    id: uniqueId,
    name: "readme.md",
    iconUrls: [
      "https://firebasestorage.googleapis.com/v0/b/online-code-editor-a43af.appspot.com/o/fileIcons%2Fmarkdown.svg?alt=media&token=20c16af8-de4f-4fbe-a91c-41e6bf9204f8",
    ],
    language: "md",
    body: readme,
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
    name: "Welcome",
    iconUrls: [vscodeImage],
    language: "welcome",
    body: "",
  },
};

export { DUMMY_FILE_DIRECTORY, DUMMY_FILE_INFORMATION };


