import IDirectory from "../../../Interface/directory.interface";
import { IFilesInforation } from "../../../Interface/file.interface";
import { iconObject } from "../../../Interface/iconObject.interface";

const findExtension = (name: string) => {
  let extension = "";
  let isDotPresent = false;
  for (let i = name.length - 1; i >= 0; i--) {
    if (name[i] === ".") {
      isDotPresent = true;
      break;
    }
    extension += name[i];
  }
  extension = extension.split("").reverse().join("");
  return { extName: extension, isDotPresent };
};

const findIconUrl = (name: string, isFolder: boolean, iconList: iconObject) => {
  name = name.toLowerCase();
  if (isFolder) {
    if (
      !iconList.hasOwnProperty("folder-" + name) ||
      !iconList.hasOwnProperty("folder-" + name + "-open")
    ) {
      return [];
    }
    return [iconList["folder-" + name], iconList["folder-" + name + "-open"]];
  }
  const extensionInfo = findExtension(name);
  if (
    !extensionInfo.isDotPresent ||
    !iconList.hasOwnProperty(extensionInfo.extName)
  ) {
    return [];
  }
  return [iconList[extensionInfo.extName]];
};

// Note : if we performed the targeted operation on the file or folder then we don't visit further child directory we just come out from the recursive traversal
// otherwise we visit the child directory until we have not performed the targeted operation

const traverseInDirectoryForAdd = (
  filesInformation: IFilesInforation,
  directories: Array<IDirectory>,
  iconList: iconObject,
  info: {
    id: string;
    parentId: string;
    name: string;
    isFolder: boolean;
  }
) => {
  // for root directory we dont need to traverse to the the child directory (root directory is the main menu where we can just add file or folder)
  if (info.parentId === "root") {
    addFileOrFolder(filesInformation, directories, iconList, info);
    return true;
  }

  for (const directory of directories) {
    console.log(directory.name, "add");
    // we can add files or folder in folder only not in file :)
    // and we should know the parent id of the directory where we have to add the file or folder
    if (directory.isFolder && directory.id === info.parentId) {
      addFileOrFolder(filesInformation, directory.children, iconList, info);
      return true;
    }
    if (directory.isFolder)
      if (
        traverseInDirectoryForAdd(
          filesInformation,
          directory.children,
          iconList,
          info
        )
      )
        return true;
  }
  return false;
};

const traverseInDirectoryForRename = (
  filesInformation: IFilesInforation,
  directories: Array<IDirectory>,
  iconList: iconObject,
  info: {
    id: string;
    name: string;
  }
) => {
  for (const directoryIndx in directories) {
    // if id matches we rename the file or folder
    console.log(directories[directoryIndx].name, "rename");

    if (directories[directoryIndx].id === info.id) {
      renameOfFileOrFolder(
        filesInformation,
        directories,
        iconList,
        parseInt(directoryIndx),
        info
      );
      return true;
    }
    // if its folder then we search in childrens if we have not found it yet
    if (directories[directoryIndx].isFolder) {
      if (
        traverseInDirectoryForRename(
          filesInformation,
          directories[directoryIndx].children,
          iconList,
          info
        )
      )
        return true;
    }
  }
  return false;
};

const traverseInDirectoryForDelete = (
  filesInformation: IFilesInforation,
  directories: Array<IDirectory>,
  id: string
) => {
  for (const directoryIndx in directories) {
    // if id matches remove that directory from the list and just dont traverse the other nested directories as our task is done
    console.log(directories[directoryIndx].name, "delete");

    if (directories[directoryIndx].id === id) {
      if (directories[directoryIndx].isFolder)
        deleteAllChildFiles(
          filesInformation,
          directories[directoryIndx].children
        );
      else delete filesInformation[directories[directoryIndx].id];
      directories.splice(parseInt(directoryIndx), 1);
      return true;
    }
    if (directories[directoryIndx].isFolder) {
      if (
        traverseInDirectoryForDelete(
          filesInformation,
          directories[directoryIndx].children,
          id
        )
      )
        return true;
    }
  }
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
  iconList: iconObject,
  directoryIndx: number,
  info: {
    id: string;
    name: string;
  }
) {
  // updating the name and icon url
  const newIconUrl = findIconUrl(
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
      language: findExtension(info.name).extName,
    };
  }
  // sort to organize the files or folders of that directory with respect to name and type ie file or folder
  directories.sort(mycomparator);
}

function addFileOrFolder(
  filesInformation: IFilesInforation,
  directories: Array<IDirectory>,
  iconList: iconObject,
  info: {
    id: string;
    parentId: string;
    name: string;
    isFolder: boolean;
  }
) {
  const newItem = {
    id: info.id,
    parentId: info.parentId,
    name: info.name.trim(),
    iconUrls: findIconUrl(info.name, info.isFolder, iconList),
    isFolder: info.isFolder,
    children: [],
  };
  directories.unshift(newItem);

  if (!info.isFolder) {
    filesInformation[info.id] = {
      id: info.id,
      name: newItem.name,
      iconUrls: newItem.iconUrls,
      body: "",
      language: findExtension(newItem.name).extName,
    };
  }
  directories.sort(mycomparator);
}

function mycomparator(d1: IDirectory, d2: IDirectory) {
  if (d1.isFolder && !d2.isFolder) return -1; // if d1 is folder then it must be above d2
  if (!d1.isFolder && d2.isFolder) return 1; // vice versa
  return d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1; // otherwise sort on the basis of the name
}

export {
  findIconUrl,
  traverseInDirectoryForAdd,
  traverseInDirectoryForRename,
  traverseInDirectoryForDelete,
};
