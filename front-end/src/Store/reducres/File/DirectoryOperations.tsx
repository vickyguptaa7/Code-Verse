import IDirectory from "../../../Interface/directory.interface";

interface iconObject {
  [key: string]: string;
}

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
  if (!isDotPresent || !iconList.hasOwnProperty(extension)) {
    return [];
  }
  return [iconList[extension]];
};

const traverseToDirectory = (
  directories: Array<IDirectory>,
  iconList: iconObject,
  info: {
    parentId: string;
    name: string;
    isFolder: boolean;
  }
) => {
  if (info.parentId === "root") {
    addToDirectory(directories, iconList, info);
    return;
  }

  for (const directory of directories) {
    if (directory.isFolder && directory.id === info.parentId) {
      addToDirectory(directory.children, iconList, info);
      return;
    }
    if (directory.isFolder)
      traverseToDirectory(directory.children, iconList, info);
  }
};

const renameFileOrFolder = (
  directories: Array<IDirectory>,
  iconList: iconObject,
  info: {
    id: string;
    name: string;
  }
) => {
  for (const directoryIndx in directories) {
    if (directories[directoryIndx].id === info.id) {
      directories[directoryIndx] = {
        ...directories[directoryIndx],
        name: info.name,
        iconsUrl: findIconUrl(
          info.name,
          directories[directoryIndx].isFolder,
          iconList
        ),
      };
      directories.sort(mycomparator);
      return;
    }
    if (directories[directoryIndx].isFolder) {
      renameFileOrFolder(directories[directoryIndx].children, iconList, info);
    }
  }
};

const deleteFileOrFolder = (directories: Array<IDirectory>, id: string) => {
  for (const directoryIndx in directories) {
    if (directories[directoryIndx].id === id) {
      directories.splice(parseInt(directoryIndx), 1);
      return;
    }
    if (directories[directoryIndx].isFolder) {
      deleteFileOrFolder(directories[directoryIndx].children, id);
    }
  }
};

function addToDirectory(
  directories: Array<IDirectory>,
  iconList: iconObject,
  info: {
    parentId: string;
    name: string;
    isFolder: boolean;
  }
) {
  const id = new Date().getTime().toString();
  directories.unshift({
    id: id,
    parentId: info.parentId,
    name: info.name.trim(),
    iconsUrl: findIconUrl(info.name, info.isFolder, iconList),
    isFolder: info.isFolder,
    children: [],
  });
  directories.sort(mycomparator);
}

function mycomparator(d1: IDirectory, d2: IDirectory) {
  if (d1.isFolder && !d2.isFolder) return -1; // if d1 is folder then it must be above d2
  if (!d1.isFolder && d2.isFolder) return 1; // vice versa
  return d1.name.toLowerCase() > d2.name.toLowerCase() ? 1 : -1; // otherwise sort on the basis of the name
}

export {
  findIconUrl,
  traverseToDirectory,
  renameFileOrFolder,
  deleteFileOrFolder,
};
