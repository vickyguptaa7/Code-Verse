import useDirectory from "../../../../hooks/useDirectory.hook";
import IDirectory from "../../../../Interface/directory.interface";
import { setIsBottomPannelOpen } from "../../../../Store/reducres/BottomPannel/BottomPannel.reducer";
import {
  setTerminalContent,
  setTerminalsCurrentDirectoryInfo,
} from "../../../../Store/reducres/BottomPannel/Terminal/Terminal.reducer";
import {
  addFileOrFolderToDirectory,
  deleteFileOrFolderOfDirectory,
} from "../../../../Store/reducres/SideDrawer/Directory/Directory.reducer";
import { useAppDispatch, useAppSelector } from "../../../../Store/store";

import { uniqueIdGenerator } from "../../../../library/uuid/uuid.lib";
import { addFileToNavigation } from "../../../../Store/reducres/Navigation/FileNavigation.reducer";
import { terminalHelpInfo } from "../../../../Assets/Data/terminal.data";

export const useTerminal = (terminalInput: string) => {
  const dispatch = useAppDispatch();
  const terminalContent = useAppSelector(
    (state) => state.terminal.terminalContent
  );
  const terminalsCurrentDirectoryInfo = useAppSelector(
    (state) => state.terminal.terminalsCurrentDirectoryInfo
  );
  const directories = useAppSelector((state) => state.Directory.directories);
  const rootDirectory: IDirectory = {
    id: "root",
    name: "root",
    path: "root",
    parentId: "root",
    isFolder: true,
    iconUrls: [],
    children: directories,
  };
  const { findDirectory, findDirectoryPath } = useDirectory();

  const terminalActions = () => {
    const input = terminalInput.trim().toLowerCase();
    switch (input) {
      case "clear":
        clearTerminalContent();
        return;
      case "exit":
        closeTerminal();
        return;
      case "ls":
        listCurrentDirectoryContent();
        return;
      case "pwd":
        printWorkingDirectory();
        return;
      case "cd":
        changeDirectoryToRoot();
        return;
      case "help":
        addToTerminalContent(terminalInput + "\n" + terminalHelpInfo);
        return;
      default:
        break;
    }
    if (input.split(" ").length === 2) {
      const twoArgInput = input.split(" ");
      switch (twoArgInput[0]) {
        case "cd":
          changeDirectory(twoArgInput[1]);
          return;
        case "touch":
          createFile(twoArgInput[1]);
          return;
        case "mkdir":
          createDirectory(twoArgInput[1]);
          return;
        case "rm":
          deleteFileOrDirectory(twoArgInput[1]);
          return;
        default:
          break;
      }
    } else {
      addToTerminalContent(
        `${terminalInput}\nbash: ${terminalInput}: command not found`
      );
    }
  };

  const clearTerminalContent = () => {
    console.log("HElO");
    dispatch(setTerminalContent(""));
  };
  const addToTerminalContent = (terminalInput: string) => {
    dispatch(
      setTerminalContent(
        `${terminalContent}${terminalsCurrentDirectoryInfo.name}:user$ ${terminalInput}\n`
      )
    );
  };
  const closeTerminal = () => {
    dispatch(setIsBottomPannelOpen(false));
  };
  const listCurrentDirectoryContent = () => {
    let contents: Array<IDirectory> = directories;
    if (terminalsCurrentDirectoryInfo.id !== "root") {
      const dir = findDirectory(
        rootDirectory,
        terminalsCurrentDirectoryInfo.path.split("/")
      );
      contents = dir ? dir.children : [];
    }

    let output = "";
    for (const content of contents) {
      output += content.isFolder ? "/" + content.name : content.name;
      output += "\t\t";
    }
    addToTerminalContent(terminalInput + "\n" + output);
  };
  const printWorkingDirectory = () => {
    let path = findDirectoryPath(
      rootDirectory,
      terminalsCurrentDirectoryInfo.path.split("/")
    );
    addToTerminalContent(terminalInput + "\n" + path);
  };

  const changeDirectoryToRoot = () => {
    dispatch(
      setTerminalsCurrentDirectoryInfo({
        id: "root",
        name: "root",
        path: "root",
      })
    );
    addToTerminalContent(terminalInput);
  };

  const changeDirectory = (targetPath: string) => {
    let currentDirectory = findDirectory(
      rootDirectory,
      terminalsCurrentDirectoryInfo.path.split("/")
    );
    if (!currentDirectory) {
      // if the terminal points to the deleted directory
      addToTerminalContent(
        terminalInput + "\ncurrent directory does not exist"
      );
    }
    let currentDirectoryPath = terminalsCurrentDirectoryInfo.path;
    console.log(currentDirectory);
    const targetPathArr = targetPath.split("/");
    let targetPathIndx = 0;
    while (targetPathIndx < targetPathArr.length && currentDirectory) {
      if (targetPathArr[targetPathIndx] === "..") {
        if (currentDirectoryPath === "root") {
          // there is no parent of the root directory
          addToTerminalContent(terminalInput + "\ndirectory does not exist");
          return;
        }
        //move back to the parent directory
        currentDirectoryPath = currentDirectoryPath
          .split("/")
          .slice(0, -1)
          .join("/");
        currentDirectory = findDirectory(
          rootDirectory,
          currentDirectoryPath.split("/")
        );
      } else {
        const nextTargetName = targetPathArr[targetPathIndx]
          .trim()
          .toLowerCase();
        const nextTarget = currentDirectory.children.findIndex(
          (directory) => directory.name.trim().toLowerCase() === nextTargetName
        );
        if (nextTarget === -1) {
          addToTerminalContent(terminalInput + "\ndirectory does not exist");
          return;
        }
        // move to the child directory
        currentDirectoryPath = currentDirectory.children[nextTarget].path;
        currentDirectory = findDirectory(
          rootDirectory,
          currentDirectoryPath.split("/")
        );
      }
      targetPathIndx++;
    }
    if (!currentDirectory) {
      addToTerminalContent(terminalInput + "\ndirectory does not exist");
      return;
    }
    addToTerminalContent(terminalInput);
    dispatch(
      setTerminalsCurrentDirectoryInfo({
        id: currentDirectory.id,
        name: currentDirectory.name,
        path: currentDirectory.path,
      })
    );
  };

  const createFile = (fileName: string) => {
    let currentDirectory = findDirectory(
      rootDirectory,
      terminalsCurrentDirectoryInfo.path.split("/")
    );
    if (!currentDirectory) {
      addToTerminalContent(
        terminalInput + "\ncurrent directory does not exist"
      );
      return;
    }
    if (
      currentDirectory.children.find(
        (directory) =>
          directory.name.toLowerCase() === fileName.trim().toLowerCase()
      )
    ) {
      addToTerminalContent(terminalInput + "\nfile already exists");
      return;
    }
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
  };
  const createDirectory = (directoryName: string) => {
    let currentDirectory = findDirectory(
      rootDirectory,
      terminalsCurrentDirectoryInfo.path.split("/")
    );
    if (!currentDirectory) {
      addToTerminalContent(
        terminalInput + "\ncurrent directory does not exist"
      );
      return;
    }
    if (
      currentDirectory.children.find(
        (directory) =>
          directory.name.toLowerCase() === directoryName.trim().toLowerCase()
      )
    ) {
      addToTerminalContent(terminalInput + "\ndirectory already exists");
      return;
    }
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
  const deleteFileOrDirectory = (name: string) => {
    let currentDirectory = findDirectory(
      rootDirectory,
      terminalsCurrentDirectoryInfo.path.split("/")
    );
    if (!currentDirectory) {
      addToTerminalContent(
        terminalInput + "\ncurrent directory does not exist"
      );
      return;
    }
    const fileOrFolder = currentDirectory.children.find(
      (directory) => directory.name.toLowerCase() === name.trim().toLowerCase()
    );
    if (!fileOrFolder) {
      addToTerminalContent(
        terminalInput + "\nfile or directory does not exists"
      );
      return;
    }
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
