import IDirectory from "../../@types/directory.d";
import { IFilesInforation } from "../../@types/file.d";
import logo from "../../Assets/images/code-verse/code-verse.png";
import {
  getFromDirectoryIndexDB,
  storeToDirectoryIndexDB,
  storeToFilesInformationDirectoryIndexDB,
} from "../../library/idb/idb.lib";
import { uniqueIdGenerator } from "../../library/uuid/uuid.lib";

const README = `#Introduction
Welcome to CodeVerse, an online code editor and compiler designed to support various programming languages including Java, C++, Python, and more. With CodeVerse, you can write, edit, and execute your code seamlessly within a web-based environment.

#FEATURES
- Multiple tabs for editing multiple files simultaneously
- Integrated terminal
- Search and replace functionality
- Code folding
- Autocomplete suggestions
- Import files and folders from your local system
- Download files and folders to your local system
- Persistent storage of files and folders`;

const uniqueId = uniqueIdGenerator();

let DUMMY_FILE_DIRECTORY: Array<IDirectory> = [];

let DUMMY_FILE_INFORMATION: IFilesInforation = {
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
    iconUrls: [logo],
    language: "welcome",
    body: "",
  },
};

const intialManagementOfIndxDb = async () => {
  const dir = await getFromDirectoryIndexDB("codeverse-directory");
  if (!dir?.length) {
    await storeToDirectoryIndexDB("codeverse-directory", [
      {
        id: uniqueId,
        name: "readme.md",
        iconUrls: [
          "https://firebasestorage.googleapis.com/v0/b/online-code-editor-a43af.appspot.com/o/fileIcons%2Fmarkdown.svg?alt=media&token=20c16af8-de4f-4fbe-a91c-41e6bf9204f8",
        ],
        isFolder: false,
        parentId: "root",
        path: "root/" + uniqueId,
        children: [],
      },
    ]);
    await storeToFilesInformationDirectoryIndexDB(uniqueId, {
      id: uniqueId,
      name: "readme.md",
      iconUrls: [
        "https://firebasestorage.googleapis.com/v0/b/online-code-editor-a43af.appspot.com/o/fileIcons%2Fmarkdown.svg?alt=media&token=20c16af8-de4f-4fbe-a91c-41e6bf9204f8",
      ],
      language: "md",
      body: README,
    });
  }
};
export {
  DUMMY_FILE_DIRECTORY,
  DUMMY_FILE_INFORMATION,
  intialManagementOfIndxDb,
};
