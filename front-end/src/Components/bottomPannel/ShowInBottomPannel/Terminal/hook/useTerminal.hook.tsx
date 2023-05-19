import { terminalHelpInfo } from "../../../../../Assets/Data/terminal.data";
import IDirectory from "../../../../../Interface/directory.interface";
import { setIsBottomPannelOpen } from "../../../../../Store/reducres/BottomPannel/BottomPannel.reducer";
import {
  setTerminalCommandHistory,
  setTerminalContent,
  setTerminalsCurrentDirectoryInfo,
} from "../../../../../Store/reducres/BottomPannel/Terminal/Terminal.reducer";
import { addFileToNavigation } from "../../../../../Store/reducres/Navigation/FileNavigation.reducer";
import {
  addFileOrFolderToDirectory,
  deleteFileOrFolderOfDirectory,
} from "../../../../../Store/reducres/SideDrawer/Directory/Directory.reducer";
import { useAppDispatch, useAppSelector } from "../../../../../Store/store";
import useDirectory from "../../../../../hooks/useDirectory.hook";
import { uniqueIdGenerator } from "../../../../../library/uuid/uuid.lib";
import { scrollToTarget } from "../../../../../utils/scrollToTargetId.util";

export const useTerminal = () => {
  const dispatch = useAppDispatch();
  const terminalContent = useAppSelector(
    (state) => state.terminal.terminalContent
  );
  const terminalsCurrentDirectoryInfo = useAppSelector(
    (state) => state.terminal.terminalsCurrentDirectoryInfo
  );
  const terminalCommandHistory = useAppSelector(
    (state) => state.terminal.terminalCommandHistory
  );

  const directories = useAppSelector((state) => state.Directory.directories);
  const { findDirectory, findDirectoryPath } = useDirectory();

  const rootDirectory: IDirectory = {
    id: "root",
    name: "root",
    path: "root",
    parentId: "root",
    isFolder: true,
    iconUrls: [],
    children: directories,
  };

  // all the action that can be done in terminal are here
  const terminalActions = (terminalInput: string) => {
    if (!terminalInput.length) {
      addToTerminalContent("");
      return;
    }
    addCommandToHistory(terminalInput);
    const input = terminalInput.trim().toLowerCase();
    switch (input) {
      case "clear":
        clearTerminalContent();
        return;
      case "exit":
        closeTerminal();
        return;
      case "ls":
        listCurrentDirectoryContent(terminalInput);
        return;
      case "pwd":
        printWorkingDirectory(terminalInput);
        return;
      case "cd":
        changeDirectoryToRoot(terminalInput);
        return;
      case "help":
        addToTerminalContent(terminalInput + "\n" + terminalHelpInfo);
        return;
      case "history":
        showCommandHistory(terminalInput);
        return;
      default:
        break;
    }
    if (input.split(" ").length === 2) {
      const twoArgInput = input.split(" ");
      switch (twoArgInput[0]) {
        case "cd":
          changeDirectory(twoArgInput[1], terminalInput);
          return;
        case "touch":
          createFile(twoArgInput[1], terminalInput);
          return;
        case "mkdir":
          createDirectory(twoArgInput[1], terminalInput);
          return;
        case "rm":
          deleteFileOrDirectory(twoArgInput[1], terminalInput);
          return;
        default:
          addToTerminalContent(
            `${terminalInput}\nbash: ${terminalInput}: command not found`
          );
          break;
      }
    } else {
      addToTerminalContent(
        `${terminalInput}\nbash: ${terminalInput}: command not found`
      );
    }
  };

  const clearTerminalContent = () => {
    dispatch(setTerminalContent(""));
  };

  // add the terminal input to the terminal content with the current directory info
  const addToTerminalContent = (terminalInput: string) => {
    dispatch(
      setTerminalContent(
        `${terminalContent}${terminalsCurrentDirectoryInfo.name}:root$ ${terminalInput}\n`
      )
    );
  };

  const closeTerminal = () => {
    dispatch(setIsBottomPannelOpen(false));
  };

  const addCommandToHistory = (command: string) => {
    dispatch(setTerminalCommandHistory(command));
  };

  // display the command history to the terminal content
  const showCommandHistory = (terminalInput: string) => {
    addToTerminalContent(terminalInput + "\n\n" + terminalCommandHistory);
  };

  // list the content of the current directory to the terminal content
  const listCurrentDirectoryContent = (terminalInput: string) => {
    let contents: Array<IDirectory> = directories;

    // if the terminal is not in the root directory
    if (terminalsCurrentDirectoryInfo.id !== "root") {
      // find the current directory from directories
      const dir = findDirectory(
        rootDirectory,
        terminalsCurrentDirectoryInfo.path.split("/")
      );
      // if the current directory is not found initialize the contents to empty array
      contents = dir ? dir.children : [];
    }

    // display the content of the current directory to the terminal content
    let output = "";
    for (const content of contents) {
      output += content.isFolder ? "/" + content.name : content.name;
      output += "\t\t";
    }
    addToTerminalContent(terminalInput + "\n" + output);
  };

  //print the current directory path to the terminal content
  const printWorkingDirectory = (terminalInput: string) => {
    let path = findDirectoryPath(
      rootDirectory,
      terminalsCurrentDirectoryInfo.path.split("/")
    );
    addToTerminalContent(terminalInput + "\n" + path);
  };

  const changeDirectoryToRoot = (terminalInput: string) => {
    dispatch(
      setTerminalsCurrentDirectoryInfo({
        id: "root",
        name: "root",
        path: "root",
      })
    );
    addToTerminalContent(terminalInput);
  };

  // change the current directory to the target directory
  const changeDirectory = (targetPath: string, terminalInput: string) => {
    // get the current directory from directories
    let currentDirectory = findDirectory(
      rootDirectory,
      terminalsCurrentDirectoryInfo.path.split("/")
    );

    // if the terminal points to the deleted directory
    if (!currentDirectory) {
      addToTerminalContent(
        terminalInput + "\ncurrent directory does not exist"
      );
      return;
    }

    // get the current directory path
    let currentDirectoryPath = terminalsCurrentDirectoryInfo.path;

    // target path is the path of the target directory
    const targetPathArr = targetPath.split("/");
    let targetPathIndx = 0;

    // run the loop until the target path is found or the current directory is null
    while (targetPathIndx < targetPathArr.length && currentDirectory) {
      // if the target path is ".." move back to the parent directory
      // else move to the child directory
      if (targetPathArr[targetPathIndx] === "..") {
        // if current directory is root directory then the parent directory does not exist
        if (currentDirectoryPath === "root") {
          addToTerminalContent(terminalInput + "\ndirectory does not exist");
          return;
        }

        //move back to the parent directory by removing the last part (location) of the current directory path
        currentDirectoryPath = currentDirectoryPath
          .split("/")
          .slice(0, -1)
          .join("/");

        // find the current directory Path from directories
        currentDirectory = findDirectory(
          rootDirectory,
          currentDirectoryPath.split("/")
        );
      } else {
        // find the child directory Name from the target path array
        const nextTargetName = targetPathArr[targetPathIndx]
          .trim()
          .toLowerCase();

        // find the child directory from the current directory with the name of the next target
        const nextTarget = currentDirectory.children.findIndex(
          (directory) => directory.name.trim().toLowerCase() === nextTargetName
        );

        // if not found then the directory does not exist
        if (nextTarget === -1) {
          addToTerminalContent(terminalInput + "\ndirectory does not exist");
          return;
        }

        // move to the child directory and get the path of the child directory
        currentDirectoryPath = currentDirectory.children[nextTarget].path;

        // find the child directory from directories
        currentDirectory = findDirectory(
          rootDirectory,
          currentDirectoryPath.split("/")
        );
      }
      // increment the target path index
      targetPathIndx++;
    }

    // current directory is null then the target path does not exist
    if (!currentDirectory) {
      addToTerminalContent(terminalInput + "\ndirectory does not exist");
      return;
    }

    // else the target path is found and change the current directory to the target directory
    addToTerminalContent(terminalInput);
    dispatch(
      setTerminalsCurrentDirectoryInfo({
        id: currentDirectory.id,
        name: currentDirectory.name,
        path: currentDirectory.path,
      })
    );
  };

  // create new file in the current directory
  const createFile = (fileName: string, terminalInput: string) => {
    // get the current directory from directories
    let currentDirectory = findDirectory(
      rootDirectory,
      terminalsCurrentDirectoryInfo.path.split("/")
    );

    // if the current directory is not found then the terminal points to the deleted directory
    if (!currentDirectory) {
      addToTerminalContent(
        terminalInput + "\ncurrent directory does not exist"
      );
      return;
    }

    // check if the file already exists
    if (
      currentDirectory.children.find(
        (directory) =>
          directory.name.toLowerCase() === fileName.trim().toLowerCase()
      )
    ) {
      addToTerminalContent(terminalInput + "\nfile already exists");
      return;
    }

    // create a new file and add it to the current directory
    const fileId = uniqueIdGenerator();
    dispatch(
      addFileOrFolderToDirectory({
        id: fileId,
        name: fileName,
        isFolder: false,
        path: currentDirectory.path.split("/"),
        parentId: currentDirectory.id,
      })
    );
    addToTerminalContent(terminalInput);
    dispatch(addFileToNavigation({ id: fileId, type: "file" }));
    scrollToTarget(fileId);
  };

  // create new directory in the current directory
  const createDirectory = (directoryName: string, terminalInput: string) => {
    // get the current directory from directories
    let currentDirectory = findDirectory(
      rootDirectory,
      terminalsCurrentDirectoryInfo.path.split("/")
    );

    // if the current directory is not found then the terminal points to the deleted directory
    if (!currentDirectory) {
      addToTerminalContent(
        terminalInput + "\ncurrent directory does not exist"
      );
      return;
    }

    // check if the directory already exists
    if (
      currentDirectory.children.find(
        (directory) =>
          directory.name.toLowerCase() === directoryName.trim().toLowerCase()
      )
    ) {
      addToTerminalContent(terminalInput + "\ndirectory already exists");
      return;
    }

    // create a new directory and add it to the current directory
    const folderId = uniqueIdGenerator();
    dispatch(
      addFileOrFolderToDirectory({
        id: folderId,
        name: directoryName,
        isFolder: true,
        path: currentDirectory.path.split("/"),
        parentId: currentDirectory.id,
      })
    );
    addToTerminalContent(terminalInput);
  };

  // delete file or directory from the current directory
  const deleteFileOrDirectory = (name: string, terminalInput: string) => {
    // get the current directory from directories
    let currentDirectory = findDirectory(
      rootDirectory,
      terminalsCurrentDirectoryInfo.path.split("/")
    );

    // if the current directory is not found then
    if (!currentDirectory) {
      addToTerminalContent(
        terminalInput + "\ncurrent directory does not exist"
      );
      return;
    }

    // find the file or directory from the current directory
    const fileOrFolder = currentDirectory.children.find(
      (directory) => directory.name.toLowerCase() === name.trim().toLowerCase()
    );

    // if the file or directory does not exist
    if (!fileOrFolder) {
      addToTerminalContent(
        terminalInput + "\nfile or directory does not exists"
      );
      return;
    }

    // else delete the file or directory
    dispatch(
      deleteFileOrFolderOfDirectory({
        id: fileOrFolder.id,
        path: fileOrFolder.path.split("/"),
      })
    );
  };

  return {
    terminalActions,
  };
};
