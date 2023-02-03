import file from "./file.interface";

export default interface directory {
  filesList: Array<file>;
  child: Array<directory>;
  parent: directory;
}
