export default interface IDirectory {
  id: string;
  name: string;
  parentId: string;
  iconsUrl: Array<string>;
  isFolder: boolean;
  children: Array<IDirectory>;
}
