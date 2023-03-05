export default interface directory {
  id: string;
  name: string;
  parentId: string;
  iconsUrl: Array<string>;
  isFolder: boolean;
  children: Array<directory>;
}
