import IDirectory from "../../../../@types/directory.d";
import { IFilesInforation } from "../../../../@types/file.d";
import { IIcon } from "../../../../@types/Icon.d";
import {
  removeFromFilesInformationDirectoryIndexDB,
  storeToFilesInformationDirectoryIndexDB,
} from "../../../../library/idb/idb.lib";
import {
  directoryComparator,
  findFileExtension,
  findFileFolderIconUrl,
} from "../../../../utils/fileFolder.utils";

/**
 * This function traverses through a directory structure to add a file or folder to a specific path.
 * @param {IFilesInforation} filesInformation - an object containing information about all the files in
 * the file system
 * @param directories - An array of objects representing directories in a file system. Each object has
 * the following properties:
 * @param {IIcon} iconList - An object containing information about available icons.
 * @param info - An object containing information about the file or folder being added. It includes the
 * id, parentId, name, whether it is a folder or not, and the path to the directory where it should be
 * added.
 * @param {string} [currDirPath=root] - The current directory path being traversed. It is initially set
 * to "root" and gets updated as the function recursively traverses through the directory structure.
 * @param {number} [pathIndx=1] - The index of the current directory in the path array of the file or
 * folder being added.
 * @returns a boolean value. It returns true if the file or folder specified in the `info` object is
 * successfully added to the directory specified in the `info.path` array, and false otherwise.
 */
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

  // find the child directory Indx in the directory array of the current directory (directories)
  const childIndx = directories.findIndex(
    (directory) => directory.id === info.path[pathIndx]
  );

  // if the child directory is not found then return false
  if (childIndx === -1) return false;

  // if the path is found then add the file or folder to the directory
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

  // if the path is not found then return false
  return false;
};

/**
 * This function traverses through a directory to find a specific file or folder and renames it if
 * found.
 * @param {IFilesInforation} filesInformation - an object containing information about files in a
 * directory, such as their names and paths
 * @param directories - An array of objects representing directories in a file system. Each object has
 * properties like id, name, isFolder, and children (if it is a folder).
 * @param {IIcon} iconList - IIcon - an interface that defines the properties of an icon, such as its
 * name and file type.
 * @param info - An object containing information about the file or folder to be renamed. It has the
 * following properties:
 * @param {number} [pathIndx=1] - `pathIndx` is a parameter that represents the index of the current
 * directory in the `info.path` array. It is used to traverse through the directory path recursively
 * until the target directory is found. The default value of `pathIndx` is 1, which assumes that the
 * first element
 * @returns a boolean value. It returns `true` if the file or folder is successfully renamed, and
 * `false` if the path to the file or folder is not found.
 */
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
  // find the childIndx of the directory in the current directory (directories)
  const childIndx = directories.findIndex(
    (directory) => directory.id === info.path[pathIndx]
  );

  // if the childIndx is not found then return false
  if (childIndx === -1) return false;

  // if the path is found then rename the file or folder
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

  // if the path is folder then traverse to the child directory
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

  // if the path is not found then return false
  return false;
};

/**
 * This function traverses through a directory to find and delete a file or folder based on its ID and
 * path.
 * @param {IFilesInforation} filesInformation - An object containing information about all the files in
 * the directory, where the keys are the file IDs and the values are objects containing information
 * about the file (such as name, size, type, etc.).
 * @param directories - An array of objects representing directories. Each object contains information
 * about the directory such as its ID, whether it is a folder or not, and its children (if it is a
 * folder).
 * @param {string} id - The id of the file or folder that needs to be deleted.
 * @param path - The path is an array of strings representing the directory path to the file or folder
 * that needs to be deleted. Each string in the array represents a directory name in the path. For
 * example, if the path is ["documents", "files", "report.pdf"], it means that the file "report.pdf
 * @param {number} [pathIndx=1] - `pathIndx` is a parameter that represents the current index of the
 * path array being traversed in the `traverseInDirectoryForDelete` function. It is used to keep track
 * of the current position in the path array and to determine if the target file or directory has been
 * found. It
 * @returns a boolean value. It returns true if the file or folder with the given id is found and
 * deleted successfully, and false if it is not found.
 */
const traverseInDirectoryForDelete = (
  filesInformation: IFilesInforation,
  directories: Array<IDirectory>,
  id: string,
  path: Array<string>,
  pathIndx: number = 1
) => {
  // find the childIndx of the directory in the current directory (directories)
  const childIndx = directories.findIndex((directory) => {
    return directory.id === path[pathIndx];
  });

  // if the childIndx is not found then return false
  if (childIndx === -1) return false;

  // if the path is found then delete the file or folder
  if (path.length === pathIndx + 1 && path[pathIndx] === id) {
    if (directories[childIndx].id === id) {
      if (directories[childIndx].isFolder) {
        deleteAllChildFiles(filesInformation, directories[childIndx].children);
      } else {
        removeFromFilesInformationDirectoryIndexDB(directories[childIndx].id);
        delete filesInformation[directories[childIndx].id];
      }
      directories.splice(childIndx, 1);
      return true;
    } else return false;
  }

  // if the path is folder then traverse to the child directory
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

  // if the path is not found then return false
  return false;
};

/**
 * This function recursively deletes all child files in a given directory.
 * @param {IFilesInforation} filesInformation - an object containing information about files, where the
 * keys are file IDs and the values are objects containing file metadata
 * @param directories - An array of objects representing directories. Each directory object should have
 * the following properties:
 */
function deleteAllChildFiles(
  filesInformation: IFilesInforation,
  directories: Array<IDirectory>
) {
  for (const directory of directories) {
    if (directory.isFolder) {
      deleteAllChildFiles(filesInformation, directory.children);
    } else {
      // removing the files
      removeFromFilesInformationDirectoryIndexDB(directory.id);
      delete filesInformation[directory.id];
    }
  }
}

/**
 * This function renames a file or folder, updates its icon and name in the directory, and sorts the
 * directory.
 * @param {IFilesInforation} filesInformation - An object containing information about files, where the
 * keys are file IDs and the values are objects containing properties such as name, iconUrls, and
 * language.
 * @param directories - An array of objects representing directories. Each object contains information
 * about the directory such as its name, iconUrls, and whether it is a folder or not.
 * @param {IIcon} iconList - An object containing the URLs of icons for different file types.
 * @param {number} directoryIndx - The index of the directory in the `directories` array that needs to
 * be renamed.
 * @param info - An object containing the id and new name of the file or folder that needs to be
 * renamed.
 */
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
    storeToFilesInformationDirectoryIndexDB(info.id, filesInformation[info.id]);
  }
  // sort to organize the files or folders of that directory with respect to name and type ie file or folder
  directories.sort(directoryComparator);
}

/**
 * This function adds a new file or folder to a directory, updates the file information if it's a file,
 * and sorts the directory.
 * @param {IFilesInforation} filesInformation - an object containing information about all the files in
 * the application
 * @param directories - An array of objects representing directories in a file system. Each object has
 * properties such as id, parentId, name, iconUrls, isFolder, children, and path.
 * @param {IIcon} iconList - An object containing the URLs of icons for different file types and
 * folders.
 * @param info - The `info` parameter is an object that contains information about the file or folder
 * being added. It has the following properties:
 * @param {string} path - The path parameter is a string that represents the current path of the
 * directory where the new file or folder is being added. It is used to update the path of the newly
 * added item.
 */
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
  // adding the new file or folder to the directory
  const newItem = {
    id: info.id,
    parentId: info.parentId,
    name: info.name.trim(),
    iconUrls: findFileFolderIconUrl(info.name, info.isFolder, iconList),
    isFolder: info.isFolder,
    children: [],
    path: path + "/" + info.id,
  };

  // add the new file or folder to the directories
  directories.unshift(newItem);

  // if its a file then we have to add it to the fileInformation also
  if (!info.isFolder) {
    filesInformation[info.id] = {
      id: info.id,
      name: newItem.name,
      iconUrls: newItem.iconUrls,
      body: "",
      language: findFileExtension(newItem.name).extName,
    };
    storeToFilesInformationDirectoryIndexDB(info.id, filesInformation[info.id]);
  }

  // sort to organize the files or folders of that directory with respect to name and type ie file or folder
  directories.sort(directoryComparator);
}

export {
  traverseInDirectoryForAdd,
  traverseInDirectoryForRename,
  traverseInDirectoryForDelete,
};
