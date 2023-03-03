export default interface directory {
  id: string;
  name: string;
  parentId: string;
  isFolder: boolean;
  children: Array<directory>;
}
