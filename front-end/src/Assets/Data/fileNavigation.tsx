import { INavFile } from "../../Interface/file.interface";

let DUMMY_FILES: Array<INavFile> = [
  {
    id: "welcomelop",
    type: "file",
  },
  {
    id: "setting",
    type: "setting",
  },
];

const EMPTY_FILE: INavFile = {
  id: "null",
  type: "file",
};

export { DUMMY_FILES, EMPTY_FILE };
