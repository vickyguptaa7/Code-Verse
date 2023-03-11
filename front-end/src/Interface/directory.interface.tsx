export default interface IDirectory {
  id: string;
  name: string;
  parentId: string;
  iconUrls: Array<string>;
  isFolder: boolean;
  children: Array<IDirectory>;
}
