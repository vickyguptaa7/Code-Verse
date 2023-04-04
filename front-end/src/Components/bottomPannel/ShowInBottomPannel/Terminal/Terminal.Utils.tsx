import useDirectory from "../../../../hooks/useDirectory.hook";
import IDirectory from "../../../../Interface/directory.interface";
import {
  setIsBottomPannelOpen,
  setTerminalContent,
  setTerminalsCurrentDirectoryInfo,
} from "../../../../Store/reducres/BottomPannel/BottomPannel.reducer";
import { useAppDispatch, useAppSelector } from "../../../../Store/store";

export const useTerminal = () => {
  const dispatch = useAppDispatch();
  const terminalContent = useAppSelector(
    (state) => state.bottomPannel.terminalContent
  );
  const terminalsCurrentDirectoryInfo = useAppSelector(
    (state) => state.bottomPannel.terminalsCurrentDirectoryInfo
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

  const clearTerminalContent = () => {
    dispatch(setTerminalContent(""));
  };
  const addToTerminalContent = (terminalInput: string) => {
    console.log(terminalContent);

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
    addToTerminalContent("ls\n" + output);
  };
  const printWorkingDirectory = () => {
    let path = findDirectoryPath(
      rootDirectory,
      terminalsCurrentDirectoryInfo.path.split("/")
    );
    addToTerminalContent("pwd\n" + path);
  };

  const changeDirectoryToRoot = () => {
    dispatch(
      setTerminalsCurrentDirectoryInfo({
        id: "root",
        name: "root",
        path: "root",
      })
    );
    addToTerminalContent("cd");
  };

  const changeDirectory = (targetPath: string) => {
    let currentDirectory = findDirectory(
      rootDirectory,
      terminalsCurrentDirectoryInfo.path.split("/")
    );
    if (!currentDirectory) {
      // if the terminal points to the deleted directory
      addToTerminalContent(
        "cd " + targetPath + "\ncurrent directory does not exist"
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
          addToTerminalContent(
            "cd " + targetPath + "\ndirectory does not exist"
          );
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
        const nextTargetName = targetPathArr[targetPathIndx].trim().toLowerCase();
        const nextTarget = currentDirectory.children.findIndex(
          (directory) => directory.name.trim().toLowerCase() === nextTargetName
        );
        if (nextTarget === -1) {
          addToTerminalContent(
            "cd " + targetPath + "\ndirectory does not exist"
          );
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
      addToTerminalContent("cd " + targetPath + "\ndirectory does not exist");
      return;
    }
    addToTerminalContent("cd " + targetPath);
    dispatch(
      setTerminalsCurrentDirectoryInfo({
        id: currentDirectory.id,
        name: currentDirectory.name,
        path: currentDirectory.path,
      })
    );
  };

  return {
    clearTerminalContent,
    addToTerminalContent,
    closeTerminal,
    listCurrentDirectoryContent,
    printWorkingDirectory,
    changeDirectoryToRoot,
    changeDirectory,
  };
};
