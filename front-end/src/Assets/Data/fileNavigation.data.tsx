import { INavFile } from "../../@types/file.d";

let DUMMY_FILES: Array<INavFile> = [
  {
    id: "welcome",
    type: "welcome",
  },
];

const EMPTY_FILE: INavFile = {
  id: "null",
  type: "file",
};

export { DUMMY_FILES, EMPTY_FILE };
