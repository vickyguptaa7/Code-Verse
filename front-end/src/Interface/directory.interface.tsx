export default interface directory {
  id: string;
  name: string;
  parentId: string;
  isFolder: boolean;
  fileId: string | null;
  children: Array<directory>;
}
