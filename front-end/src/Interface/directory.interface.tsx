export default interface IDirectory {
  id: string;
  name: string;
  parentId: string;
  path:string;
  iconUrls: Array<string>;
  isFolder: boolean;
  children: Array<IDirectory>;
}
