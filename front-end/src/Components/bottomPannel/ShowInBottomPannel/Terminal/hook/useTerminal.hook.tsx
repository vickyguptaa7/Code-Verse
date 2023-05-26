import IDirectory from "../../../../../@types/directory.d";
import { terminalHelpInfo } from "../../../../../Assets/Data/terminal.data";
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

  /**
   * This is a function that takes in a terminal input and performs various actions based on the input,
   * such as clearing the terminal content, listing directory content, changing directories, creating
   * files and directories, and deleting files or directories.
   * @param {string} terminalInput - The parameter `terminalInput` is a string representing the user
   * input in the terminal.
   * @returns In the `terminalActions` function, various `return` statements are used to exit the
   * function early after executing a specific command. In the `clearTerminalContent` function, nothing
   * is being returned explicitly, so it will return `undefined` by default.
   */
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

  /**
   * This function adds a string to the terminal content with the current directory information and the
   * input provided.
   * @param {string} terminalInput - A string representing the input entered by the user in the
   * terminal.
   */
  const addToTerminalContent = (terminalInput: string) => {
    dispatch(
      setTerminalContent(
        `${terminalContent}${terminalsCurrentDirectoryInfo.name}:root$ ${terminalInput}\n`
      )
    );
  };

  /**
   * This function closes the terminal by setting the bottom panel to be closed.
   */
  const closeTerminal = () => {
    dispatch(setIsBottomPannelOpen(false));
  };

  /**
   * This function adds a command to the terminal command history.
   * @param {string} command - The `command` parameter is a string that represents a command entered by
   * the user in a terminal.
   */
  const addCommandToHistory = (command: string) => {
    dispatch(setTerminalCommandHistory(command));
  };

  /**
   * This function adds the terminal input and command history to the terminal content.
   * @param {string} terminalInput - The input that the user typed into the terminal.
   */
  const showCommandHistory = (terminalInput: string) => {
    addToTerminalContent(terminalInput + "\n\n" + terminalCommandHistory);
  };

  /**
   * This function lists the contents of the current directory in a terminal.
   * @param {string} terminalInput - The input entered by the user in the terminal.
   */
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

  /**
   * This function prints the current working directory path in a terminal.
   * @param {string} terminalInput - The input entered by the user in the terminal.
   */
  const printWorkingDirectory = (terminalInput: string) => {
    let path = findDirectoryPath(
      rootDirectory,
      terminalsCurrentDirectoryInfo.path.split("/")
    );
    addToTerminalContent(terminalInput + "\n" + path);
  };

  /**
   * This function changes the current directory of a terminal to the root directory and adds the input
   * to the terminal content.
   * @param {string} terminalInput - The `terminalInput` parameter is a string that represents the
   * command entered by the user in the terminal. In this case, it is used to add the command to the
   * terminal content.
   */
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
  /**
   * This function changes the current directory in a terminal based on a target path.
   * @param {string} targetPath - A string representing the path of the target directory that the user
   * wants to change to.
   * @param {string} terminalInput - The input command entered by the user in the terminal.
   * @returns The function does not have a return statement, so it returns `undefined` by default.
   */
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

  /**
   * This function creates a new file and adds it to the current directory, checking for existing files
   * and handling errors.
   * @param {string} fileName - A string representing the name of the file to be created.
   * @param {string} terminalInput - The input entered by the user in the terminal.
   * @returns The function `createFile` does not have a return statement, so it returns `undefined` by
   * default.
   */
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

  /**
   * This function creates a new directory and adds it to the current directory if it does not already
   * exist.
   * @param {string} directoryName - A string representing the name of the directory to be created.
   * @param {string} terminalInput - The terminal input is a string that represents the command entered
   * by the user in the terminal. It is used to display the command in the terminal output.
   * @returns The function does not return anything explicitly, but it may return early with a `return`
   * statement if certain conditions are met. If the current directory does not exist or if the
   * directory already exists, the function will return early without performing any further actions.
   * Otherwise, it will create a new directory and add it to the current directory.
   */
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

  /**
   * This function deletes a file or directory from the current directory in a file system.
   * @param {string} name - A string representing the name of the file or directory to be deleted.
   * @param {string} terminalInput - A string representing the user input in the terminal. It is used
   * to display error messages or other information related to the operation being performed.
   * @returns The function is not returning anything explicitly, but it may return early with a
   * `return` statement if the current directory or the file/directory to be deleted is not found.
   */
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
    addToTerminalContent(terminalInput);
  };

  return {
    terminalActions,
  };
};
