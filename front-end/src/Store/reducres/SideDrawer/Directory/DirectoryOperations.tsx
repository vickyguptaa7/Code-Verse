import IDirectory from "../../../../Interface/directory.interface";
import { IFilesInforation } from "../../../../Interface/file.interface";
import { IIcon } from "../../../../Interface/Icon.interface";
import {
  directoryComparator,
  findFileExtension,
  findFileFolderIconUrl,
} from "../../../../utils/fileFolder.utils";

const traverseInDirectoryForAdd = (
  filesInformation: IFilesInforation,
  directories: Array<IDirectory>,
  iconList: IIcon,
  info: {
    id: string;
    parentId: string;
    name: string;
    isFolder: boolean;
    path: Array<string>;
  },
  currDirPath: string = "root",
  pathIndx: number = 1
) => {
  // for root directory we dont need to traverse to the the child directory (root directory is the main menu where we can just add file or folder)
  if (
    info.path.length === pathIndx &&
    info.path[pathIndx - 1] === info.parentId
  ) {
    addFileOrFolder(filesInformation, directories, iconList, info, currDirPath);
    return true;
  }
  const childIndx = directories.findIndex(
    (directory) => directory.id === info.path[pathIndx]
  );
  if (childIndx === -1) return false;
  console.log(directories[childIndx], childIndx);
  if (
    directories[childIndx].isFolder &&
    traverseInDirectoryForAdd(
      filesInformation,
      directories[childIndx].children,
      iconList,
      info,
      currDirPath + "/" + directories[childIndx].id,
      pathIndx + 1
    )
  )
    return true;

  return false;
};

const traverseInDirectoryForRename = (
  filesInformation: IFilesInforation,
  directories: Array<IDirectory>,
  iconList: IIcon,
  info: {
    id: string;
    name: string;
    path: Array<string>;
  },
  pathIndx: number = 1
) => {
  const childIndx = directories.findIndex(
    (directory) => directory.id === info.path[pathIndx]
  );

  if (childIndx === -1) return false;

  if (info.path.length === pathIndx + 1) {
    renameOfFileOrFolder(
      filesInformation,
      directories,
      iconList,
      childIndx,
      info
    );
    return true;
  }
  if (
    directories[childIndx].isFolder &&
    traverseInDirectoryForRename(
      filesInformation,
      directories[childIndx].children,
      iconList,
      info,
      pathIndx + 1
    )
  )
    return true;

  return false;
};

const traverseInDirectoryForDelete = (
  filesInformation: IFilesInforation,
  directories: Array<IDirectory>,
  id: string,
  path: Array<string>,
  pathIndx: number = 1
) => {
  const childIndx = directories.findIndex((directory) => {
    return directory.id === path[pathIndx];
  });
  if (childIndx === -1) return false;
  console.log("Path : ", path, pathIndx);
  if (path.length === pathIndx + 1 && path[pathIndx] === id) {
    if (directories[childIndx].id === id) {
      if (directories[childIndx].isFolder)
        deleteAllChildFiles(filesInformation, directories[childIndx].children);
      else delete filesInformation[directories[childIndx].id];
      directories.splice(childIndx, 1);
      return true;
    } else return false;
  }

  if (
    directories[childIndx].isFolder &&
    traverseInDirectoryForDelete(
      filesInformation,
      directories[childIndx].children,
      id,
      path,
      pathIndx + 1
    )
  )
    return true;

  return false;
};

// if we are deleting a folder then we have to check recusively to delete all the child files present so that our fileInformation should be upto date.
function deleteAllChildFiles(
  filesInformation: IFilesInforation,
  directories: Array<IDirectory>
) {
  for (const directory of directories) {
    if (directory.isFolder) {
      deleteAllChildFiles(filesInformation, directory.children);
    } else {
      // removing the files
      delete filesInformation[directory.id];
    }
  }
}

function renameOfFileOrFolder(
  filesInformation: IFilesInforation,
  directories: Array<IDirectory>,
  iconList: IIcon,
  directoryIndx: number,
  info: {
    id: string;
    name: string;
  }
) {
  // updating the name and icon url
  const newIconUrl = findFileFolderIconUrl(
    info.name,
    directories[directoryIndx].isFolder,
    iconList
  );
  directories[directoryIndx] = {
    ...directories[directoryIndx],
    name: info.name,
    iconUrls: newIconUrl,
  };
  // if its a folder then we have to update the file informations also
  if (!directories[directoryIndx].isFolder) {
    filesInformation[info.id] = {
      ...filesInformation[info.id],
      name: info.name,
      iconUrls: newIconUrl,
      language: findFileExtension(info.name).extName,
    };
  }
  // sort to organize the files or folders of that directory with respect to name and type ie file or folder
  directories.sort(directoryComparator);
}

function addFileOrFolder(
  filesInformation: IFilesInforation,
  directories: Array<IDirectory>,
  iconList: IIcon,
  info: {
    id: string;
    parentId: string;
    name: string;
    isFolder: boolean;
  },
  path: string
) {
  console.log(path + "/" + info.id);
  const newItem = {
    id: info.id,
    parentId: info.parentId,
    name: info.name.trim(),
    iconUrls: findFileFolderIconUrl(info.name, info.isFolder, iconList),
    isFolder: info.isFolder,
    children: [],
    path: path + "/" + info.id,
  };
  directories.unshift(newItem);

  if (!info.isFolder) {
    filesInformation[info.id] = {
      id: info.id,
      name: newItem.name,
      iconUrls: newItem.iconUrls,
      body: "",
      language: findFileExtension(newItem.name).extName,
    };
  }
  directories.sort(directoryComparator);
}

export {
  traverseInDirectoryForAdd,
  traverseInDirectoryForRename,
  traverseInDirectoryForDelete,
};
