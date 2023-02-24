import file from "./file.interface";

export default interface directory {
  id: string;
  name: string;
  isFolder: boolean;
  fileInfo?: file;
  children: directory;
}
