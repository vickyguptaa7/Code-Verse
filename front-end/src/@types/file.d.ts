export interface IFile {
  id: string;
  name: string;
  body: string;
  iconUrls: string[];
  language: string;
}
export interface INavFile {
  id: string;
  type: "file" | "extension" | "setting" | "welcome";
}

export interface IFilesInforation {
  [key: string]: IFile;
}
