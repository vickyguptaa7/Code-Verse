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

  const changeDirectory = (target: string) => {
    let currentDirectory = findDirectory(
      rootDirectory,
      terminalsCurrentDirectoryInfo.path.split("/")
    );
    if (!currentDirectory) {
      // if the terminal points to the deleted directory
      addToTerminalContent(
        "cd " + target + "\ncurrent directory does not exist"
      );
    }
    let currentDirectoryPath = terminalsCurrentDirectoryInfo.path;
    console.log(currentDirectory);
    const targetArr = target.split("/");
    let targetIndx = 0;
    while (targetIndx < targetArr.length && currentDirectory) {
      if (targetArr[targetIndx] === "..") {
        if (currentDirectoryPath === "root") {
          // there is no parent of the root directory
          addToTerminalContent("cd " + target + "\ndirectory does not exist");
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
        const nextSmallerTarget = currentDirectory.children.findIndex(
          (directory) =>
            directory.name.trim().toLowerCase() ===
            targetArr[targetIndx].trim().toLowerCase()
        );
        if (nextSmallerTarget === -1) {
          addToTerminalContent("cd " + target + "\ndirectory does not exist");
          return;
        }
        // move to the child directory
        currentDirectoryPath =
          currentDirectory.children[nextSmallerTarget].path;
        currentDirectory = findDirectory(
          rootDirectory,
          currentDirectoryPath.split("/")
        );
      }
      targetIndx++;
    }
    if (!currentDirectory) {
      addToTerminalContent("cd " + target + "\ndirectory does not exist");
      return;
    }
    addToTerminalContent("cd " + target);
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
