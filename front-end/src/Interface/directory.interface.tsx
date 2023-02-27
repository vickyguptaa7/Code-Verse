export default interface directory {
  id: string;
  name: string;
  isFolder: boolean;
  fileId: string|null;
  children: Array<directory>;
}
